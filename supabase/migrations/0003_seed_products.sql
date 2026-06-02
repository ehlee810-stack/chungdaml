-- =====================================================
-- 상품 시드 (청담엘사주 라인업)
-- =====================================================
-- src/config/products.seed.ts 와 동일하게 유지하세요.
-- compare_at_price = 정가(취소선), price = 실제 판매가(할인가)

insert into public.products (slug, name, description, price, compare_at_price, display_order, is_active)
values
  ('solo-saju', '1인 종합 사주', '사주 4기둥으로 보는 성향·대운·재물운·직업운 종합 리포트', 35000, 70000, 10, true),
  ('couple-saju', '2인 종합 사주', '두 사람의 사주와 궁합을 함께 보는 종합 리포트', 65000, 140000, 20, true),
  ('child-saju', '1인 자녀 종합 사주', '자녀 한 명의 사주로 보는 공부 성향·적성·진로·학업운', 35000, 70000, 30, true),
  ('children-saju', '2인 자녀 종합 사주', '자녀 두 명을 함께 보는 학업·진로 리포트 (형제·자매 비교)', 65000, 140000, 40, true),
  ('weekly-fortune', '이번주 운세 (구독)', '매주 내 사주 흐름에 맞춘 한 주 운세를 받아보는 주간 구독', 4900, 9800, 50, true)
on conflict (slug) do nothing;
