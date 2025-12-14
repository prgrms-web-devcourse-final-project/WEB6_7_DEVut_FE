type DashDividerProps = {
  /** 중앙 텍스트 (예: "또는") */
  label?: string;

  /** 선 색상 (Tailwind color variable or hex) */
  color?: string;

  /** 선 두께 (px) */
  thickness?: number;

  /** 대시 길이 (px) */
  dash?: number;

  /** 대시 간격 (px) */
  gap?: number;

  /** 위아래 여백 */
  marginY?: string;

  /** 텍스트 스타일 */
  labelClassName?: string;
};

export default function DashDivider({
  label,
  color = "var(--color-border-sub)",
  thickness = 2,
  dash = 6,
  gap = 6,
  marginY = "my-6",
  labelClassName = "text-border-sub text-sm px-3",
}: DashDividerProps) {
  const lineStyle = {
    height: thickness,
    backgroundImage: `repeating-linear-gradient(
      to right,
      ${color},
      ${color} ${dash}px,
      transparent ${dash}px,
      transparent ${dash + gap}px
    )`,
  };

  return (
    <div className={`relative flex items-center ${marginY}`}>
      {/* left line */}
      <div className="flex-1" style={lineStyle} />

      {label && <span className={`relative z-10 ${labelClassName}`}>{label}</span>}

      {/* right line */}
      <div className="flex-1" style={lineStyle} />
    </div>
  );
}
