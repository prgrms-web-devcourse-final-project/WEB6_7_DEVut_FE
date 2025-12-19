import MyIntro from "@/components/mypage/intro/MyIntro";
import MyWish from "@/components/mypage/intro/MyWish";

export default function MyPage() {
  return (
    <div className="flex flex-col gap-10 pb-15">
      <MyIntro />
      <MyWish />
    </div>
  );
}
