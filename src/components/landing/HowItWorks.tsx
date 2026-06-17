import Image from "next/image";

// 한옥 컨셉 — 한지 보조 면 위에 연지빛 번호 마커. (가장 눈에 띄는 안내 섹션)
export function HowItWorks() {
  const steps = [
    { n: "01", t: "사주 선택", d: "평생사주·궁합부터 연애·자녀 사주까지" },
    { n: "02", t: "사주 입력", d: "생년월일 · 출생 시각 · 성별 · 고민" },
    { n: "03", t: "결제", d: "안전하고 간편한 결제로 빠르게 진행" },
    { n: "04", t: "결과 확인", d: "정성껏 풀어낸 맞춤 리포트 즉시 확인" },
  ];
  return (
    <section id="how-it-works" className="border-t border-hairline bg-surface-soft">
      <div className="container py-14 sm:py-20 md:py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">HOW IT WORKS</p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
            이용 방법
          </h2>
        </div>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          {/* 캐릭터 엘 */}
          <div className="flex-shrink-0 w-56 sm:w-64 md:w-[320px]">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-hanok-wood/10 to-transparent blur-2xl" />
              <Image
                src="/el-character-2.png"
                alt="엘이 사주를 읽어드립니다"
                width={380}
                height={380}
                className="relative w-full rounded-3xl shadow-xl"
              />
            </div>
            <p className="mt-3 text-center text-[13px] text-hanok-wood font-serif tracking-widest opacity-70">
              엘이 직접 읽어드립니다
            </p>
          </div>

          {/* 이용 단계 */}
          <ol className="flex-1 grid grid-cols-2 gap-x-6 gap-y-10 md:gap-12">
            {steps.map((s) => (
              <li key={s.n}>
                <p className="mb-3 font-mono text-2xl font-bold text-yeonji">{s.n}</p>
                <p className="mb-2 text-xl font-bold text-ink">{s.t}</p>
                <p className="text-[15px] leading-relaxed text-body">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
