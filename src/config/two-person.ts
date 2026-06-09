// 두 사람의 정보가 필요한 상품 정의 (폼·결과 생성 공통 사용)
export const TWO_PERSON: Record<string, { label1: string; label2: string }> = {
  "couple-saju": { label1: "첫 번째 분", label2: "두 번째 분" },
  "children-saju": { label1: "첫째 아이", label2: "둘째 아이" },
  "jamidusu-gunghap": { label1: "본인", label2: "상대방" },
  "jamidusu-jaehoe": { label1: "본인", label2: "상대방 (헤어진 인연)" },
  "reunion": { label1: "본인", label2: "상대방 (헤어진 인연)" },
};

export function twoPersonLabels(slug: string): { label1: string; label2: string } | null {
  return TWO_PERSON[slug] ?? null;
}
