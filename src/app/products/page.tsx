import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PriceTag } from "@/components/PriceTag";
import { isSupabaseConfigured } from "@/lib/env";
import { productsSeed } from "@/config/products.seed";

export const metadata = { title: "상품" };

export default async function ProductsPage() {
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

  return (
    <div className="container py-12">
      <header className="mb-10">
        <p className="text-xs font-mono text-mute mb-2">PRODUCTS</p>
        <h1 className="text-3xl font-semibold tracking-tight">상품</h1>
        <p className="mt-2 text-sm text-body">가볍게 시작해서 깊이 있게 들어가세요.</p>
      </header>

      {!products || products.length === 0 ? (
        <p className="text-sm text-body">상품이 없습니다.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex flex-col rounded-lg border border-hairline bg-canvas p-6 transition-all duration-200 hover:-translate-y-1 hover:border-yeonji/50 hover:shadow-[0_16px_36px_-14px_rgba(122,40,55,0.28)] md:p-8"
            >
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
          ))}
        </div>
      )}
    </div>
  );
}
