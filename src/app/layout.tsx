import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif_KR } from "next/font/google";
import { Toaster } from "sonner";
import { siteConfig, businessInfo } from "@/config/site";
import { isSupabaseConfigured } from "@/lib/env";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

// 한옥 컨셉 — 정갈한 명조체
const notoSerifKr = Noto_Serif_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "청담엘사주", "청담엘", "사주", "사주풀이", "사주상담", "온라인 사주",
    "궁합", "자미두수", "자미두수 궁합", "재회운", "신년운세", "자녀 사주",
  ],
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "ko_KR",
  },
  // 검색엔진 소유확인 — Vercel 환경변수에 코드만 넣으면 자동 적용 (코드 수정 불필요)
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      ...(process.env.NAVER_SITE_VERIFICATION
        ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION }
        : {}),
    },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 로그인 여부에 따라 헤더 메뉴 분기. Supabase 미설정(데모) 모드면 무조건 비로그인 취급.
  const isLoggedIn = isSupabaseConfigured() ? !!(await getCurrentUser()) : false;

  return (
    <html lang="ko" className={notoSerifKr.variable}>
      <body suppressHydrationWarning>
        <SiteHeader isLoggedIn={isLoggedIn} />
        <main className="min-h-[calc(100vh-7rem)]">{children}</main>
        <SiteFooter />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

// 한옥 헤더 — 명조 로고, 상단 고정 + 한지 블러.
function SiteHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-[18px] font-bold tracking-tight text-ink"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-yeonji text-[11px] font-semibold text-[#fdf6ea]">
            印
          </span>
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4 text-[13px] font-medium sm:gap-6">
          <Link
            href="/free"
            className="whitespace-nowrap rounded-full border border-yeonji/40 bg-yeonji/10 px-3 py-1 text-yeonji hover:bg-yeonji/15 transition-colors"
          >
            무료 체험
          </Link>
          <Link href="/products" className="whitespace-nowrap text-ink hover:text-body">상담</Link>
          {isLoggedIn ? (
            <>
              <Link href="/mypage" className="text-ink hover:text-body">마이페이지</Link>
              <form action="/api/auth/signout" method="post">
                <button type="submit" className="text-ink hover:text-body">로그아웃</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-ink hover:text-body">로그인</Link>
              <Link href="/signup" className="text-ink hover:text-body">회원가입</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// 가운데 정렬 푸터 — 브랜드 / 사업자정보(항목별) / 약관 / 카피라이트
function SiteFooter() {
  const year = new Date().getFullYear();
  const Sep = () => <span className="mx-2 text-hairline">|</span>;
  const Lb = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold text-charcoal">{children}</span>
  );

  return (
    <footer className="mt-24 border-t border-hairline bg-surface-soft">
      <div className="container py-14 text-center">
        {/* 브랜드 */}
        <div className="mb-7 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-yeonji text-sm font-semibold text-[#fdf6ea]">
            印
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </div>

        {/* 사업자 정보 */}
        <div className="space-y-2 text-[13px] leading-relaxed text-mute">
          <p>
            <Lb>상호</Lb> {businessInfo.companyName}
            <Sep />
            <Lb>대표</Lb> {businessInfo.representative}
          </p>
          <p>{businessInfo.address}</p>
          <p>
            <Lb>통신판매업 신고</Lb> {businessInfo.mailOrderNumber}
          </p>
          <p>
            <Lb>사업자등록번호</Lb> {businessInfo.businessNumber}
          </p>
          <p>
            <Lb>고객센터</Lb>{" "}
            {businessInfo.kakaoChannelUrl ? (
              <a
                href={businessInfo.kakaoChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-hairline underline-offset-2 hover:text-yeonji"
              >
                카카오톡 {siteConfig.name} 채널
              </a>
            ) : (
              <>카카오톡 {siteConfig.name} 채널</>
            )}
            <Sep />
            <Lb>MAIL</Lb> {businessInfo.email}
          </p>
          {businessInfo.phone && (
            <p className="pt-1">
              <Lb>대표번호</Lb> {businessInfo.phone}
              {businessInfo.phoneNote && (
                <span className="mt-0.5 block text-xs text-mute">({businessInfo.phoneNote})</span>
              )}
            </p>
          )}
        </div>

        {/* 약관 링크 */}
        <div className="mt-7 flex items-center justify-center text-[13px] font-medium text-charcoal">
          <Link href="/legal/terms" className="hover:text-yeonji">이용약관</Link>
          <Sep />
          <Link href="/legal/privacy" className="hover:text-yeonji">개인정보처리방침</Link>
          <Sep />
          <Link href="/legal/refund-policy" className="hover:text-yeonji">환불정책</Link>
        </div>

        <p className="mt-5 text-xs text-mute">
          Copyright © {year} {siteConfig.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
