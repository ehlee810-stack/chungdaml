import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 한옥·명리 컨셉 Hero — 간지(干支) 원형 도표 + 여러 별자리·별을 깐 천문도 배경.
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

// 여러 별자리 — 각자 좌표(0~100)와 연결선
type Cons = {
  wrap: string; // 위치 + 투명도 클래스
  size: number;
  stars: [number, number][];
  lines: [number, number][];
};
const constellations: Cons[] = [
  {
    // 북두칠성
    wrap: "left-[3%] top-[9%] opacity-[0.24]",
    size: 170,
    stars: [[10, 34], [30, 40], [50, 46], [70, 50], [78, 70], [56, 76], [48, 56]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    // 카시오페이아 (W)
    wrap: "right-[5%] top-[12%] opacity-[0.22]",
    size: 160,
    stars: [[8, 44], [28, 20], [48, 46], [68, 18], [88, 42]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    // 삼각형
    wrap: "left-[9%] bottom-[12%] opacity-[0.20] hidden sm:block",
    size: 120,
    stars: [[20, 22], [64, 34], [40, 66]],
    lines: [[0, 1], [1, 2], [2, 0]],
  },
  {
    // 십자(남십자성)
    wrap: "right-[7%] bottom-[11%] opacity-[0.22]",
    size: 130,
    stars: [[46, 8], [46, 42], [46, 80], [18, 42], [74, 42]],
    lines: [[0, 1], [1, 2], [3, 1], [1, 4]],
  },
  {
    // 사다리꼴
    wrap: "left-[1%] top-[50%] opacity-[0.18] hidden md:block",
    size: 130,
    stars: [[16, 26], [60, 18], [70, 58], [24, 66]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]],
  },
  {
    // 작은 국자
    wrap: "right-[2%] top-[52%] opacity-[0.18] hidden md:block",
    size: 130,
    stars: [[10, 30], [34, 50], [22, 76], [54, 40], [62, 70]],
    lines: [[0, 1], [1, 2], [1, 3], [3, 4]],
  },
];

// 흩뿌린 단독 별 — [left%, top%, r]
const scatter: [number, number, number][] = [
  [8, 24, 1.4], [16, 60, 1], [22, 14, 1.2], [33, 80, 1], [40, 20, 1.3],
  [12, 42, 1], [27, 36, 1], [73, 70, 1.2], [80, 30, 1], [88, 60, 1.4],
  [92, 18, 1], [66, 14, 1], [60, 82, 1.2], [50, 12, 1], [85, 78, 1],
  [4, 70, 1], [95, 44, 1.2], [44, 88, 1], [70, 40, 1], [36, 56, 1],
];

function Constellation({ c }: { c: Cons }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={`pointer-events-none absolute -z-10 text-hanok-wood ${c.wrap}`}
      style={{ width: c.size, height: c.size }}
      fill="none"
      stroke="currentColor"
    >
      {c.lines.map(([a, b], i) => (
        <line
          key={i}
          x1={c.stars[a][0]}
          y1={c.stars[a][1]}
          x2={c.stars[b][0]}
          y2={c.stars[b][1]}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      {c.stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.8} fill="currentColor" stroke="none" opacity="0.85" />
      ))}
    </svg>
  );
}

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

      {/* 흩뿌린 별 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {scatter.map(([left, top, r], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-hanok-wood"
            style={{ left: `${left}%`, top: `${top}%`, width: `${r * 2}px`, height: `${r * 2}px`, opacity: 0.22 }}
          />
        ))}
      </div>

      {/* 여러 별자리 */}
      {constellations.map((c, i) => (
        <Constellation key={i} c={c} />
      ))}

      {/* 간지(干支) 원형 도표 — 중앙 은은한 워터마크 */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-hanok-wood opacity-[0.10] md:h-[680px] md:w-[680px]"
      >
        {[280, 232, 156, 108].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeWidth="1.2" />
        ))}
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
        {ring(jiji, 256).map((p, i) => (
          <text key={i} x={p.x} y={p.y} fontSize="26" textAnchor="middle" dominantBaseline="central" fill="currentColor">
            {p.ch}
          </text>
        ))}
        {ring(cheongan, 132).map((p, i) => (
          <text key={i} x={p.x} y={p.y} fontSize="22" textAnchor="middle" dominantBaseline="central" fill="currentColor">
            {p.ch}
          </text>
        ))}
        <circle cx="300" cy="300" r="40" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M300 260 a20 20 0 0 1 0 40 a20 20 0 0 0 0 40 a40 40 0 0 1 0 -80 Z"
          fill="currentColor"
          opacity="0.5"
        />
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
