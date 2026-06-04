import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 한옥·명리 컨셉 Hero — 간지(干支) 원형 도표 + 별자리를 은은하게 깐 신비로운 배경.
const jogakboColors = ["#b3284e", "#d98a3d", "#e0c35a", "#5f7a52", "#3f5c8a", "#8a4a86"];

const cheongan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const jiji = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 원 둘레에 글자/눈금을 배치하기 위한 좌표 계산
function ring(items: string[], radius: number, cx = 300, cy = 300) {
  return items.map((ch, i) => {
    const a = ((-90 + (360 / items.length) * i) * Math.PI) / 180;
    return { ch, x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  });
}

// 별자리 — 고정 좌표(하이드레이션 안정)
const constellation = [
  [120, 90], [180, 140], [240, 110], [300, 170], [360, 120], [420, 200],
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* 따뜻한 한지 그라데이션 (대칭) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 30%, rgba(201,168,76,0.10) 0%, transparent 60%)," +
            "radial-gradient(60% 50% at 50% 0%, rgba(179,40,78,0.07) 0%, transparent 60%)," +
            "linear-gradient(180deg, #f9f3e8 0%, #efe4d0 100%)",
        }}
      />

      {/* 간지(干支) 원형 도표 — 중앙 은은한 워터마크 */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-hanok-wood opacity-[0.10] md:h-[680px] md:w-[680px]"
      >
        {/* 동심원 */}
        {[280, 232, 156, 108].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeWidth="1.2" />
        ))}
        {/* 24 눈금 */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = ((i * 15) * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={300 + 256 * Math.cos(a)}
              y1={300 + 256 * Math.sin(a)}
              x2={300 + 280 * Math.cos(a)}
              y2={300 + 280 * Math.sin(a)}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          );
        })}
        {/* 지지 12 (바깥) */}
        {ring(jiji, 256).map((p, i) => (
          <text key={i} x={p.x} y={p.y} fontSize="26" textAnchor="middle" dominantBaseline="central" fill="currentColor">
            {p.ch}
          </text>
        ))}
        {/* 천간 10 (안쪽) */}
        {ring(cheongan, 132).map((p, i) => (
          <text key={i} x={p.x} y={p.y} fontSize="22" textAnchor="middle" dominantBaseline="central" fill="currentColor">
            {p.ch}
          </text>
        ))}
        {/* 중심 음양 */}
        <circle cx="300" cy="300" r="40" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M300 260 a20 20 0 0 1 0 40 a20 20 0 0 0 0 40 a40 40 0 0 1 0 -80 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>

      {/* 별자리 — 좌상단 은은하게 */}
      <svg
        aria-hidden
        viewBox="0 0 540 260"
        className="pointer-events-none absolute left-0 top-6 -z-10 h-40 w-[520px] text-hanok-wood opacity-[0.22]"
        fill="none"
        stroke="currentColor"
      >
        <polyline
          points={constellation.map((p) => p.join(",")).join(" ")}
          strokeWidth="1"
          opacity="0.5"
        />
        {constellation.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2.4 : 1.6} fill="currentColor" stroke="none" />
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
