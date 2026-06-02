// =====================================================
// 사이트 메타 / 사업자 정보
// =====================================================
// 운영 전 본인 정보로 반드시 교체하세요. 아래는 모두 더미 데이터입니다.

export const siteConfig = {
  name: "청담엘사주",
  tagline: "하늘이 새긴 운명을 읽다",
  description: "정통 만세력과 AI 해석이 만나는 사주 상담. 오늘의 운세부터 연애·궁합, 직업운, 재물운까지 한 분 한 분 정성껏 풀어드립니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "support@example.com",
};

// 통신판매업 / 사업자 정보 — 법적 페이지 및 푸터에 노출됩니다.
// ※ 아래 값은 모두 더미입니다. 운영 전 본인 사업자 정보로 반드시 교체하세요.
export const businessInfo = {
  companyName: "누보한",
  representative: "이은희",
  businessNumber: "198-61-00763",
  mailOrderNumber: "2025-제주대정-063",
  address: "제주특별자치도 서귀포시 대정읍 에듀시티로 148, 102-202",
  phone: "010-0000-0000", // TODO: 실제 고객문의 번호로 교체
  phoneNote: "문자만 가능 · 평일 11-15시", // 비우면 푸터에서 부가표시 없이 노출
  email: "contact@example.com", // TODO: 실제 고객문의 이메일로 교체
  privacyOfficer: "이은희",
  // 호스팅 / 주요 처리 위탁 업체 — 개인정보처리방침에 노출
  hostingProvider: "Vercel Inc.",
  // 시행일 — 약관 / 개인정보처리방침 / 환불정책에 공통 노출
  effectiveDate: "2026-06-02",
};
