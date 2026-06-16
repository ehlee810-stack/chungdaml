"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 오픈 기념 무료 쿠폰 입력 — 코드가 유효하면 결제 없이 바로 결과지 생성.
export function CouponBox({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function apply() {
    const trimmed = code.trim();
    if (!trimmed) {
      toast.error("쿠폰 코드를 입력해 주세요");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders/free-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, code: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "쿠폰 적용에 실패했습니다");
      toast.success("무료 쿠폰 적용 완료! 결과지를 만들고 있어요.");
      router.push(`/results/${data.resultId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "오류가 발생했습니다");
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 rounded-lg border border-hairline bg-surface-soft p-4">
      <p className="mb-1 text-sm font-semibold text-ink">🎁 쿠폰 코드가 있으신가요?</p>
      <p className="mb-3 text-xs text-mute">
        오픈 기념 무료 쿠폰을 입력하면 결제 없이 바로 받아보실 수 있어요.
      </p>
      <div className="flex gap-2">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="OPEN30"
          className="uppercase"
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
        />
        <Button type="button" onClick={apply} disabled={loading} variant="outline" className="shrink-0">
          {loading ? "처리 중…" : "쿠폰 적용"}
        </Button>
      </div>
      {loading && (
        <p className="mt-2 text-xs text-mute">결과지 생성에 30초~1분 정도 걸려요. 창을 닫지 말고 기다려 주세요.</p>
      )}
    </div>
  );
}
