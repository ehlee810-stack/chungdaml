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

// 여러 별자리 — 좌표(0~100), 연결선, 위치/크기 클래스(모바일 작게)
type Cons = {
  wrap: string; // 위치 + 투명도 + 반응형 크기 클래스
  stars: [number, number][];
  lines: [number, number][];
};
const constellations: Cons[] = [
  {
    // 북두칠성
    wrap: "left-[1%] top-[6%] h-28 w-28 opacity-[0.22] md:h-[230px] md:w-[230px] md:opacity-[0.26]",
    stars: [[8, 20], [24, 30], [40, 37], [56, 44], [60, 66], [84, 62], [80, 40]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 6], [6, 5], [5, 4], [4, 3]],
  },
  {
    // 카시오페이아 (W)
    wrap: "right-[1%] top-[7%] h-24 w-24 opacity-[0.20] md:h-[215px] md:w-[215px] md:opacity-[0.24]",
    stars: [[6, 42], [26, 16], [48, 40], [70, 12], [92, 34]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    // 백조자리 (북십자)
    wrap: "left-[2%] bottom-[7%] h-24 w-24 opacity-[0.20] md:h-[205px] md:w-[205px] md:opacity-[0.24]",
    stars: [[50, 8], [50, 46], [50, 90], [14, 52], [86, 40]],
    lines: [[0, 1], [1, 2], [3, 1], [1, 4]],
  },
  {
    // 오리온자리
    wrap: "right-[2%] bottom-[6%] h-28 w-28 opacity-[0.22] md:h-[215px] md:w-[215px] md:opacity-[0.26]",
    stars: [[30, 16], [64, 12], [40, 50], [50, 53], [60, 56], [34, 88], [72, 84]],
    lines: [[0, 2], [2, 3], [3, 4], [4, 1], [2, 5], [4, 6]],
  },
  {
    // 전갈자리 — 데스크탑 전용
    wrap: "right-[1%] top-[45%] hidden md:block md:h-[220px] md:w-[220px] md:opacity-[0.20]",
    stars: [[16, 12], [26, 24], [34, 38], [44, 52], [56, 62], [68, 68], [78, 58], [72, 46]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  {
    // 삼각형자리 — 데스크탑 전용
    wrap: "left-[1%] top-[47%] hidden md:block md:h-[160px] md:w-[160px] md:opacity-[0.18]",
    stars: [[16, 30], [82, 20], [52, 64]],
    lines: [[0, 1], [1, 2], [2, 0]],
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
            style={{ left: `${left}%`, top: `${top}%`, width: `${r * 2}px`, height: `${r * 2}px`, opacity: 0.2 }}
          />
        ))}
      </div>

      {/* 여러 별자리 */}
      {constellations.map((c, i) => (
        <Constellation key={i} c={c} />
      ))}

      {/* 간지(干支) 원형 도표 — 중앙 은은한 워터마크 (모바일 작게) */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 text-hanok-wood opacity-[0.09] sm:h-[480px] sm:w-[480px] md:h-[680px] md:w-[680px] md:opacity-[0.10]"
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

      <div className="container relative py-16 text-center sm:py-20 md:py-40">
        {/* 낙관(落款) — 붉은 도장 + 브랜드 한자 */}
        <div className="mx-auto mb-6 flex w-fit items-center gap-2.5 md:mb-7 md:gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-yeonji text-[15px] font-semibold text-[#fdf6ea] shadow-sm md:h-10 md:w-10 md:text-[17px]">
            印
          </span>
          <span className="font-serif text-[17px] font-semibold tracking-[0.16em] text-hanok-wood md:text-[22px] md:tracking-[0.18em]">
            정통 사주명리
          </span>
        </div>

        <h1 className="mx-auto max-w-3xl font-serif text-[28px] font-bold leading-[1.35] tracking-tight text-ink sm:text-[34px] md:text-[50px] md:leading-[1.25]">
          <span className="block">천간지지에 새겨진 운명,</span>
          <span className="block">당신의 때를</span>
          <span className="block">명확하게 풀어드립니다</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-charcoal md:mt-6 md:text-[17px]">
          정통 만세력과 깊이 있는 해석이 만나는 사주 상담.
          <br className="hidden sm:block" />
          {" "}오늘의 운세부터 연애·궁합, 직업운, 재물운까지
          <br className="hidden sm:block" />
          {" "}한 분 한 분 정성껏 풀어드립니다.
        </p>

        {/* 조각보 — 굵은 포인트 띠 */}
        <div className="mx-auto mt-8 flex w-fit gap-1.5 md:mt-9 md:gap-2">
          {jogakboColors.map((c) => (
            <span
              key={c}
              className="h-7 w-7 rounded-[5px] shadow-sm md:h-10 md:w-10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="mx-auto mt-9 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center md:mt-10">
          <Link href="/free" className={cn(buttonVariants({ size: "lg" }), "px-8")}>
            무료로 먼저 체험하기
          </Link>
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "px-8")}
          >
            상품 바로 보기
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-sm text-[12px] leading-relaxed text-mute md:max-w-none md:text-[13px]">
          <span className="block md:inline">회원 전용 · 카카오 간편 로그인</span>
          <span className="hidden md:inline"> · </span>
          <span className="block md:inline">정통 만세력 기반 · 1900~2100년 분석</span>
        </p>
      </div>
    </section>
  );
}
