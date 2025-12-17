import StatusBar, { TimeBar } from "./StatusBar";

type Status = "pending" | "processing" | "done" | "confirmed";
type Time = "delay" | "offLive" | "onLive";

export default function ProductStatus({
  status,
  time,
  label,
}: {
  status?: Status;
  time?: Time;
  label?: string;
}) {
  if (status) return <StatusBar status={status} />;
  if (time) return <TimeBar type={time} label={label} />;
  return null;
}
