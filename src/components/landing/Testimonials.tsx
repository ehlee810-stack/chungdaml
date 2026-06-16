import Link from "next/link";
import { getDisplayReviews } from "@/lib/reviews";

// 한옥 컨셉 — 고객 후기 섹션. 실제 후기(DB) + 샘플을 합쳐 최신순으로 노출.
export async function Testimonials() {
  const reviews = await getDisplayReviews(3);
  if (reviews.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-surface-soft">
      <div className="container py-14 sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">REVIEWS</p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
            먼저 받아보신 분들의 이야기
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-lg border border-hairline bg-canvas p-7"
            >
              <div className="mb-3 text-lg tracking-tight text-yeonji">
                {"★".repeat(r.rating)}
                <span className="text-hairline-strong">{"★".repeat(5 - r.rating)}</span>
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-charcoal">
                “{r.content}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-sm">
                <span className="font-semibold text-ink">{r.name}</span>
                <span className="text-xs text-mute">{r.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 rounded-full border border-hairline-strong px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-yeonji hover:text-yeonji"
          >
            후기 더보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
