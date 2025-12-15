import LiveProductItem from "./LiveProductItem";

export default function LiveProductList() {
  return (
    <ul className="px-0.5 pt-1">
      <LiveProductItem status="WAITING" />
      <LiveProductItem status="ONGOING" />
      <LiveProductItem status="WAITING" />
      <LiveProductItem status="DONE" />
    </ul>
  );
}
