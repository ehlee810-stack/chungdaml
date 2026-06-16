"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "cdl_event_popup_dismissed"; // 값: 닫은 날짜(YYYY-MM-DD)
// 결제/계정 흐름에서는 팝업을 띄우지 않음
const BLOCKED_PREFIXES = ["/checkout", "/results", "/mypage", "/admin", "/login", "/signup", "/reset"];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function EventPopupClient({ remaining }: { remaining: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (BLOCKED_PREFIXES.some((p) => pathname.startsWith(p))) return;
    let dismissed: string | null = null;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage 불가 시 그냥 노출 */
    }
    if (dismissed === today()) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function dismissToday() {
    try {
      localStorage.setItem(STORAGE_KEY, today());
    } catch {
      /* noop */
    }
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="오픈 기념 이벤트"
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-2xl">
        {/* 조각보 포인트 띠 */}
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{
            background: "linear-gradient(90deg,#b3284e,#d98a3d,#e0c35a,#5f7a52,#3f5c8a,#8a4a86)",
          }}
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="닫기"
          className="absolute right-3 top-4 flex h-7 w-7 items-center justify-center rounded-full text-mute transition-colors hover:bg-surface-soft hover:text-ink"
        >
          ✕
        </button>

        <div className="px-6 pb-6 pt-7 text-center">
          <span className="inline-block rounded-full bg-yeonji/10 px-3 py-1 text-xs font-bold tracking-wide text-yeonji">
            🎉 오픈 기념 이벤트
          </span>

          <h2 className="mt-4 font-serif text-[26px] font-bold leading-tight text-ink">
            선착순 30명
            <br />
            <span className="text-yeonji">무료 사주</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-body">
            대표 상품 <strong className="text-ink">정통 평생사주</strong>를 결제 없이!
            <br />
            결제창에 코드{" "}
            <strong className="rounded bg-surface-soft px-1.5 py-0.5 font-bold tracking-wide text-ink">
              OPEN30
            </strong>{" "}
            입력
          </p>

          <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-hairline-strong bg-white/70 px-3 py-1 text-[13px] font-semibold text-charcoal">
            🔥 남은 <span className="text-yeonji">{remaining}명</span>
          </div>

          <Link
            href="/products/solo-saju"
            onClick={() => setOpen(false)}
            className="mt-5 flex h-12 items-center justify-center rounded-xl bg-yeonji text-[15px] font-semibold text-white transition-colors hover:bg-[#9e2245]"
          >
            무료로 받기 →
          </Link>

          <button
            type="button"
            onClick={dismissToday}
            className="mt-3 w-full text-center text-xs text-mute underline decoration-hairline underline-offset-2 hover:text-body"
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
