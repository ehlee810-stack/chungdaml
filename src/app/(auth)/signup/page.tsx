"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleKakao() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        scopes: "profile_nickname",
        redirectTo: `${window.location.origin}/auth/callback?next=/mypage`,
      },
    });
    if (error) toast.error(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${publicEnv.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("가입 완료! 마이페이지로 이동합니다.");
    router.push("/mypage");
    router.refresh();
  }

  return (
    <div className="container py-16 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>카카오톡으로 간편하게 가입하세요.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* 카카오 회원가입 — 메인 */}
          <button
            type="button"
            onClick={handleKakao}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] px-4 py-3 text-[15px] font-semibold text-[#191600] transition-opacity hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 36 36" fill="currentColor" aria-hidden>
              <path d="M18 5C10.82 5 5 9.58 5 15.23c0 3.64 2.43 6.83 6.08 8.64-.27.97-.97 3.5-1.11 4.04-.17.68.25.67.52.49.21-.14 3.36-2.28 4.72-3.21.58.08 1.18.13 1.79.13 7.18 0 13-4.58 13-10.23S25.18 5 18 5z" />
            </svg>
            카카오톡으로 회원가입
          </button>

          <div className="flex items-center gap-3 text-xs text-mute">
            <span className="h-px flex-1 bg-hairline" />
            또는 이메일로 가입
            <span className="h-px flex-1 bg-hairline" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호 (8자 이상)</Label>
              <Input id="password" type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "가입 중..." : "가입하기"}
            </Button>
            <p className="text-sm text-center">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-primary hover:underline">로그인</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
