import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Link href={`/product/${id}/bidsLog`}>경매기록가기</Link>
      <h1>상품 페이지 입니다</h1>
    </>
  );
}
