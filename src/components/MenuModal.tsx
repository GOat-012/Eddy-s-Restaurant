import React from "react";
import { X, ExternalLink, Sparkles, ShoppingBag } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { VegetarianBadge } from "./VegetarianBadge";
import { QuantityButton } from "./QuantityButton";
import { SWIGGY_URL } from "../config";
import { IMAGES } from "../data/menuData";

export const MenuModal: React.FC = () => {
  const { modalItem, closeModal, setIsCartOpen } = useOrder();

  if (!modalItem) return null;

  const getImage = () => {
    if (modalItem.image) return modalItem.image;
    if (modalItem.category === "Sizzlers" || modalItem.category === "Combo")
      return IMAGES.sizzlerPlatter;
    if (modalItem.category === "Thali") return IMAGES.specialThali;
    if (modalItem.category === "Pasta" || modalItem.category === "Mocktails" || modalItem.category === "Beverages" || modalItem.category === "Shakes")
      return IMAGES.pastaCocktail;
    if (modalItem.category === "Tandoori Starters" || modalItem.category === "Rolls" || modalItem.category === "Burger" || modalItem.category === "Momos Mania")
      return IMAGES.tandooriPlatter;
    return IMAGES.heroAmbience;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg bg-[#FFFDF5] sm:rounded-3xl rounded-t-3xl border border-[#E8E4D5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#18312E] shadow-sm transition-colors"
          aria-label="Close dish modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Food Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 shrink-0">
          <img
            src={getImage()}
            alt={modalItem.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs border border-[#E8E4D5] shadow-xs flex items-center gap-1.5">
              <VegetarianBadge size="md" showLabel />
            </div>
            {modalItem.featured && (
              <div className="px-2.5 py-1 rounded-lg bg-[#F4C430] text-[#164A43] text-xs font-extrabold shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </div>
            )}
          </div>
        </div>

        {/* Dish Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#168C82] uppercase tracking-wider block mb-0.5">
                {modalItem.category}
              </span>
              <h3 className="text-2xl font-bold text-[#164A43] font-display">
                {modalItem.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl sm:text-3xl font-black text-[#168C82] tabular-nums font-mono">
                ₹{modalItem.price}
              </span>
            </div>
          </div>

          {modalItem.description && (
            <div className="p-4 rounded-xl bg-[#F8F5E8] border border-[#E8E4D5]">
              <h4 className="text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1">
                Dish Details
              </h4>
              <p className="text-sm text-[#18312E] leading-relaxed">
                {modalItem.description}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-3 border-t border-[#E8E4D5] flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#65736F] block mb-1">
                Add to your Order:
              </span>
              <QuantityButton item={modalItem} size="lg" />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  setIsCartOpen(true);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-[#F8F5E8] hover:bg-[#EBF8F6] text-[#164A43] border border-[#D5D0C0] font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#168C82]" />
                <span>View Cart</span>
              </button>

              <a
                href={SWIGGY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#F4C430] hover:bg-[#E8B923] text-[#164A43] font-black text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Swiggy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
