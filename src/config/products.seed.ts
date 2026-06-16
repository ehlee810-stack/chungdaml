// =====================================================
// 상품 시드 (scripts/seed-products.ts 에서 사용)
// =====================================================
// 청담엘사주 상품 라인업. 수정 후 pnpm seed:products 로 DB에 반영합니다.
// compare_at_price = 정가(취소선, 만원 단위), price = 실제 판매가(할인가)
// 가격 정책: 운세위키(luckyloveme) 경쟁가 기준 — 동일 콘텐츠라 시장가에 맞춤.

export type ProductSeed = {
  slug: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  display_order: number;
  is_active: boolean;
};

export const productsSeed: ProductSeed[] = [
  {
    slug: "sinnyeon-fortune",
    name: "2026 신년운세",
    description:
      "2026 병오년, 나의 한 해 — 재물·일·연애·건강의 흐름과 월별 운세까지, 다가올 한 해를 미리 손에 쥐어드립니다.",
    price: 14900,
    compare_at_price: 30000,
    display_order: 5,
    is_active: true,
  },
  {
    slug: "half-year-fortune",
    name: "2026 하반기 운세",
    description:
      "2026년, 아직 절반이 남았습니다 — 하반기 재물·일·연애·건강의 흐름과 7~12월 월별 운세까지, 남은 반년을 알차게 준비하세요.",
    price: 9900,
    compare_at_price: 20000,
    display_order: 7,
    is_active: true,
  },
  {
    slug: "solo-saju",
    name: "정통 평생사주",
    description:
      "내가 타고난 그릇과 인생 전체의 흐름 — 성향·강점·재물·직업·애정·대운까지 한 번에 짚는 정통 사주 리포트.",
    price: 9900,
    compare_at_price: 20000,
    display_order: 10,
    is_active: true,
  },
  {
    slug: "couple-saju",
    name: "정통 궁합 (2인)",
    description:
      "우리 두 사람, 평생 잘 맞을까 — 성격 궁합·속마음·결혼 가능성·갈등 해법까지 두 사주를 깊이 있게 풀어드립니다.",
    price: 12900,
    compare_at_price: 30000,
    display_order: 20,
    is_active: true,
  },
  {
    slug: "love-fortune",
    name: "연애운",
    description:
      "내 인연은 언제, 어떤 모습으로 올까 — 타고난 매력과 잘 맞는 사람, 인연이 들어오는 시기와 올해 연애 흐름을 짚어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 30,
    is_active: true,
  },
  {
    slug: "reunion",
    name: "재회운",
    description:
      "그 사람과 다시 만날 수 있을까 — 재회 가능성과 다시 연결되는 시기, 그 후의 흐름과 마음 정리까지 사주로 풀어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 35,
    is_active: true,
  },
  {
    slug: "jamidusu-gunghap",
    name: "자미두수 궁합",
    description:
      "두 사람의 자미두수 명반(명궁·부부궁·재백궁·관록궁)을 비교해 성격 궁합, 감정 표현 방식, 결혼 가능성, 장기 연애 안정성, 그리고 2026 병오년 연애 흐름까지 자세히 풀어드립니다.",
    price: 8900,
    compare_at_price: 20000,
    display_order: 40,
    is_active: true,
  },
  {
    slug: "jamidusu-jaehoe",
    name: "자미두수 재회운",
    description:
      "부부궁·자녀궁·명궁·천이궁과 화록·화기·록존·유년 흐름을 살펴 재회 가능성과 재접촉 시기(4~6월·9월 전후), 재연결 이후 안정 또는 재충돌·반복 이별 패턴까지 풀어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 45,
    is_active: true,
  },
  {
    slug: "wealth-fortune",
    name: "금전·재물운",
    description:
      "내 돈은 언제 들어오고 어떻게 불어날까 — 타고난 재물 그릇과 돈이 모이는 시기, 투자 성향과 올해 금전운까지 짚어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 50,
    is_active: true,
  },
  {
    slug: "career-fortune",
    name: "취업·합격운",
    description:
      "이번엔 될까 — 타고난 직업 적성과 잘 맞는 분야, 합격·취업의 기회가 열리는 시기와 면접·시험 전략을 사주로 짚어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 55,
    is_active: true,
  },
  {
    slug: "child-saju",
    name: "자녀 사주",
    description: "우리 아이의 타고난 기질·재능·적성과 공부 스타일, 진로·학업운까지 한 명 한 명 정성껏 풀어드립니다.",
    price: 9900,
    compare_at_price: 20000,
    display_order: 60,
    is_active: true,
  },
  {
    slug: "children-saju",
    name: "자녀 사주 (2인)",
    description: "두 아이를 함께 보는 학업·진로 리포트 — 형제·자매의 기질을 비교하고 각자 맞춤 양육 포인트를 짚어드립니다.",
    price: 12900,
    compare_at_price: 30000,
    display_order: 65,
    is_active: true,
  },
  {
    slug: "pet-saju",
    name: "반려동물 사주",
    description:
      "우리 아이(반려동물)의 타고난 기질과 성향, 주인과의 궁합, 건강에서 살필 점, 더 잘 지내는 법까지 사주로 다정하게 풀어드립니다.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 80,
    is_active: true,
  },
  {
    slug: "weekly-fortune",
    name: "이번주 운세 (구독)",
    description: "매주 내 사주 흐름에 맞춘 한 주 운세를 받아보는 주간 구독 — 가볍게 시작하는 나의 운세 습관.",
    price: 4900,
    compare_at_price: 10000,
    display_order: 85,
    is_active: true,
  },
];
