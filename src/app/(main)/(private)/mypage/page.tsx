import MyBizzSimple from "@/components/mypage/intro/MyBizzSimple";
import MyIntro from "@/components/mypage/intro/MyIntro";

export default function MyPage() {
  return (
    <div className="flex flex-col gap-10 pb-15">
      <MyIntro />
      <MyBizzSimple />
    </div>
  );
}
