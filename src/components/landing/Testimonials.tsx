// 한옥 컨셉 — 고객 후기 섹션 (샘플). 실제 후기는 운영 중 쌓이면 교체.
const reviews = [
  {
    text: "몇 달을 진로 때문에 고민했는데, 제 성향에 맞는 방향을 콕 짚어주셔서 결정에 큰 도움이 됐어요. 막연함이 사라졌습니다.",
    name: "김○○ 님",
    tag: "종합사주(1인)",
  },
  {
    text: "아이 공부 방향이 늘 걱정이었는데, 기질을 어찌나 정확히 보시는지 깜짝 놀랐어요. 양육 조언까지 알차서 두 번 읽었습니다.",
    name: "이○○ 님",
    tag: "자녀사주(1인)",
  },
  {
    text: "결혼을 앞두고 궁합이 궁금해 봤어요. 잘 맞는 점도, 조심할 점도 솔직하게 짚어주셔서 오히려 마음이 놓였습니다.",
    name: "박○○ 님",
    tag: "종합사주(2인)",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-hairline bg-surface-soft">
      <div className="container py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-yeonji">REVIEWS</p>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-ink md:text-[34px]">
            먼저 받아보신 분들의 이야기
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-lg border border-hairline bg-canvas p-7"
            >
              <div className="mb-3 text-lg tracking-tight text-yeonji">★★★★★</div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-charcoal">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-hairline pt-4 text-sm">
                <span className="font-semibold text-ink">{r.name}</span>
                <span className="text-xs text-mute">{r.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
