import MyIntro from "@/components/mypage/intro/MyIntro";
import MyWish from "@/components/mypage/intro/MyWish";
import { getWishProducts } from "@/features/mypage/api/myPage.server.api";

export default async function MyPage() {
  const data = await getWishProducts();
  return (
    <div className="flex flex-col gap-10 pb-15">
      <MyIntro />
      <MyWish initialData={data} />
    </div>
  );
}
