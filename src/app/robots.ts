import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// 검색엔진 크롤링 규칙 — /robots.txt 로 자동 생성됩니다.
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/mypage", "/api", "/checkout", "/results"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
