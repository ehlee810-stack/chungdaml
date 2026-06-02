import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 한옥 컨셉 Hero — 한지 크림 배경 + 따뜻한 햇살, 창살 격자, 조각보 포인트, 명조 헤드라인.
const jogakboColors = ["#b3284e", "#d98a3d", "#e0c35a", "#5f7a52", "#3f5c8a", "#8a4a86"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* 따뜻한 햇살 그라데이션 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(179,40,78,0.07) 0%, transparent 55%)," +
            "radial-gradient(70% 60% at 88% 18%, rgba(95,122,82,0.12) 0%, transparent 60%)," +
            "linear-gradient(180deg, #f7f1e6 0%, #efe6d4 100%)",
        }}
      />

      {/* 창살(窓살) 격자 — 우측 상단 은은하게 */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-hanok-wood opacity-[0.12]"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {[0, 40, 80, 120, 160, 200].map((v) => (
          <line key={`h${v}`} x1="0" y1={v} x2="200" y2={v} />
        ))}
        {[0, 40, 80, 120, 160, 200].map((v) => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="200" />
        ))}
      </svg>

      <div className="container relative py-24 md:py-32 text-center">
        {/* 조각보(조각보) 포인트 — 알록달록 색 조각 */}
        <div className="mx-auto mb-8 flex w-fit gap-1.5">
          {jogakboColors.map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-[2px]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <p className="mb-5 font-mono text-[11px] tracking-[0.32em] text-hanok-wood">
          청 담 엘 사 주
        </p>

        <h1 className="font-serif text-[34px] md:text-[50px] font-semibold tracking-tight leading-[1.15] text-ink">
          {siteConfig.tagline}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-body">
          {siteConfig.description}
        </p>

        <div className="mt-9 flex items-center justify-center gap-3">
          <Link href="/products" className={cn(buttonVariants({ size: "lg" }))}>
            사주 보러 가기
          </Link>
          <Link
            href="#how-it-works"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            이용 방법
          </Link>
        </div>
      </div>
    </section>
  );
}
