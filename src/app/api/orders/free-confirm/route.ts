import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { generateAndStoreResult } from "@/lib/saju/generate-result";

// 쿠폰 무료 주문도 LLM 생성 시간이 걸리므로 넉넉히.
export const maxDuration = 60;

const bodySchema = z.object({
  orderId: z.string().min(1),
  code: z.string().min(1).max(40),
});

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "잘못된 요청입니다" }, { status: 400 });
  }
  const { orderId, code } = parsed.data;
  const normalizedCode = code.trim().toUpperCase();

  // 로그인 확인
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const service = createServiceClient();

  const { data: order } = await service
    .from("orders")
    .select("id, status, product_id, user_id")
    .eq("order_id", orderId)
    .maybeSingle();
  if (!order) {
    return NextResponse.json({ error: "주문을 찾을 수 없습니다" }, { status: 404 });
  }
  if (order.user_id !== user.id) {
    return NextResponse.json({ error: "본인 주문이 아닙니다" }, { status: 403 });
  }

  const { data: product } = await service
    .from("products")
    .select("slug, name")
    .eq("id", order.product_id)
    .single();
  if (!product) {
    return NextResponse.json({ error: "상품 조회 실패" }, { status: 500 });
  }

  // 이미 처리된 주문이면 결과만 반환 (중복 클릭 방지 — 쿠폰 재차감 안 함)
  if (order.status === "paid") {
    try {
      const { resultId } = await generateAndStoreResult(service, {
        orderDbId: order.id,
        productSlug: product.slug,
        productName: product.name,
      });
      return NextResponse.json({ resultId });
    } catch (err) {
      return NextResponse.json(
        { error: "결과 조회 실패", detail: err instanceof Error ? err.message : String(err) },
        { status: 500 },
      );
    }
  }

  // 쿠폰 차감 (원자적 — 선착순 한도/유효성 동시 검증)
  const { data: claimed, error: claimErr } = await service.rpc("claim_coupon", {
    p_code: normalizedCode,
    p_slug: product.slug,
  });
  if (claimErr) {
    return NextResponse.json({ error: "쿠폰 확인 중 오류가 발생했습니다" }, { status: 500 });
  }
  if (claimed == null) {
    return NextResponse.json(
      { error: "유효하지 않거나 마감된 쿠폰입니다." },
      { status: 400 },
    );
  }

  // 무료 주문 확정 (결제 없이) — toss_payment_key 에 쿠폰 마커
  await service
    .from("orders")
    .update({
      status: "paid",
      amount: 0,
      toss_payment_key: `COUPON:${normalizedCode}`,
      paid_at: new Date().toISOString(),
    })
    .eq("id", order.id);

  try {
    const { resultId } = await generateAndStoreResult(service, {
      orderDbId: order.id,
      productSlug: product.slug,
      productName: product.name,
    });
    return NextResponse.json({ resultId });
  } catch (err) {
    return NextResponse.json(
      {
        error: "사주 해석 생성 실패",
        detail: err instanceof Error ? err.message : String(err),
        hint: "쿠폰은 차감되었습니다. /admin/orders 에서 수동 재생성하세요.",
      },
      { status: 500 },
    );
  }
}
