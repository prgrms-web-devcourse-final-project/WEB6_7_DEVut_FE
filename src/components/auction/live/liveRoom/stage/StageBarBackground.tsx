import { PropsWithChildren } from "react";

export default function StageBarBackground({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`border-border-main relative flex items-center border-b ${className} `}
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            #8B2500 0%,
            #8B2500 7%,
            #7A2000 7%,
            #7A2000 15%,
            #6A1A00 45%,
            #5A1500 70%,
            #3A0F05 100%
          )
        `,
      }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 h-4 w-full"
        style={{
          background: "linear-gradient(to bottom, #1A0905, #2A1810)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              rgba(0,0,0,0) 1px,
              rgba(0,0,0,0) 120px,
              rgba(0,0,0,0.18) 120px,
              rgba(0,0,0,0.18) 122px
            )
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

      <div className="relative z-10 flex h-full w-full items-center">{children}</div>
    </div>
  );
}
