"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Pillar = { cheongan: string; jiji: string };
type Myeongsik = { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null };
type IlganInfo = { hanja: string; oheng: string; yinyang: string; trait: string };
type FreeSajuResult = { myeongsik: Myeongsik; ilgan: string; ilganInfo: IlganInfo };

const OHENG_TEXT: Record<string, string> = {
  木: "text-[#4a7c59]",
  火: "text-yeonji",
  土: "text-[#9a6e3a]",
  金: "text-[#b89a40]",
  水: "text-[#4a6d8c]",
};

const OHENG_RING: Record<string, string> = {
  木: "border-[#4a7c59]/30 bg-[#4a7c59]/5",
  火: "border-yeonji/30 bg-yeonji/5",
  土: "border-[#9a6e3a]/30 bg-[#9a6e3a]/5",
  金: "border-[#b89a40]/30 bg-[#b89a40]/5",
  水: "border-[#4a6d8c]/30 bg-[#4a6d8c]/5",
};

const OHENG_KR: Record<string, string> = { 木: "목", 火: "화", 土: "토", 金: "금", 水: "수" };

const CHAR_OHENG: Record<string, string> = {
  갑: "木", 을: "木", 인: "木", 묘: "木",
  병: "火", 정: "火", 사: "火", 오: "火",
  무: "土", 기: "土", 진: "土", 술: "土", 축: "土", 미: "土",
  경: "金", 신: "金", 유: "金",
  임: "水", 계: "水", 해: "水", 자: "水",
};

function PillarCard({ label, pillar, highlight = false }: {
  label: string;
  pillar: Pillar | null;
  highlight?: boolean;
}) {
  const ganOheng = pillar ? (CHAR_OHENG[pillar.cheongan] ?? "土") : "";
  const jiOheng = pillar ? (CHAR_OHENG[pillar.jiji] ?? "土") : "";
  return (
    <div className={cn(
      "flex flex-col items-center rounded-xl border py-4 px-1",
      highlight ? "border-yeonji/40 bg-yeonji/5 shadow-sm" : "border-hairline bg-white/70",
    )}>
      <span className="mb-2 text-[10px] font-semibold tracking-widest text-mute">{label}</span>
      {pillar ? (
        <>
          <span className={cn("text-[26px] font-bold leading-none", OHENG_TEXT[ganOheng])}>
            {pillar.cheongan}
          </span>
          <span className="my-1 text-[9px] text-hairline-strong">天干</span>
          <span className={cn("text-[26px] font-bold leading-none", OHENG_TEXT[jiOheng])}>
            {pillar.jiji}
          </span>
          <span className="mt-1 text-[9px] text-hairline-strong">地支</span>
        </>
      ) : (
        <>
          <span className="text-2xl font-bold leading-none text-mute/30">?</span>
          <span className="mt-2 text-[9px] text-mute">시 미상</span>
        </>
      )}
    </div>
  );
}

const TEASER = [
  "타고난 성향·기질 (심층 분석)",
  "재물운 & 직업 적성",
  "평생 대운(大運) 흐름",
  "올해의 세운(歲運) 분석",
  "인간관계 & 연애 성향",
  "건강 주의점 & 생활 조언",
];

export default function FreeSajuClient() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("female");
  const [calendar, setCalendar] = useState<"solar" | "lunar">("solar");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FreeSajuResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/free-saju", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || undefined,
          birthDate,
          birthTime: timeUnknown ? null : (birthTime || null),
          timeUnknown,
          gender,
          calendar,
          email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "오류가 발생했습니다.");
      setResult(data as FreeSajuResult);
      setTimeout(() => {
        document.getElementById("free-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  if (result) {
    const { myeongsik, ilgan, ilganInfo } = result;
    const ohengColor = OHENG_TEXT[ilganInfo.oheng] ?? "text-ink";
    const ohengRing = OHENG_RING[ilganInfo.oheng] ?? "border-hairline bg-white/70";

    return (
      <div id="free-result" className="container max-w-lg py-12">
        <div className="mb-6 text-center">
          <span className="mb-3 inline-block rounded-full bg-yeonji/10 px-3 py-1 text-xs font-semibold tracking-widest text-yeonji">
            나의 사주 기본 카드
          </span>
          <h1 className="font-serif text-2xl font-bold text-ink">
            {name ? `${name}님의 사주 4기둥` : "나의 사주 4기둥"}
          </h1>
        </div>

        {/* 4기둥 */}
        <div className="mb-3 grid grid-cols-4 gap-2">
          <PillarCard label="년주" pillar={myeongsik.year} />
          <PillarCard label="월주" pillar={myeongsik.month} />
          <PillarCard label="일주" pillar={myeongsik.day} highlight />
          <PillarCard label="시주" pillar={myeongsik.hour} />
        </div>
        <p className="mb-6 text-center text-[11px] text-mute">
          일주(日柱)의 천간이 <strong className="text-ink">일간(日干)</strong> — 나의 본질 기운입니다
        </p>

        {/* 일간 특성 카드 */}
        <div className={cn("mb-5 rounded-2xl border p-5", ohengRing)}>
          <div className="mb-3 flex items-center gap-3">
            <span className={cn("font-serif text-[52px] font-bold leading-none", ohengColor)}>
              {ilganInfo.hanja}
            </span>
            <div>
              <p className="text-[15px] font-bold text-ink">
                {ilgan}({ilganInfo.hanja}) · {ilganInfo.oheng}({OHENG_KR[ilganInfo.oheng]}) · {ilganInfo.yinyang}
              </p>
              <p className="mt-0.5 text-xs text-mute">일간(日干) — 나를 대표하는 오행</p>
            </div>
          </div>
          <p className="leading-relaxed text-body">{ilganInfo.trait}</p>
        </div>

        {/* 유료 상세 리포트 티저 */}
        <div className="mb-6 rounded-2xl border border-hairline bg-white/60 p-5">
          <p className="mb-3 text-sm font-semibold text-ink">
            상세 리포트에서 더 확인할 수 있어요
          </p>
          <ul className="grid grid-cols-2 gap-y-2.5 text-sm text-body">
            {TEASER.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="text-xs text-yeonji">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link
            href="/products/solo-saju"
            className="flex h-12 items-center justify-center rounded-xl bg-yeonji text-[15px] font-semibold text-white transition-colors hover:bg-yeonji/90"
          >
            종합사주 리포트 받기 →
          </Link>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-xl border border-hairline bg-white/60 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
          >
            다른 상품 보기
          </Link>
        </div>

        <button
          className="mt-7 w-full text-center text-xs text-mute underline decoration-hairline underline-offset-2 hover:text-body"
          onClick={() => setResult(null)}
        >
          다시 입력하기
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-lg py-12">
      <div className="mb-8 text-center">
        <span className="mb-3 inline-block rounded-full bg-yeonji/10 px-3 py-1 text-xs font-semibold tracking-widest text-yeonji">
          무 · 료 · 체 · 험
        </span>
        <h1 className="mb-3 font-serif text-2xl font-bold text-ink">
          나의 사주 기본 카드
        </h1>
        <p className="text-sm leading-relaxed text-body">
          생년월일만 입력하면{" "}
          <strong className="text-ink">4기둥과 일간(日干) 특성</strong>을
          <br />
          무료로 확인하실 수 있습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-hairline bg-white/60 p-6 shadow-sm">
        {/* 이름 */}
        <div className="space-y-2">
          <Label htmlFor="free-name">이름 (선택)</Label>
          <Input
            id="free-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            maxLength={20}
          />
        </div>

        {/* 생년월일 + 출생시각 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="free-birthDate">생년월일</Label>
            <Input
              id="free-birthDate"
              type="date"
              required
              min="1900-01-01"
              max="2100-12-31"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-birthTime">출생 시각</Label>
            <Input
              id="free-birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              disabled={timeUnknown}
              className={timeUnknown ? "opacity-40" : ""}
            />
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-mute">
              <input
                type="checkbox"
                checked={timeUnknown}
                onChange={(e) => setTimeUnknown(e.target.checked)}
                className="accent-yeonji"
              />
              모름
            </label>
          </div>
        </div>

        {/* 성별 + 달력 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>성별</Label>
            <div className="flex gap-2">
              {(["female", "male"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                    gender === g
                      ? "border-yeonji bg-yeonji/10 text-yeonji"
                      : "border-hairline bg-white text-body hover:border-charcoal",
                  )}
                >
                  {g === "female" ? "여성" : "남성"}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>달력</Label>
            <div className="flex gap-2">
              {(["solar", "lunar"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCalendar(c)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                    calendar === c
                      ? "border-yeonji bg-yeonji/10 text-yeonji"
                      : "border-hairline bg-white text-body hover:border-charcoal",
                  )}
                >
                  {c === "solar" ? "양력" : "음력"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 이메일 */}
        <div className="space-y-2">
          <Label htmlFor="free-email">
            이메일 <span className="text-yeonji">*</span>
          </Label>
          <Input
            id="free-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <p className="text-[11px] text-mute">
            혜택 안내 및 이벤트 소식을 보내드립니다. 언제든지 수신 거부 가능합니다.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-xl bg-yeonji text-[15px] font-semibold text-white hover:bg-yeonji/90"
        >
          {isLoading ? "사주 분석 중…" : "무료 사주 카드 보기 →"}
        </Button>
      </form>
    </div>
  );
}
