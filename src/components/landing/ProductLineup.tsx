import Link from "next/link";
import { PriceTag } from "@/components/PriceTag";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { productsSeed } from "@/config/products.seed";
import { productMeta } from "@/config/product-meta";

// Ollama: thin-border cards on the same canvas — no shadow, hairline only.
export async function ProductLineup() {
  let products:
    | { slug: string; name: string; description: string; price: number; compare_at_price?: number | null }[]
    | null;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("slug, name, description, price, compare_at_price")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    products = data;
  } else {
    products = productsSeed
      .filter((p) => p.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map(({ slug, name, description, price, compare_at_price }) => ({
        slug,
        name,
        description,
        price,
        compare_at_price,
      }));
  }

  if (!products || products.length === 0) {
    return (
      <section className="container py-12 text-center">
        <p className="text-sm text-body">
          상품이 아직 없어요. <code className="font-mono text-ink">pnpm seed:products</code> 를 실행해 주세요.
        </p>
      </section>
    );
  }

  return (
    <section className="container border-t border-hairline py-14 sm:py-20 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">SAJU MENU</p>
        <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
          사주 라인업
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-body">
          종합 사주부터 연애·재회, 자녀, 반려동물 사주까지 — 원하는 만큼 깊이 있게 들여다보세요.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {products.slice(0, 6).map((p) => {
          const badge = productMeta(p.slug)?.badge;
          return (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group relative flex flex-col rounded-lg border border-hairline bg-canvas p-6 transition-all duration-200 hover:-translate-y-1 hover:border-yeonji/50 hover:shadow-[0_16px_36px_-14px_rgba(122,40,55,0.28)] md:p-8"
          >
            {badge && (
              <span className="absolute right-5 top-5 rounded-full bg-yeonji px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#fdf6ea]">
                {badge}
              </span>
            )}
            <p className="text-xl font-semibold text-ink">{p.name}</p>
            <p className="mt-2.5 line-clamp-3 flex-1 text-[15px] leading-relaxed text-body">
              {p.description}
            </p>
            <PriceTag
              price={p.price}
              compareAt={p.compare_at_price}
              size="lg"
              className="mt-6 border-t border-hairline pt-5"
            />
            <span className="mt-5 text-sm font-medium text-mute transition-colors group-hover:text-yeonji">
              자세히 보기 →
            </span>
          </Link>
          );
        })}
      </div>

      {products.length > 6 && (
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-yeonji hover:text-yeonji"
          >
            전체 사주 {products.length}종 보기 →
          </Link>
        </div>
      )}
    </section>
  );
}
