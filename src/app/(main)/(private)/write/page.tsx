import PagePrevArea from "@/components/common/PagePrevArea";
import WriteForm from "@/components/write/WriteForm";

export default function WritePage() {
  return (
    <div className="mb-10 flex flex-col gap-2">
      <PagePrevArea title="경매 상품 등록" />
      <WriteForm />
    </div>
  );
}
