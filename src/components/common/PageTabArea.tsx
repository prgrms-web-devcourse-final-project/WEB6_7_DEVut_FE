import TabItem from "./TabItem";

interface PageTabAreaProps {
  items: { label: string; path: string }[];
}

export default function PageTabArea({ items }: PageTabAreaProps) {
  return (
    <div className="relative mx-auto flex min-h-[55px] w-[95%] max-w-[1150px] items-end">
      <div className="bg-border-sub absolute right-0 bottom-0 left-0 h-[3px] rounded-full" />
      <div className="flex items-end justify-start gap-2.5">
        {items?.map(item => (
          <TabItem key={item.path} label={item.label} path={item.path} />
        ))}
      </div>
    </div>
  );
}
