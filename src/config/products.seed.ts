// =====================================================
// 상품 시드 (scripts/seed-products.ts 에서 사용)
// =====================================================
// 청담엘사주 상품 라인업. 수정 후 pnpm seed:products 로 DB에 반영합니다.
// compare_at_price = 정가(취소선), price = 실제 판매가(할인가)

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
    slug: "solo-saju",
    name: "종합사주(1인)",
    description: "사주 4기둥으로 보는 성향·대운·재물운·직업운 종합 리포트",
    price: 35000,
    compare_at_price: 70000,
    display_order: 10,
    is_active: true,
  },
  {
    slug: "couple-saju",
    name: "종합사주(2인)",
    description: "두 사람의 사주와 궁합을 함께 보는 종합 리포트",
    price: 65000,
    compare_at_price: 140000,
    display_order: 20,
    is_active: true,
  },
  {
    slug: "child-saju",
    name: "자녀사주(1인)",
    description: "자녀 한 명의 사주로 보는 공부 성향·적성·진로·학업운",
    price: 35000,
    compare_at_price: 70000,
    display_order: 30,
    is_active: true,
  },
  {
    slug: "children-saju",
    name: "자녀사주(2인)",
    description: "자녀 두 명을 함께 보는 학업·진로 리포트 (형제·자매 비교)",
    price: 65000,
    compare_at_price: 140000,
    display_order: 40,
    is_active: true,
  },
  {
    slug: "weekly-fortune",
    name: "이번주 운세 (구독)",
    description: "매주 내 사주 흐름에 맞춘 한 주 운세를 받아보는 주간 구독",
    price: 4900,
    compare_at_price: 9800,
    display_order: 80,
    is_active: true,
  },
  {
    slug: "jamidusu-gunghap",
    name: "자미두수 궁합",
    description:
      "두 사람의 자미두수 명반(명궁·부부궁·재백궁·관록궁)을 비교해 성격 궁합, 감정 표현 방식, 결혼 가능성, 장기 연애 안정성, 그리고 2026 병오년 연애 흐름까지 자세히 풀어드립니다.",
    price: 8900,
    display_order: 60,
    is_active: true,
  },
  {
    slug: "jamidusu-jaehoe",
    name: "자미두수 재회운",
    description:
      "부부궁·자녀궁·명궁·천이궁과 화록·화기·록존·유년 흐름을 살펴 재회 가능성과 재접촉 시기(4~6월·9월 전후), 재연결 이후 안정 또는 재충돌·반복 이별 패턴까지 풀어드립니다.",
    price: 14900,
    display_order: 70,
    is_active: true,
  },
];
