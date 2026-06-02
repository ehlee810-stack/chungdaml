import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 신비로운 밤하늘 + 골드 Hero — 별·달·골드 그라데이션 텍스트.
// 별 위치는 하이드레이션 안정성을 위해 고정 좌표 사용.
const stars = [
  [6, 18, 1.4], [14, 42, 1], [9, 70, 1.2], [18, 12, 1], [22, 60, 1.6],
  [27, 30, 1], [31, 80, 1.2], [12, 88, 1], [38, 16, 1.3], [44, 52, 1],
  [49, 24, 1.6], [55, 74, 1.1], [60, 14, 1], [64, 44, 1.4], [69, 66, 1],
  [73, 22, 1.2], [78, 82, 1], [82, 36, 1.5], [86, 58, 1], [90, 16, 1.3],
  [93, 72, 1.1], [40, 88, 1], [3, 50, 1], [96, 44, 1.2], [52, 6, 1.1],
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* 밤하늘 그라데이션 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(201,168,76,0.10) 0%, transparent 55%)," +
            "radial-gradient(70% 60% at 80% 8%, rgba(122,0,40,0.22) 0%, transparent 60%)," +
            "linear-gradient(180deg, #0c0c24 0%, #07071a 100%)",
        }}
      />

      {/* 별 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {stars.map(([left, top, r], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#f4ecd0]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${r}px`,
              height: `${r}px`,
              opacity: 0.7,
              boxShadow: "0 0 6px rgba(244,236,208,0.7)",
            }}
          />
        ))}
      </div>

      {/* 보름달 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-8 -z-10 h-64 w-64 rounded-full md:h-80 md:w-80"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, #fff7df 0%, #ecc56a 55%, #b88a22 100%)",
          opacity: 0.85,
          boxShadow: "0 0 90px 30px rgba(201,168,76,0.25)",
        }}
      />

      <div className="container relative py-28 text-center md:py-40">
        {/* 골드 엠블럼 + 이브로우 */}
        <div className="mx-auto mb-7 flex w-fit items-center gap-2.5">
          <span className="text-lg text-gold">✦</span>
          <span className="font-mono text-[12px] tracking-[0.35em] text-gold">
            정통 사주명리
          </span>
          <span className="text-lg text-gold">✦</span>
        </div>

        <h1 className="mx-auto max-w-3xl font-serif text-[40px] font-bold leading-[1.12] tracking-tight md:text-[64px]">
          <span
            style={{
              background: "linear-gradient(135deg,#f6e6a8 0%,#e8c96a 45%,#b88a22 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {siteConfig.tagline}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-charcoal md:text-[17px]">
          {siteConfig.description}
        </p>

        {/* 골드 디바이더 */}
        <div className="mx-auto mt-9 flex w-fit items-center gap-3 text-gold">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <span>☾</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "px-8")}>
            내 사주 보러 가기
          </Link>
          <Link
            href="#how-it-works"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "px-8")}
          >
            이용 방법 보기
          </Link>
        </div>

        <p className="mt-6 text-[13px] text-mute">
          로그인 없이 게스트로도 · 정통 만세력 기반 · 1900~2100년 분석
        </p>
      </div>
    </section>
  );
}
