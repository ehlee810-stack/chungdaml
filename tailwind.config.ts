import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1100px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 신비로운 밤하늘 + 골드 팔레트
        ink: "#ece4c8",          // 크림 골드 — 본문·제목 (밝게)
        canvas: "#0a0a1f",       // 깊은 네이비 블랙 — 기본 배경
        "surface-soft": "#10112c", // 살짝 떠오른 네이비 — 보조 면
        "surface-dark": "#05050e", // 가장 깊은 밤 — 패널
        charcoal: "#cfc6a8",     // 밝은 크림
        body: "#a99f86",         // 흐린 골드그레이 — 본문 보조
        mute: "#6f6a55",         // 어두운 골드그레이
        hairline: "#26264a",     // 은은한 네이비 경계선
        "hairline-strong": "#3a3a5e",
        // 포인트 컬러
        yeonji: "#c9a84c",       // 골드 (포인트)
        "hanok-wood": "#c9a84c", // 골드 (기존 클래스 호환)
        "hanok-green": "#5f7a52",
        gold: "#c9a84c",
        "gold-light": "#e8c96a",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      fontFamily: {
        sans: [
          "var(--font-serif)",
          "Apple SD Gothic Neo",
          "Noto Serif KR",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        serif: [
          "var(--font-serif)",
          "Noto Serif KR",
          "ui-serif",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
