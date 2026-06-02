// 한옥 컨셉 — 브랜드 소개 + 신뢰 요소 3가지.
const features = [
  {
    glyph: "命",
    title: "정통 만세력",
    desc: "1900~2100년을 아우르는 정확한 사주 명식. 절기·시주까지 정밀하게 세웁니다.",
  },
  {
    glyph: "情",
    title: "정성스러운 풀이",
    desc: "기계적인 요약이 아니라, 한 분 한 분의 고민에 맞춰 깊이 있게 풀어드립니다.",
  },
  {
    glyph: "密",
    title: "안심 비밀 상담",
    desc: "입력하신 사주 정보는 안전하게 보호되며, 결과는 오직 본인만 확인합니다.",
  },
];

export function Intro() {
  return (
    <section className="border-t border-hairline">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">WHY 청담엘사주</p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
            천 년을 이어온 지혜로,<br className="hidden sm:block" /> 오늘의 길을 봅니다
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-body">
            사주(四柱)는 태어난 연·월·일·시 네 기둥에 담긴 하늘의 이치입니다.
            청담엘사주는 정통 명리학과 정성스러운 해석으로 당신의 흐름을 읽어드립니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-hairline bg-canvas p-8 text-center"
            >
              <div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full font-serif text-2xl font-semibold text-[#fdf6ea]"
                style={{ backgroundColor: "#6b4a2f" }}
              >
                {f.glyph}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="text-sm leading-relaxed text-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
