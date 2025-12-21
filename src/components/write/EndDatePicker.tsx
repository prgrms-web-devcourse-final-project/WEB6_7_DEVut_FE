import { DayPicker } from "react-day-picker";

interface EndDatePicker {
  endDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function EndDatePicker({ endDate, onSelect }: EndDatePicker) {
  const today = new Date();

  const from = new Date(today);
  from.setDate(today.getDate() + 4);

  const to = new Date(today);
  to.setDate(today.getDate() + 10);
  return (
    <div className="text-title-main absolute bottom-full z-50 mb-2 rounded-xl bg-white p-4 shadow-2xl">
      <DayPicker
        mode="single"
        selected={endDate}
        onSelect={onSelect}
        disabled={[{ before: from }, { after: to }]}
        classNames={{
          day: "rounded-md transition-colors",
          day_button:
            "h-9 w-9 rounded-md transition-colors hover:bg-border-sub/20 hover:shadow-flat-light rounded-md",
          disabled: "text-border-sub/40 cursor-not-allowed opacity-50",
          selected: "bg-border-sub2 text-white hover:bg-border-sub2",
          today: "ring ring-border-sub2 rounded-md",
          caption: "flex relative items-center justify-between px-2",
          caption_label: "text-lg flex font-black justify-center",
          nav: "absolute inset-x-2 flex items-center justify-between gap-2",
          nav_button: "size-8 rounded-md transition hover:bg-border-sub",
        }}
      />
    </div>
  );
}
