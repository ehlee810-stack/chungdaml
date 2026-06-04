"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/mypage";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  async function handleKakao() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        scopes: "profile_nickname",
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
    if (error) toast.error(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("로그인되었습니다");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="container py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>카카오톡으로 간편하게 시작하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 카카오 로그인 — 메인 */}
          <button
            type="button"
            onClick={handleKakao}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-3 text-[15px] font-semibold text-[#191600] transition-opacity hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 36 36" fill="currentColor" aria-hidden>
              <path d="M18 5C10.82 5 5 9.58 5 15.23c0 3.64 2.43 6.83 6.08 8.64-.27.97-.97 3.5-1.11 4.04-.17.68.25.67.52.49.21-.14 3.36-2.28 4.72-3.21.58.08 1.18.13 1.79.13 7.18 0 13-4.58 13-10.23S25.18 5 18 5z" />
            </svg>
            카카오톡으로 로그인
          </button>

          <p className="text-center text-xs text-muted-foreground">
            로그인 시 회원가입이 자동으로 완료됩니다.
          </p>

          {/* 이메일 로그인 — 보조(접힘) */}
          {!showEmail ? (
            <button
              type="button"
              onClick={() => setShowEmail(true)}
              className="w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              이메일로 로그인
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 border-t border-hairline pt-5">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "로그인 중..." : "이메일로 로그인"}
              </Button>
              <div className="flex justify-between text-sm">
                <Link href="/signup" className="text-muted-foreground hover:text-foreground">회원가입</Link>
                <Link href="/reset" className="text-muted-foreground hover:text-foreground">비밀번호 재설정</Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
