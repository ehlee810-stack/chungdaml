// 한옥 컨셉 — 한지 보조 면 위에 연지빛 번호 마커. (가장 눈에 띄는 안내 섹션)
export function HowItWorks() {
  const steps = [
    { n: "01", t: "사주 선택", d: "1인·2인 종합사주부터 자녀 사주까지" },
    { n: "02", t: "사주 입력", d: "생년월일 · 출생 시각 · 성별 · 고민" },
    { n: "03", t: "결제", d: "안전하고 간편한 결제로 빠르게 진행" },
    { n: "04", t: "결과 확인", d: "정성껏 풀어낸 맞춤 리포트 즉시 확인" },
  ];
  return (
    <section id="how-it-works" className="border-t border-hairline bg-surface-soft">
      <div className="container py-20 md:py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-sm tracking-[0.3em] text-yeonji">HOW IT WORKS</p>
          <h2 className="font-serif text-[30px] font-bold tracking-tight text-ink md:text-[44px]">
            이용 방법
          </h2>
        </div>
        <ol className="grid gap-12 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <p className="mb-3 font-mono text-2xl font-bold text-yeonji">{s.n}</p>
              <p className="mb-2 text-xl font-bold text-ink">{s.t}</p>
              <p className="text-[15px] leading-relaxed text-body">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
