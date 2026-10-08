import React from "react";
import { Plus, Minus } from "lucide-react";
import { MenuItem } from "../data/menuData";
import { useOrder } from "../context/OrderContext";

interface QuantityButtonProps {
  item: MenuItem;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({
  item,
  size = "md",
  className = "",
}) => {
  const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useOrder();
  const quantity = getItemQuantity(item.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    increaseQuantity(item.id);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    decreaseQuantity(item.id);
  };

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex items-center justify-center font-bold transition-all select-none rounded-xl bg-[#FFFDF5] hover:bg-[#168C82] text-[#168C82] hover:text-white border-2 border-[#168C82] hover:border-[#168C82] shadow-sm hover:shadow-md hover:shadow-[#168C82]/20 active:scale-95 group ${
          size === "sm"
            ? "px-3 py-1 text-xs gap-1"
            : size === "lg"
            ? "px-5 py-2.5 text-sm gap-1.5"
            : "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5"
        } ${className}`}
      >
        <span className="text-base leading-none text-[#F4C430] group-hover:text-white transition-colors">
          ＋
        </span>
        <span>Add</span>
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-between font-bold rounded-xl bg-[#168C82] text-white shadow-md border-2 border-[#0F766E] select-none transition-all ${
        size === "sm"
          ? "h-7 px-1 min-w-[76px]"
          : size === "lg"
          ? "h-10 px-2 min-w-[104px]"
          : "h-8 sm:h-9 px-1.5 min-w-[88px]"
      } ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        className="p-1 text-white hover:text-[#F4C430] hover:scale-110 active:scale-95 transition-all"
        aria-label={`Decrease quantity of ${item.name}`}
      >
        <Minus className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>

      <span
        className={`font-mono font-bold text-center tabular-nums px-1.5 ${
          size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-xs sm:text-sm"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        className="p-1 text-white hover:text-[#F4C430] hover:scale-110 active:scale-95 transition-all"
        aria-label={`Increase quantity of ${item.name}`}
      >
        <Plus className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </button>
    </div>
  );
};
