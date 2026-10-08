import React from "react";

interface VegetarianBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const VegetarianBadge: React.FC<VegetarianBadgeProps> = ({
  size = "md",
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: "w-3 h-3 border-[1.5px] p-[1.5px]",
    md: "w-4 h-4 border-2 p-[2px]",
    lg: "w-5 h-5 border-2 p-[2.5px]",
  };

  const dotClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <div className="inline-flex items-center gap-1.5 select-none" title="100% Pure Vegetarian">
      <div
        className={`border-[#15803D] rounded-[3px] flex items-center justify-center bg-white shadow-xs ${sizeClasses[size]}`}
      >
        <span className={`rounded-full bg-[#15803D] block ${dotClasses[size]}`} />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
          Pure Veg
        </span>
      )}
    </div>
  );
};
