// 한옥 컨셉 — 고객 후기 섹션 (샘플). 실제 후기는 운영 중 쌓이면 교체.
const reviews = [
  {
    text: "막연했던 진로 고민이 정리됐어요. 제 사주 흐름을 짚어주시니 마음이 한결 편해졌습니다.",
    name: "김○○ 님",
    tag: "1인 종합 사주",
  },
  {
    text: "아이 공부 방향 때문에 봤는데, 성향을 너무 정확히 맞히셔서 놀랐어요. 큰 도움 됐습니다.",
    name: "이○○ 님",
    tag: "자녀 종합 사주",
  },
  {
    text: "결혼 시기랑 궁합을 자세히 풀어주셔서 좋았어요. 따뜻하게 상담해주셔서 감사했습니다.",
    name: "박○○ 님",
    tag: "2인 종합 사주",
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
