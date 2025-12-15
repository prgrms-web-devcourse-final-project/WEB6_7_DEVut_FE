import TabButton from "./TabButton";

export default function StageTab() {
  return (
    <div
      className="border-border-main relative flex h-14 shrink-0 items-center gap-2 border-b px-4"
      style={{
        backgroundImage: `
      linear-gradient(
        to bottom,
        #8B2500 0%,
        #8B2500 7%,
        #7A2000 7%,
        #7A2000 15%,
        #6A1A00 100%
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
          rgba(0,0,0,0.0) 1px,
          rgba(0,0,0,0.0) 120px,
          rgba(0,0,0,0.22) 120px,
          rgba(0,0,0,0.22) 122px
        )
      `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-linear-to-t from-[rgba(0,0,0,0.35)] to-transparent" />
      <div className="relative z-10 flex gap-2">
        <TabButton label="경매방 1" active />
        <TabButton label="경매방 2" />
        <TabButton label="경매방 3" />
      </div>
    </div>
  );
}
