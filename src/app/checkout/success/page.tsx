"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessInner />
    </Suspense>
  );
}

function CheckoutSuccessInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState(
    "결제가 완료되었어요. 사주를 정성껏 풀이하고 있습니다… 최대 1분 정도 걸릴 수 있어요. 창을 닫지 말고 잠시만 기다려 주세요. 🔮",
  );

  useEffect(() => {
    const paymentKey = search.get("paymentKey");
    const orderId = search.get("orderId");
    const amount = Number(search.get("amount"));
    if (!paymentKey || !orderId || !amount) {
      setState("error");
      setMessage("필수 파라미터가 누락되었습니다.");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentKey, orderId, amount }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error((json.error ?? "결제 승인 실패") + (json.detail ? ` — ${json.detail}` : ""));
        if (json.resultId) {
          router.replace(`/results/${json.resultId}`);
        } else {
          setState("ok");
          setMessage("결제는 완료되었으나 결과 생성에 실패했습니다. 고객센터로 문의해 주세요.");
        }
      } catch (err) {
        setState("error");
        setMessage(err instanceof Error ? err.message : "결제 승인 중 오류가 발생했습니다.");
      }
    })();
  }, [router, search]);

  return (
    <div className="container py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>
            {state === "error"
              ? "결제 처리 실패"
              : state === "loading"
                ? "결제 완료 · 사주 분석 중"
                : "결제 완료"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {state === "loading" ? (
          <CardContent className="flex items-center justify-center py-6">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-yeonji" />
          </CardContent>
        ) : (
          <CardContent>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              홈으로
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
