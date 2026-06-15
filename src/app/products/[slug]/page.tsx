import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";
import { SajuForm } from "@/components/saju/SajuForm";
import { PriceTag } from "@/components/PriceTag";
import { formatDate } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";
import { siteConfig } from "@/config/site";
import { productsSeed } from "@/config/products.seed";
import { productMeta } from "@/config/product-meta";

// 상품별 SEO 메타데이터 — 검색 노출/공유 카드용
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productsSeed.find((x) => x.slug === slug && x.is_active);
  if (!p) return { title: "상품을 찾을 수 없습니다" };
  return {
    title: p.name,
    description: p.description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${p.name} | ${siteConfig.name}`,
      description: p.description,
      type: "website",
    },
  };
}

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
};
type Review = { id: string; rating: number; content: string; created_at: string };

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | null;
  let reviews: Review[] | null = null;
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("id, slug, name, description, price, compare_at_price")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    product = data;

    if (product) {
      const { data: r } = await supabase
        .from("reviews")
        .select("id, rating, content, created_at")
        .eq("product_id", product.id)
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(5);
      reviews = r;
    }
    user = await getCurrentUser();
  } else {
    const seed = productsSeed.find((p) => p.slug === slug && p.is_active);
    product = seed ? { id: seed.slug, ...seed } : null;
  }

  if (!product) notFound();

  const meta = productMeta(product.slug);

  return (
    <div className="container py-12 max-w-2xl">
      <header className="mb-10">
        {meta?.badge && (
          <span className="mb-3 inline-flex items-center rounded-full bg-yeonji/10 px-3 py-1 text-xs font-bold tracking-wide text-yeonji">
            {meta.badge}
          </span>
        )}
        <h1 className="font-serif text-[28px] font-bold leading-tight tracking-tight text-ink md:text-[34px]">
          {product.name}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">{product.description}</p>
        <PriceTag
          price={product.price}
          compareAt={product.compare_at_price}
          size="lg"
          className="mt-6 border-t border-hairline pt-6"
        />
      </header>

      {/* 상품 안내 — 추천 대상 / 결과 구성 */}
      {meta && (
        <section className="mb-12 grid gap-5 rounded-lg border border-hairline bg-surface-soft p-6 sm:grid-cols-2 sm:p-7">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">이런 분께 추천해요</h2>
            <ul className="space-y-2 text-[14px] leading-relaxed text-body">
              {meta.recommend.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-[2px] text-yeonji">·</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink">결과 리포트 구성</h2>
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {meta.includes.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-hairline bg-canvas px-3 py-1 text-[13px] text-charcoal"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              분량 {meta.length} · 결제 후 1~2분 내 바로 생성, 마이페이지에서 언제든 다시 볼 수 있어요.
            </p>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-sm font-semibold mb-4 text-ink">사주 정보 입력</h2>
        <p className="text-xs text-body mb-4">정확할수록 더 정밀한 결과가 나옵니다.</p>
        <SajuForm productId={product.id} productSlug={product.slug} isLoggedIn={!!user} />
      </section>

      {reviews && reviews.length > 0 && (
        <section className="mt-16 pt-10 border-t border-hairline">
          <h2 className="text-sm font-semibold mb-5 text-ink">최근 후기</h2>
          <ul className="divide-y divide-hairline border-y border-hairline">
            {reviews.map((r) => (
              <li key={r.id} className="py-5">
                <div className="flex items-center justify-between text-sm">
                  <span aria-label={`${r.rating}점`}>
                    <span className="text-ink">{"★".repeat(r.rating)}</span>
                    <span className="text-hairline-strong">{"★".repeat(5 - r.rating)}</span>
                  </span>
                  <span className="text-xs text-mute font-mono">{formatDate(r.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-charcoal leading-relaxed">{r.content}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
