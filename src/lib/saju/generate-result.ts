// =====================================================
// 주문 1건에 대한 사주 결과 생성 + 저장 (유료 결제·무료 쿠폰 공용)
// =====================================================
// confirm(유료) / free-confirm(쿠폰) 양쪽에서 호출해 결과지 생성 로직을 일원화.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { computeMyeongsik, type Myeongsik } from "./manseryeok";
import { buildSajuPrompt } from "./prompt";
import { generateInterpretation } from "./llm";
import {
  isSajuApiConfigured,
  fetchSajuAnalysis,
  formatSajuToManseryeok,
  ganjiToMyeongsik,
  type BirthInfo,
} from "./saju-api";
import { twoPersonLabels } from "@/config/two-person";
import type { PartnerInput } from "@/types/database";

type SajuInputRow = {
  birth_date: string;
  birth_time: string | null;
  time_unknown: boolean;
  calendar: "solar" | "lunar";
  gender: "male" | "female";
  concerns: string[];
  partner: PartnerInput | null;
};

function toBirthInfo(input: SajuInputRow): BirthInfo {
  const [y, m, d] = input.birth_date.split("-");
  const hasTime = !input.time_unknown && !!input.birth_time;
  const [hh, mm] = hasTime ? input.birth_time!.split(":") : [undefined, undefined];
  return {
    birthYear: y,
    birthMonth: String(parseInt(m, 10)),
    birthDay: String(parseInt(d, 10)),
    ...(hasTime ? { birthHour: String(parseInt(hh!, 10)), birthMinute: String(parseInt(mm!, 10)) } : {}),
    calendarType: input.calendar === "lunar" ? "음력" : "양력",
    gender: input.gender,
  };
}

function toComputeInput(input: SajuInputRow) {
  return {
    birthDate: input.birth_date,
    birthTime: input.birth_time,
    timeUnknown: input.time_unknown,
    calendar: input.calendar,
    gender: input.gender,
  };
}

function partnerToBirthInfo(p: PartnerInput): BirthInfo {
  const [y, m, d] = p.birthDate.split("-");
  const hasTime = !p.timeUnknown && !!p.birthTime;
  const [hh, mm] = hasTime ? p.birthTime!.split(":") : [undefined, undefined];
  return {
    birthYear: y,
    birthMonth: String(parseInt(m, 10)),
    birthDay: String(parseInt(d, 10)),
    ...(hasTime ? { birthHour: String(parseInt(hh!, 10)), birthMinute: String(parseInt(mm!, 10)) } : {}),
    calendarType: p.calendar === "lunar" ? "음력" : "양력",
    gender: p.gender,
  };
}

function partnerBasicText(p: PartnerInput): string {
  const time = p.timeUnknown ? " (시 미상)" : p.birthTime ? ` ${p.birthTime}` : "";
  return `생년월일: ${p.birthDate}${time} / 성별: ${p.gender === "male" ? "남성" : "여성"} / 달력: ${p.calendar === "lunar" ? "음력" : "양력"}`;
}

// order(주문 row)의 사주 입력을 읽어 결과지를 생성하고 saju_results 에 저장 → resultId 반환.
// 결과가 이미 있으면 그 id 를 그대로 반환(idempotent).
export async function generateAndStoreResult(
  service: SupabaseClient<Database>,
  args: { orderDbId: string; productSlug: string; productName: string },
): Promise<{ resultId: string }> {
  const { orderDbId, productSlug, productName } = args;

  // 이미 생성된 결과가 있으면 재사용
  const { data: existing } = await service
    .from("saju_results")
    .select("id")
    .eq("order_id", orderDbId)
    .maybeSingle();
  if (existing) return { resultId: existing.id };

  const { data: input } = await service
    .from("saju_inputs")
    .select("*")
    .eq("order_id", orderDbId)
    .single();
  if (!input) throw new Error("사주 입력 조회 실패");

  // 만세력/풀 분석: luckyloveme 키가 있으면 실제 API, 없거나 실패하면 mock 으로 폴백
  let myeongsik: Myeongsik;
  let manseryeokText: string | undefined;

  if (isSajuApiConfigured()) {
    try {
      const birthInfo = toBirthInfo(input);
      const analysis = await fetchSajuAnalysis(birthInfo, [], { source: "confirm" });
      const converted = ganjiToMyeongsik(analysis);
      if (converted) {
        myeongsik = converted;
        manseryeokText = formatSajuToManseryeok(analysis, birthInfo);
      } else {
        myeongsik = await computeMyeongsik(toComputeInput(input));
      }
    } catch (apiErr) {
      console.error("[saju-api] fallback to mock:", apiErr);
      myeongsik = await computeMyeongsik(toComputeInput(input));
    }
  } else {
    myeongsik = await computeMyeongsik(toComputeInput(input));
  }

  // 2인 상품: 두 번째 사람 명식
  const labels = twoPersonLabels(productSlug);
  const partner = input.partner as PartnerInput | null;
  let partnerSajuText: string | undefined;
  if (labels && partner) {
    if (isSajuApiConfigured()) {
      try {
        const pBirth = partnerToBirthInfo(partner);
        const pAnalysis = await fetchSajuAnalysis(pBirth, [], { source: "confirm" });
        partnerSajuText = formatSajuToManseryeok(pAnalysis, pBirth);
      } catch {
        partnerSajuText = partnerBasicText(partner);
      }
    } else {
      partnerSajuText = partnerBasicText(partner);
    }
  }

  const { system, user } = buildSajuPrompt({
    productSlug,
    productName,
    myeongsik,
    manseryeokText,
    selfLabel: labels?.label1,
    partnerLabel: labels?.label2,
    partnerSajuText,
    birthDate: input.birth_date,
    birthTime: input.birth_time,
    timeUnknown: input.time_unknown,
    gender: input.gender,
    concerns: input.concerns,
  });

  const llm = await generateInterpretation({ system, user });

  const { data: result, error: resultErr } = await service
    .from("saju_results")
    .insert({
      order_id: orderDbId,
      myeongsik: myeongsik as never,
      interpretation_md: llm.text,
      llm_provider: llm.provider,
      llm_model: llm.model,
    })
    .select("id")
    .single();

  if (resultErr || !result) {
    throw new Error(`결과 저장 실패: ${resultErr?.message ?? "unknown"}`);
  }

  return { resultId: result.id };
}
