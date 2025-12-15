interface LiveSideTabButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function LiveSideTabButton({ children, active, onClick }: LiveSideTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-full flex-1 cursor-pointer items-center justify-center transition-colors ${
        active
          ? "border-border-sub2 border-b-[3px] bg-[#8B2500] text-white"
          : "text-title-main-dark hover:bg-content-gray"
      } `}
    >
      {children}
    </button>
  );
}
