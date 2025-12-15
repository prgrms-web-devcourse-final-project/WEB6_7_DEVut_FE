import ContentContainer from "@/components/common/ContentContainer";

export default function NofityPage() {
  return (
    <>
      <ContentContainer bordered={false} className="pt-5">
        <div className="flex min-h-screen w-full flex-col">
          <div className="text-title-main flex min-h-[65px] text-2xl">
            <p className="-translate-y-0.5 font-bold">알림</p>
          </div>
        </div>
      </ContentContainer>
    </>
  );
}
