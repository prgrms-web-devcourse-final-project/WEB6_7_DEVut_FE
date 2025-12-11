export default function Category() {
  return (
    <div className="flex gap-3.5">
      <button className="border-border-sub bg-content-gray text-title-sub shadow-flat-light rounded-lg border-2 px-3 py-1 text-[14px]">
        의류
      </button>
      <button className="border-border-main bg-btn-active shadow-flat-light rounded-lg border-2 px-3 py-1 text-[14px] text-white">
        엔터테인먼트
      </button>
      <button className="border-border-sub bg-content-gray text-title-sub shadow-flat-light rounded-lg border-2 px-3 py-1 text-[14px]">
        전자기기
      </button>
    </div>
  );
}
