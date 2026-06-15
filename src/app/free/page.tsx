import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import FreeSajuClient from "./FreeSajuClient";

export const metadata: Metadata = {
  title: "무료 사주 기본 카드",
  description: "생년월일만 입력하면 나의 4기둥과 일간(日干) 특성을 무료로 확인하실 수 있습니다.",
  openGraph: {
    title: `무료 사주 기본 카드 | ${siteConfig.name}`,
    description: "나의 사주 4기둥과 일간 특성을 무료로 확인해보세요.",
  },
};

export default function FreeSajuPage() {
  return <FreeSajuClient />;
}
