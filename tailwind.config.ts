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
        // 한옥(韓屋) 따뜻한 한지·원목 팔레트
        ink: "#2e2018",          // 짙은 원목/먹 — 본문·제목
        canvas: "#f7f1e6",       // 한지 크림 — 기본 배경
        "surface-soft": "#efe6d4", // 살짝 짙은 한지 — 보조 면
        "surface-dark": "#3a261a", // 짙은 원목 — CTA 띠
        charcoal: "#5c4636",     // 따뜻한 갈색
        body: "#7a6552",         // 따뜻한 토프 — 본문 보조
        mute: "#a8967f",         // 흐린 갈회색
        hairline: "#e2d6c0",     // 한지 헤어라인
        "hairline-strong": "#d2c2a4",
        // 포인트 컬러
        yeonji: "#b3284e",       // 연지빛 자홍 (방석 색)
        "hanok-wood": "#6b4a2f", // 기둥 원목색
        "hanok-green": "#5f7a52", // 창밖 정원 녹음
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
