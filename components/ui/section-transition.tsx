import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Decorative band that bridges a light (cream) section into a dark (wine) one.
 * The artwork runs cream → bordeaux top-to-bottom; pass `flip` to reverse it
 * for a dark → light boundary.
 */
export function SectionTransition({ flip }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative -my-px w-full select-none overflow-hidden leading-[0]",
        flip ? "bg-wine-deep" : "bg-cream",
      )}
    >
      <Image
        src="/images/transition.png"
        alt=""
        width={1983}
        height={793}
        sizes="100vw"
        className={cn("h-auto w-full object-cover", flip && "-scale-y-100")}
      />
    </div>
  );
}
