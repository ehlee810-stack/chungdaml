import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

// 오픈 기념 무료 이벤트 상단 띠. 남은 인원이 0이거나 쿠폰 비활성/미설정이면 표시하지 않음.
// coupons 테이블이 아직 없거나 오류가 나도 페이지가 깨지지 않도록 전부 안전 처리.
export async function EventBanner() {
  if (!isSupabaseConfigured()) return null;

  let remaining: number | null = null;
  try {
    const service = createServiceClient();
    const { data } = await service
      .from("coupons")
      .select("max_uses, used_count, is_active")
      .eq("code", "OPEN30")
      .maybeSingle();
    if (!data || !data.is_active) return null;
    remaining = data.max_uses - data.used_count;
  } catch {
    return null;
  }

  if (remaining == null || remaining <= 0) return null;

  return (
    <Link
      href="/products/solo-saju"
      className="block bg-yeonji px-4 py-2 text-center text-[12.5px] font-medium leading-snug text-[#fdf6ea] transition-opacity hover:opacity-95 md:text-[13.5px]"
    >
      🎉 오픈 기념 <strong className="font-bold">선착순 30명 무료</strong>
      <span className="mx-1.5 opacity-60">·</span>
      결제창에 <strong className="font-bold tracking-wide">OPEN30</strong> 입력
      <span className="mx-1.5 opacity-60">·</span>
      남은 <strong className="font-bold">{remaining}명</strong>
    </Link>
  );
}
