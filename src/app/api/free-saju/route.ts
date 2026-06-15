import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { computeMyeongsik } from "@/lib/saju/manseryeok";
import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

const ILGAN_INFO: Record<string, { hanja: string; oheng: string; yinyang: string; trait: string }> = {
  갑: {
    hanja: "甲", oheng: "木", yinyang: "양(陽)",
    trait: "리더십이 강하고 진취적인 성향으로, 새로운 길을 개척하는 데 두려움이 없습니다. 굵고 올곧게 위를 향해 자라는 나무처럼, 목표를 향해 흔들리지 않고 나아가는 힘이 있습니다.",
  },
  을: {
    hanja: "乙", oheng: "木", yinyang: "음(陰)",
    trait: "섬세하고 유연한 감수성으로, 어떤 환경에도 부드럽게 적응하는 능력이 뛰어납니다. 넝쿨처럼 주변을 감싸며 자라는 기운이라, 관계 속에서 빛을 발하는 타입입니다.",
  },
  병: {
    hanja: "丙", oheng: "火", yinyang: "양(陽)",
    trait: "태양처럼 밝고 열정적이며, 주변 사람들에게 활기와 긍정 에너지를 자연스럽게 퍼뜨립니다. 사교적이고 표현력이 풍부하며, 있는 자리를 따뜻하게 만드는 매력이 있습니다.",
  },
  정: {
    hanja: "丁", oheng: "火", yinyang: "음(陰)",
    trait: "촛불처럼 지혜롭고 신중하며, 섬세한 감성과 깊은 집중력을 지닙니다. 조용하지만 한 번 붙은 마음의 불꽃은 오래도록 타오르는, 진득한 내면의 힘이 있습니다.",
  },
  무: {
    hanja: "戊", oheng: "土", yinyang: "양(陽)",
    trait: "큰 산처럼 듬직하고 포용력이 넓어, 주변 사람들에게 자연스러운 신뢰와 안정감을 줍니다. 굳건하고 중심이 있어, 어려운 상황에서도 흔들리지 않는 버팀목이 됩니다.",
  },
  기: {
    hanja: "己", oheng: "土", yinyang: "음(陰)",
    trait: "성실하고 꼼꼼하며, 세심한 배려로 주변을 살피는 능력이 탁월합니다. 논밭처럼 조용히 영양을 공급하는 기운이라, 눈에 띄지 않아도 꼭 필요한 존재로 인정받는 타입입니다.",
  },
  경: {
    hanja: "庚", oheng: "金", yinyang: "양(陽)",
    trait: "강직하고 결단력이 있으며, 의리와 추진력으로 목표를 향해 거침없이 나아갑니다. 단단한 쇠처럼 한 번 다진 결심은 쉽게 꺾이지 않는, 굳센 의지의 소유자입니다.",
  },
  신: {
    hanja: "辛", oheng: "金", yinyang: "음(陰)",
    trait: "예리하고 완벽을 추구하며, 세련된 감각과 날카로운 분석력이 돋보입니다. 보석처럼 빛나는 재능을 지니고 있으며, 깐깐하지만 그만큼 높은 품질을 만들어내는 타입입니다.",
  },
  임: {
    hanja: "壬", oheng: "水", yinyang: "양(陽)",
    trait: "큰 강처럼 지혜롭고 포용력이 넓으며, 유연하게 상황을 읽고 흐르는 감성을 지닙니다. 막힌 곳을 돌아가며 결국 바다에 이르듯, 목표를 향해 유연하게 나아가는 힘이 있습니다.",
  },
  계: {
    hanja: "癸", oheng: "水", yinyang: "음(陰)",
    trait: "섬세한 직관력과 내면의 깊이로, 신중하게 상황을 꿰뚫어 보는 능력이 있습니다. 이슬처럼 조용하지만 촉촉하게 스며드는 감성으로, 사람의 마음을 세심하게 어루만지는 타입입니다.",
  },
};

const bodySchema = z.object({
  name: z.string().max(20).optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().nullable().optional(),
  timeUnknown: z.boolean(),
  gender: z.enum(["male", "female"]),
  calendar: z.enum(["solar", "lunar"]),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "입력 오류입니다." }, { status: 400 });
  }
  const { name, birthDate, birthTime, timeUnknown, gender, calendar, email } = parsed.data;

  const myeongsik = await computeMyeongsik({
    birthDate,
    birthTime: timeUnknown ? null : (birthTime ?? null),
    timeUnknown,
    calendar,
    gender,
  });

  const ilgan = myeongsik.day.cheongan;
  const ilganInfo = ILGAN_INFO[ilgan] ?? {
    hanja: "?", oheng: "土", yinyang: "?",
    trait: "독특하고 깊은 기운을 지니고 있습니다.",
  };

  if (isSupabaseConfigured()) {
    try {
      const service = createServiceClient();
      await service.from("free_leads").upsert(
        {
          email,
          name: name || null,
          birth_date: birthDate,
          birth_time: timeUnknown ? null : (birthTime || null),
          time_unknown: timeUnknown,
          gender,
          calendar,
        },
        { onConflict: "email" },
      );
    } catch {
      // 리드 저장 실패해도 결과는 반환
    }
  }

  return NextResponse.json({ myeongsik, ilgan, ilganInfo });
}
