import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Ollama-style inverted CTA strip — the single attention-grabbing surface.
export function CTA() {
  return (
    <section className="container py-16">
      <div
        className="relative overflow-hidden rounded-lg border border-gold/30 px-8 py-16 text-center"
        style={{
          background:
            "radial-gradient(100% 120% at 50% 0%, rgba(201,168,76,0.14) 0%, transparent 60%), linear-gradient(180deg,#0c0c24,#05050e)",
        }}
      >
        {/* 골드 포인트 띠 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#c9a84c,#e8c96a,#c9a84c,transparent)",
          }}
        />
        <div className="mb-3 text-gold">☾ ✦ ☽</div>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-ink">
          오늘, 내 운명의 흐름을 들여다보세요
        </h2>
        <p className="mt-3 text-sm text-body">
          로그인 없이 게스트로도 편하게 보실 수 있어요
        </p>
        <div className="mt-7">
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "px-8")}
          >
            사주 보러 가기
          </Link>
        </div>
      </div>
    </section>
  );
}
