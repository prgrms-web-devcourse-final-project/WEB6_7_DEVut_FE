import StatusBar, { TimeBar } from "./StatusBar";

type Product = "pending" | "processing" | "done" | "confirmed" | "delay" | "offLive" | "onLive";

type Status = "pending" | "processing" | "done" | "confirmed";
type Time = "delay" | "offLive" | "onLive";

export default function ProductStatus({ type, label }: { type: Product; label?: string }) {
  const isStatus = ["pending", "processing", "done", "confirmed"].includes(type);
  const isTime = ["delay", "offLive", "onLive"].includes(type);
  if (isStatus) return <StatusBar status={type as Status} />;

  if (isTime) return <TimeBar type={type as Time} label={label} />;

  return null;
}
