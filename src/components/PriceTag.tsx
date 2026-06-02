import { formatKRW } from "@/lib/utils";

// 정가(취소선) + 할인 판매가를 함께 보여주는 가격 표시.
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
  const priceClass = size === "lg" ? "text-2xl" : "text-lg";

  return (
    <div className={className}>
      {hasDiscount && (
        <span className="block text-sm font-mono text-mute line-through">
          {formatKRW(compareAt)}
        </span>
      )}
      <span className={`font-mono font-medium text-ink ${priceClass}`}>
        {formatKRW(price)}
      </span>
      {hasDiscount && <span className="ml-2 text-xs text-body">단골 할인가</span>}
    </div>
  );
}
