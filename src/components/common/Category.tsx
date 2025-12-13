export default function Category() {
  return (
    <div className="flex gap-3.5">
      <label className="border-border-sub cur bg-content-gray text-title-sub shadow-flat-light cursor-pointer rounded-lg border-2 px-3 py-1 text-[14px]">
        <input type="radio" className="hidden" />
        의류
      </label>
      <label className="border-border-main bg-btn-active shadow-flat-light rounded-lg border-2 px-3 py-1 text-[14px] text-white">
        <input type="radio" className="hidden" />
        엔터테인먼트
      </label>
      <label className="border-border-sub cur bg-content-gray text-title-sub shadow-flat-light cursor-pointer rounded-lg border-2 px-3 py-1 text-[14px]">
        <input type="radio" className="hidden" />
        전자기기
      </label>
    </div>
  );
}
