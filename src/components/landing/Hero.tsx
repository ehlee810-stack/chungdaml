import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 한옥 컨셉 Hero — 한지 배경 + 큰 보름달, 창살 격자, 낙관(도장), 조각보.
const jogakboColors = ["#b3284e", "#d98a3d", "#e0c35a", "#5f7a52", "#3f5c8a", "#8a4a86"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* 따뜻한 햇살 + 한지 그라데이션 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(110% 70% at 50% -5%, rgba(179,40,78,0.10) 0%, transparent 55%)," +
            "radial-gradient(60% 50% at 84% 12%, rgba(214,138,61,0.18) 0%, transparent 60%)," +
            "linear-gradient(180deg, #f9f3e8 0%, #efe4d0 100%)",
        }}
      />

      {/* 큰 보름달 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 -z-10 h-72 w-72 rounded-full md:h-96 md:w-96"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, #fbf3d8 0%, #ecc56a 55%, #cf9a2e 100%)",
          opacity: 0.5,
          filter: "blur(2px)",
        }}
      />

      {/* 창살(窓살) 격자 — 좌측 하단 은은하게 */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-12 bottom-0 -z-10 h-80 w-80 text-hanok-wood opacity-[0.10]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {[0, 33, 66, 100, 133, 166, 200].map((v) => (
          <line key={`h${v}`} x1="0" y1={v} x2="200" y2={v} />
        ))}
        {[0, 33, 66, 100, 133, 166, 200].map((v) => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="200" />
        ))}
      </svg>

      <div className="container relative py-28 text-center md:py-40">
        {/* 낙관(落款) — 붉은 도장 + 브랜드 한자 */}
        <div className="mx-auto mb-7 flex w-fit items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-yeonji text-[15px] font-semibold text-[#fdf6ea] shadow-sm">
            印
          </span>
          <span className="font-mono text-[12px] tracking-[0.35em] text-hanok-wood">
            정통 사주명리
          </span>
        </div>

        <h1 className="mx-auto max-w-3xl font-serif text-[40px] font-bold leading-[1.12] tracking-tight text-ink md:text-[64px]">
          {siteConfig.tagline}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-charcoal md:text-[17px]">
          {siteConfig.description}
        </p>

        {/* 조각보 — 굵은 포인트 띠 */}
        <div className="mx-auto mt-9 flex w-fit gap-2">
          {jogakboColors.map((c) => (
            <span
              key={c}
              className="h-8 w-8 rounded-[5px] shadow-sm md:h-10 md:w-10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "px-8")}
          >
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
