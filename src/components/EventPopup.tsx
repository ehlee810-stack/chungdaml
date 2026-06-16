import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { EventPopupClient } from "./EventPopupClient";

// 오픈 기념 이벤트 팝업. 쿠폰이 활성이고 잔여 인원이 있을 때만 렌더.
// coupons 테이블이 없거나 오류여도 안전하게 null.
export async function EventPopup() {
  if (!isSupabaseConfigured()) return null;

  let remaining: number | null = null;
  try {
    const service = createServiceClient();
    const { data } = await service
      .from("coupons")
      .select("max_uses, used_count, is_active")
      .eq("code", "OPEN30")
      .maybeSingle();
    if (!data || !data.is_active) return null;
    remaining = data.max_uses - data.used_count;
  } catch {
    return null;
  }

  if (remaining == null || remaining <= 0) return null;

  return <EventPopupClient remaining={remaining} />;
}
