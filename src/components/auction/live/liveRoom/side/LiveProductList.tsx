import LiveProductItem from "./LiveProductItem";

export default function LiveProductList({ products }: { products: LiveRoomProduct[] | undefined }) {
  return (
    <ul className="px-0.5 pt-1">
      {products?.map((product, index) => (
        <LiveProductItem key={index} product={product} />
      ))}
    </ul>
  );
}
