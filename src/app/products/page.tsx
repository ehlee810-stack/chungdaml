import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PriceTag } from "@/components/PriceTag";
import { isSupabaseConfigured } from "@/lib/env";
import { productsSeed } from "@/config/products.seed";
import { productMeta } from "@/config/product-meta";

export const metadata = { title: "사주 라인업" };

type P = {
  slug: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
};

// 카테고리 정의 (slug 기준 분류) — icon: 카드/섹션 상징
const CATEGORIES: { title: string; desc: string; icon: string; slugs: string[] }[] = [
  {
    title: "종합 사주",
    desc: "사주 4기둥으로 보는 인생 전체의 흐름",
    icon: "🪷",
    slugs: ["solo-saju", "couple-saju"],
  },
  {
    title: "자녀 사주",
    desc: "우리 아이의 기질·적성·학업 흐름",
    icon: "🌱",
    slugs: ["child-saju", "children-saju"],
  },
  {
    title: "인연·재회운",
    desc: "연애·궁합·재회까지, 마음의 흐름을 짚어드려요",
    icon: "💗",
    slugs: ["love-fortune", "reunion", "jamidusu-gunghap", "jamidusu-jaehoe"],
  },
  {
    title: "특별 사주",
    desc: "반려동물 사주부터 가볍게 보는 주간 운세까지",
    icon: "✨",
    slugs: ["pet-saju", "weekly-fortune"],
  },
];

function ProductCard({ p, icon }: { p: P; icon: string }) {
  const badge = productMeta(p.slug)?.badge;
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group relative flex flex-col rounded-lg border border-hairline bg-canvas p-6 transition-all duration-200 hover:-translate-y-1 hover:border-yeonji/50 hover:shadow-[0_16px_36px_-14px_rgba(122,40,55,0.28)] md:p-8"
    >
      {badge && (
        <span className="absolute right-5 top-5 rounded-full bg-yeonji px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#fdf6ea]">
          {badge}
        </span>
      )}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface-soft text-lg">
        <span aria-hidden>{icon}</span>
      </div>
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
}

export default async function ProductsPage() {
  let products: P[] | null;
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

  const all = products ?? [];
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const used = new Set<string>();
  const groups = CATEGORIES.map((cat) => {
    const items = cat.slugs
      .map((s) => bySlug.get(s))
      .filter((p): p is P => Boolean(p));
    items.forEach((p) => used.add(p.slug));
    return { title: cat.title, desc: cat.desc, icon: cat.icon, items };
  }).filter((g) => g.items.length > 0);
  const others = all.filter((p) => !used.has(p.slug));
  if (others.length > 0) {
    groups.push({ title: "그 외", desc: "", icon: "🔮", items: others });
  }

  return (
    <div className="container py-12">
      <header className="mb-12">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-yeonji/30 bg-yeonji/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-yeonji">
          🔒 회원 전용 사주 상담
        </span>
        <h1 className="font-serif text-[32px] font-bold leading-tight tracking-tight text-ink md:text-[42px]">
          나만을 위한 사주 라인업
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-body">
          가볍게 보는 운세부터 깊이 있는 종합 풀이까지 — 회원 전용으로 한 분 한 분 정성껏 풀어드립니다.
        </p>
      </header>

      {all.length === 0 ? (
        <p className="text-sm text-body">상품이 없습니다.</p>
      ) : (
        <div className="space-y-14">
          {groups.map((g) => (
            <section key={g.title}>
              <div className="mb-5 border-b border-hairline pb-3">
                <h2 className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-ink md:text-2xl">
                  <span aria-hidden className="text-[20px]">{g.icon}</span>
                  {g.title}
                </h2>
                {g.desc && <p className="mt-1 text-sm text-body">{g.desc}</p>}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {g.items.map((p) => (
                  <ProductCard key={p.slug} p={p} icon={g.icon} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
