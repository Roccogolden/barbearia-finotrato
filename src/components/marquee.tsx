import { Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarqueeProps { items: string[]; className?: string }

export function Marquee({ items, className }: MarqueeProps) {
  const content = [...items, ...items];
  return (
    <div className={cn("overflow-hidden border-y border-surface-deep-border bg-surface-deep py-4", className)} aria-hidden="true">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-10 motion-reduce:animate-none">
        {content.map((item, index) => (
          <span key={index} className="flex items-center gap-10 whitespace-nowrap font-display text-lg uppercase tracking-[0.2em] text-surface-deep-foreground">
            {item}
            <Scissors className="size-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
