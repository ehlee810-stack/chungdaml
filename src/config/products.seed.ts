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
    name: "1인 종합 사주",
    description: "사주 4기둥으로 보는 성향·대운·재물운·직업운 종합 리포트",
    price: 35000,
    compare_at_price: 70000,
    display_order: 10,
    is_active: true,
  },
  {
    slug: "couple-saju",
    name: "2인 종합 사주",
    description: "두 사람의 사주와 궁합을 함께 보는 종합 리포트",
    price: 65000,
    compare_at_price: 140000,
    display_order: 20,
    is_active: true,
  },
  {
    slug: "child-saju",
    name: "1인 자녀 종합 사주",
    description: "자녀 한 명의 사주로 보는 공부 성향·적성·진로·학업운",
    price: 35000,
    compare_at_price: 70000,
    display_order: 30,
    is_active: true,
  },
  {
    slug: "children-saju",
    name: "2인 자녀 종합 사주",
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
    display_order: 50,
    is_active: true,
  },
];
