"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { twoPersonLabels } from "@/config/two-person";

type Props = {
  productId: string;
  productSlug: string;
  isLoggedIn: boolean;
};

const CONCERN_OPTIONS = ["연애", "결혼", "직장", "재물", "건강", "학업", "이직", "사업"];
const PET_CONCERN_OPTIONS = ["건강", "성격", "분리불안", "식습관", "사회성", "주인과의 궁합"];
const CHILD_CONCERN_OPTIONS = ["성격·기질", "재능·적성", "학업·공부", "진로·진학", "교우관계", "건강", "생활습관"];

type Person = {
  name: string;
  birthDate: string;
  birthTime: string;
  timeUnknown: boolean;
  gender: "male" | "female";
  calendar: "solar" | "lunar";
};

function emptyPerson(timeUnknown = false): Person {
  return { name: "", birthDate: "", birthTime: "", timeUnknown, gender: "male", calendar: "solar" };
}

// 한 사람의 입력 필드 묶음
function PersonFields({
  person,
  set,
  isPet,
  isChild,
  idPrefix,
}: {
  person: Person;
  set: (patch: Partial<Person>) => void;
  isPet: boolean;
  isChild?: boolean;
  idPrefix: string;
}) {
  const nameLabel = isPet ? "반려동물 이름 (선택)" : isChild ? "아이 이름 (선택)" : "이름 (선택)";
  const namePlaceholder = isPet ? "초코, 나비" : isChild ? "우리 아이 이름" : "홍길동";
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-name`}>{nameLabel}</Label>
        <Input
          id={`${idPrefix}-name`}
          value={person.name}
          onChange={(e) => set({ name: e.target.value })}
          placeholder={namePlaceholder}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-birthDate`}>생년월일</Label>
          <Input
            id={`${idPrefix}-birthDate`}
            type="date"
            required
            min="1900-01-01"
            max="2100-12-31"
            value={person.birthDate}
            onChange={(e) => set({ birthDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-birthTime`}>출생 시각</Label>
          <Input
            id={`${idPrefix}-birthTime`}
            type="time"
            value={person.birthTime}
            onChange={(e) => set({ birthTime: e.target.value })}
            disabled={person.timeUnknown}
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={person.timeUnknown}
              onChange={(e) => set({ timeUnknown: e.target.checked })}
            />
            시 모름
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>성별</Label>
          <div className="flex gap-2">
            {(["male", "female"] as const).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => set({ gender: g })}
                className={`flex-1 h-10 rounded-full border text-sm transition-colors ${person.gender === g ? "border-ink bg-ink text-canvas" : "border-hairline text-ink hover:border-ink"}`}
              >
                {g === "male" ? (isPet ? "수컷" : "남성") : isPet ? "암컷" : "여성"}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>달력</Label>
          <div className="flex gap-2">
            {(["solar", "lunar"] as const).map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => set({ calendar: c })}
                className={`flex-1 h-10 rounded-full border text-sm transition-colors ${person.calendar === c ? "border-ink bg-ink text-canvas" : "border-hairline text-ink hover:border-ink"}`}
              >
                {c === "solar" ? "양력" : "음력"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SajuForm({ productId, productSlug, isLoggedIn }: Props) {
  const router = useRouter();
  const isPet = productSlug === "pet-saju";
  const isChild = productSlug === "child-saju";
  const labels = twoPersonLabels(productSlug);
  const isTwo = !!labels;
  const concernOptions = isPet
    ? PET_CONCERN_OPTIONS
    : isChild
      ? CHILD_CONCERN_OPTIONS
      : CONCERN_OPTIONS;

  const [p1, setP1] = useState<Person>(emptyPerson(isPet));
  const [p2, setP2] = useState<Person>(emptyPerson());
  const [concerns, setConcerns] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const patch1 = (patch: Partial<Person>) => setP1((prev) => ({ ...prev, ...patch }));
  const patch2 = (patch: Partial<Person>) => setP2((prev) => ({ ...prev, ...patch }));

  function toggleConcern(c: string) {
    setConcerns((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!p1.birthDate) {
      toast.error(`${isTwo ? labels!.label1 + "의 " : ""}생년월일을 입력해 주세요`);
      return;
    }
    if (isTwo && !p2.birthDate) {
      toast.error(`${labels!.label2}의 생년월일을 입력해 주세요`);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          name: p1.name,
          birthDate: p1.birthDate,
          birthTime: p1.timeUnknown ? null : p1.birthTime || null,
          timeUnknown: p1.timeUnknown,
          gender: p1.gender,
          calendar: p1.calendar,
          concerns: isTwo ? [] : concerns,
          partner: isTwo
            ? {
                name: p2.name,
                birthDate: p2.birthDate,
                birthTime: p2.timeUnknown ? null : p2.birthTime || null,
                timeUnknown: p2.timeUnknown,
                gender: p2.gender,
                calendar: p2.calendar,
              }
            : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "주문 생성 실패");
      router.push(`/checkout/${json.orderId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 첫 번째 사람 */}
      {isTwo && (
        <p className="text-sm font-semibold text-yeonji">① {labels!.label1}</p>
      )}
      <PersonFields person={p1} set={patch1} isPet={isPet} isChild={isChild} idPrefix="p1" />

      {/* 두 번째 사람 (2인 상품) */}
      {isTwo && (
        <div className="space-y-4 rounded-lg border border-hairline bg-surface-soft p-5">
          <p className="text-sm font-semibold text-yeonji">② {labels!.label2}</p>
          <PersonFields person={p2} set={patch2} isPet={false} idPrefix="p2" />
        </div>
      )}

      {/* 고민 (1인 상품만) */}
      {!isTwo && (
        <div className="space-y-2">
          <Label>{isPet ? "관심사 (복수 선택)" : isChild ? "우리 아이 관심사 (복수 선택)" : "고민 (복수 선택)"}</Label>
          <div className="flex flex-wrap gap-2">
            {concernOptions.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => toggleConcern(c)}
                className={`px-4 h-8 rounded-full border text-sm transition-colors ${concerns.includes(c) ? "border-ink bg-ink text-canvas" : "border-hairline text-ink hover:border-ink"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoggedIn ? (
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "주문 생성 중..." : "결제하러 가기"}
        </Button>
      ) : (
        <div className="space-y-2">
          <Link
            href={`/login?redirect=${encodeURIComponent(`/products/${productSlug}`)}`}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            로그인하고 결제하기
          </Link>
          <p className="text-xs text-body text-center">
            결과는 로그인 후 <span className="text-ink">마이페이지</span> 에서 확인할 수 있어요.
          </p>
        </div>
      )}
    </form>
  );
}
