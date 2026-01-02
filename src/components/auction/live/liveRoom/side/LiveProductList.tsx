import LiveProductItem from "./LiveProductItem";

export default function LiveProductList({ products }: { products: LiveAuctionProduct[] }) {
  return (
    <ul className="px-0.5 pt-1">
      {products.map(product => (
        <LiveProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
