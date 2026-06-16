// =====================================================
// 화면 표시용 후기 — 실제(DB) 후기 + 샘플 후기를 합쳐서 반환.
// 실제 후기를 앞에(최신순), 모자란 자리는 샘플로 채움.
// =====================================================

import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { sampleReviews } from "@/config/reviews.sample";

export type DisplayReview = {
  rating: number;
  content: string;
  name: string; // "김○○ 님" 형태
  tag: string; // 상품명
  isReal: boolean;
};

// 개인정보 보호용 이름 마스킹: "홍길동" → "홍○○"
function maskName(name: string | null | undefined): string {
  const t = (name ?? "").trim();
  if (!t) return "고객";
  if (t.length === 1) return `${t}○`;
  return `${t[0]}${"○".repeat(Math.min(t.length - 1, 2))}`;
}

async function fetchRealReviews(): Promise<DisplayReview[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const service = createServiceClient();
    const { data: rows } = await service
      .from("reviews")
      .select("rating, content, created_at, user_id, product_id")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(50);
    if (!rows || rows.length === 0) return [];

    // 상품명 + 작성자 표시명(마스킹) 조회
    const productIds = [...new Set(rows.map((r) => r.product_id))];
    const userIds = [...new Set(rows.map((r) => r.user_id))];
    const [{ data: products }, { data: profiles }] = await Promise.all([
      service.from("products").select("id, name").in("id", productIds),
      service.from("profiles").select("id, display_name").in("id", userIds),
    ]);
    const productMap = new Map((products ?? []).map((p) => [p.id, p.name]));
    const nameMap = new Map((profiles ?? []).map((p) => [p.id, p.display_name]));

    return rows.map((r) => ({
      rating: r.rating,
      content: r.content,
      name: `${maskName(nameMap.get(r.user_id))} 님`,
      tag: productMap.get(r.product_id) ?? "사주 상담",
      isReal: true,
    }));
  } catch {
    return [];
  }
}

// limit 지정 시 그 개수만, 없으면 전체. 실제 후기가 앞, 샘플이 뒤.
export async function getDisplayReviews(limit?: number): Promise<DisplayReview[]> {
  const real = await fetchRealReviews();
  const samples: DisplayReview[] = sampleReviews.map((s) => ({ ...s, isReal: false }));
  const merged = [...real, ...samples];
  return typeof limit === "number" ? merged.slice(0, limit) : merged;
}

export async function getRealReviewCount(): Promise<number> {
  if (!isSupabaseConfigured()) return 0;
  try {
    const service = createServiceClient();
    const { count } = await service
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("is_public", true);
    return count ?? 0;
  } catch {
    return 0;
  }
}
