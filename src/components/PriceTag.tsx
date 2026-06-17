import { formatKRW } from "@/lib/utils";

// 정가(취소선) + 할인율 배지 + 판매가를 함께 보여주는 가격 표시.
// compareAt(정가)이 price보다 클 때만 할인 표시가 나옵니다.
export function PriceTag({
  price,
  compareAt,
  size = "md",
  className = "",
}: {
  price: number;
  compareAt?: number | null;
  size?: "md" | "lg";
  className?: string;
}) {
  const hasDiscount = compareAt != null && compareAt > price;
  const percent = hasDiscount ? Math.round((1 - price / compareAt!) * 100) : 0;
  const priceClass = size === "lg" ? "text-[26px]" : size === "md" ? "text-xl" : "text-[17px]";

  return (
    <div className={className}>
      {hasDiscount && (
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs text-mute line-through md:text-sm">
            {formatKRW(compareAt)}
          </span>
          <span className="rounded-full bg-yeonji/10 px-1.5 py-0.5 text-[10px] font-bold text-yeonji md:px-2 md:text-xs">
            {percent}% 할인
          </span>
        </div>
      )}
      <div className="flex items-baseline gap-1">
        <span className={`font-mono font-semibold text-ink ${priceClass}`}>
          {formatKRW(price)}
        </span>
        {hasDiscount && <span className="text-[10px] text-body md:text-xs">단골가</span>}
      </div>
    </div>
  );
}
