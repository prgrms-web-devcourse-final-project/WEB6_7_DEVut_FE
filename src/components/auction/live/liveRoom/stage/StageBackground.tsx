import backgroundImg from "@/assets/images/auction/stageBackground.png";
import Image from "next/image";

export default function StageBackground() {
  return (
    <>
      <Image src={backgroundImg} alt="stage background" fill className="object-contain" priority />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-5 w-24 bg-linear-to-r from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-5 w-24 bg-linear-to-l from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-5 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.65)_100%)]" />
    </>
  );
}
