import Link from "next/link";
import { PriceTag } from "@/components/PriceTag";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { productsSeed } from "@/config/products.seed";

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
    <section className="container py-20 border-t border-hairline md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">SAJU MENU</p>
        <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
          사주 라인업
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-body">
          가볍게 보는 이번주 운세부터 깊이 있는 종합 사주까지, 원하는 만큼 들여다보세요.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group block rounded-lg border border-hairline bg-canvas p-6 transition-colors hover:border-ink"
          >
            <p className="text-base font-semibold text-ink">{p.name}</p>
            <p className="mt-1.5 text-sm text-body leading-relaxed line-clamp-2">
              {p.description}
            </p>
            <PriceTag price={p.price} compareAt={p.compare_at_price} className="mt-5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
