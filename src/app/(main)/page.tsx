import ProductCard from "@/components/common/ProductCard";

export default function Home() {
  return (
    <div className="p-5">
      <ProductCard type={"done"} money={1165000} title={"천사맛 쿠키"} isLive />
    </div>
  );
}
