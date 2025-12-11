import StatusBar from "@/components/common/StatusBar";

export default function Home() {
  return (
    <div className="m-3 flex gap-3 p-3">
      <StatusBar status="pending" />
      <StatusBar status="processing" />
      <StatusBar status="done" />
      <StatusBar status="confirmed" />
    </div>
  );
}
