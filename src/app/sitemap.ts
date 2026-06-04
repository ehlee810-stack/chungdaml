import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { productsSeed } from "@/config/products.seed";

// 검색엔진용 사이트맵 — /sitemap.xml 로 자동 생성됩니다.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/products",
    "/legal/terms",
    "/legal/privacy",
    "/legal/refund-policy",
  ];

  const productRoutes = productsSeed
    .filter((p) => p.is_active)
    .map((p) => `/products/${p.slug}`);

  return [...staticRoutes, ...productRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
