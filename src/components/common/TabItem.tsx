import Link from "next/link";

interface TabItemProps {
  label: string;
  path: string;
}

export default function TabItem({ label, path }: TabItemProps) {
  return (
    <Link
      href={path}
      className="bg-btn-default border-title-main text-title-main min-h-[25px] w-fit rounded-t-2xl border-[3px] px-7.5 py-1.5 text-center"
    >
      {label}
    </Link>
  );
}
