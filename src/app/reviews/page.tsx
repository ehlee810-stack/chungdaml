import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDisplayReviews } from "@/lib/reviews";

export const metadata = {
  title: "고객 후기",
  description: "청담엘사주를 먼저 받아보신 분들의 생생한 후기를 모았습니다.",
};

export default async function ReviewsPage() {
  const reviews = await getDisplayReviews();

  return (
    <div className="container max-w-4xl py-12">
      <header className="mb-10 text-center">
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">REVIEWS</p>
        <h1 className="font-serif text-[26px] font-bold tracking-tight text-ink sm:text-[32px] md:text-[40px]">
          먼저 받아보신 분들의 이야기
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          청담엘사주의 사주 리포트를 받아보신 분들의 솔직한 후기예요.
        </p>
      </header>

      {reviews.length === 0 ? (
        <p className="py-16 text-center text-sm text-body">아직 등록된 후기가 없어요.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-lg border border-hairline bg-canvas p-6 sm:p-7"
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
      )}

      <div className="mt-12 text-center">
        <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "px-8")}>
          내 사주 보러 가기 →
        </Link>
      </div>
    </div>
  );
}
