// 한옥 컨셉 — 한지 보조 면 위에 연지빛 번호 마커.
export function HowItWorks() {
  const steps = [
    { n: "01", t: "사주 선택", d: "1인·2인 종합사주부터 자녀 사주까지" },
    { n: "02", t: "사주 입력", d: "생년월일 · 출생 시각 · 성별 · 고민" },
    { n: "03", t: "결제", d: "토스페이먼츠로 안전하게 결제" },
    { n: "04", t: "결과 확인", d: "정성껏 풀어낸 맞춤 리포트 즉시 확인" },
  ];
  return (
    <section id="how-it-works" className="border-t border-hairline bg-surface-soft">
      <div className="container py-20">
        <h2 className="mb-12 text-center font-serif text-2xl md:text-3xl font-semibold tracking-tight text-ink">
          이용 방법
        </h2>
        <ol className="grid gap-10 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <p className="mb-3 font-mono text-sm font-semibold text-yeonji">{s.n}</p>
              <p className="mb-1.5 text-base font-semibold text-ink">{s.t}</p>
              <p className="text-sm leading-relaxed text-body">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
