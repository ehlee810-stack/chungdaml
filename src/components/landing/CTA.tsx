import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Ollama-style inverted CTA strip — the single attention-grabbing surface.
export function CTA() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-lg bg-surface-dark px-6 py-12 text-center text-canvas sm:px-8 sm:py-14">
        {/* 조각보 포인트 띠 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, rgba(201,168,76,0) 0%, rgba(201,168,76,0.8) 30%, rgba(201,168,76,1) 50%, rgba(201,168,76,0.8) 70%, rgba(201,168,76,0) 100%)",
          }}
        />
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-[34px]">
          오늘, 내 운명의 흐름을 들여다보세요
        </h2>
        <p className="mt-3 text-sm text-white/70">
          카카오 간편 로그인으로 회원가입하고 바로 확인하세요
        </p>
        <div className="mt-7">
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg", variant: "onDark" }))}
          >
            사주 보러 가기
          </Link>
        </div>
      </div>
    </section>
  );
}
