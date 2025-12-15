import Image from "next/image";
import test from "@/assets/images/sidebar/BBlogo.png";

export default function Bidder({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex w-14 shrink-0 flex-col items-center">
      <div className="border-border-sub2 relative h-12 w-12 overflow-hidden rounded-full border-2 bg-black shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
        <Image src={test} alt={name} fill className="object-cover" />
      </div>

      <span className="mt-1 max-w-full truncate text-[11px] text-white/40" title={name}>
        {name}
      </span>
    </div>
  );
}
