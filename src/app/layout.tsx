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
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "ko_KR",
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
        <nav className="flex items-center gap-6 text-[13px] font-medium">
          <Link href="/products" className="text-ink hover:text-body">상품</Link>
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

// Ollama: footer is a quiet caption-gray strip with hairline divider.
function SiteFooter() {
  // 사업자정보 한 줄 — 운세위키 푸터 포맷: "회사 | 사업자등록번호: ... | 통신판매업 신고번호: ... | 대표: ... | 주소: ..."
  const businessLine = [
    businessInfo.companyName,
    `사업자등록번호: ${businessInfo.businessNumber}`,
    `통신판매업 신고번호: ${businessInfo.mailOrderNumber}`,
    `대표: ${businessInfo.representative}`,
    `주소: ${businessInfo.address}`,
  ].join(" | ");

  const contactLine = [
    `고객센터: ${businessInfo.email}`,
    businessInfo.phone
      ? `핸드폰${businessInfo.phoneNote ? `(${businessInfo.phoneNote})` : ""}: ${businessInfo.phone}`
      : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <footer className="mt-24 border-t border-hairline bg-surface-soft">
      <div className="container py-12">
        {/* 브랜드 */}
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-yeonji text-xs font-semibold text-[#fdf6ea]">
            印
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </div>

        {/* 약관 링크 */}
        <div className="mb-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-charcoal">
          <Link href="/legal/terms" className="hover:text-yeonji">이용약관</Link>
          <Link href="/legal/privacy" className="hover:text-yeonji">개인정보처리방침</Link>
          <Link href="/legal/refund-policy" className="hover:text-yeonji">환불정책</Link>
        </div>

        {/* 사업자 정보 */}
        <div className="space-y-1.5 border-t border-hairline pt-6 text-xs leading-relaxed text-mute">
          <p>{businessLine}</p>
          <p>{contactLine}</p>
          <p className="pt-1">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
