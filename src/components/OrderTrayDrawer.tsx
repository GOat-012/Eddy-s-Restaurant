import React from "react";
import { X, Plus, Minus, Trash2, ShoppingCart, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { SWIGGY_URL } from "../config";
import { VegetarianBadge } from "./VegetarianBadge";
import { IMAGES } from "../data/menuData";

export const OrderTrayDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useOrder();

  if (!isCartOpen) return null;

  const getFallbackImg = (cat: string) => {
    if (cat === "Sizzlers" || cat === "Combo") return IMAGES.sizzlerPlatter;
    if (cat === "Thali") return IMAGES.specialThali;
    if (cat === "Pasta" || cat === "Mocktails" || cat === "Beverages" || cat === "Shakes")
      return IMAGES.pastaCocktail;
    if (cat === "Tandoori Starters" || cat === "Rolls" || cat === "Burger")
      return IMAGES.tandooriPlatter;
    return IMAGES.heroAmbience;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-[#FFFDF5] border-l border-[#E8E4D5] h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E4D5] flex items-center justify-between bg-[#F8F5E8]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#168C82] text-white">
              <ShoppingCart className="w-5 h-5 text-[#F4C430]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#164A43] font-display uppercase tracking-wider">
                YOUR CART
              </h3>
              <span className="text-xs text-[#65736F] font-semibold">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-[#65736F] hover:text-[#18312E] hover:bg-[#E8E4D5] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {cart.length > 0 ? (
            cart.map((ci) => (
              <div
                key={ci.id}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E4D5] shadow-xs flex items-center justify-between gap-3"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#E8E4D5]">
                  <img
                    src={ci.image || getFallbackImg(ci.category)}
                    alt={ci.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <VegetarianBadge size="sm" />
                    <span className="text-[10px] font-bold text-[#168C82] uppercase truncate">
                      {ci.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#18312E] truncate">
                    {ci.name}
                  </h4>
                  <div className="text-xs font-bold text-[#168C82] tabular-nums font-mono mt-0.5">
                    ₹{ci.price * ci.quantity}{" "}
                    <span className="text-[11px] text-[#65736F] font-normal">
                      (₹{ci.price} each)
                    </span>
                  </div>
                </div>

                {/* Live Quantity Controls [ − ] qty [ + ] */}
                <div className="flex items-center gap-1.5 bg-[#168C82] text-white rounded-xl px-1.5 py-1 shrink-0 shadow-xs">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(ci.id)}
                    className="p-0.5 text-white hover:text-[#F4C430] transition-colors"
                    aria-label={`Decrease quantity of ${ci.name}`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-5 text-center text-xs font-bold font-mono tabular-nums">
                    {ci.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increaseQuantity(ci.id)}
                    className="p-0.5 text-white hover:text-[#F4C430] transition-colors"
                    aria-label={`Increase quantity of ${ci.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(ci.id)}
                  className="p-1 text-[#95A09C] hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#65736F]">
              <div className="w-16 h-16 rounded-full bg-[#EBF8F6] flex items-center justify-center text-[#168C82] mb-3">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-[#164A43] font-bold text-base">
                Your cart is currently empty.
              </p>
              <p className="text-xs text-[#65736F] mt-1 max-w-xs leading-relaxed">
                Add your favorite vegetarian soups, platters, noodles, and beverages to start your order.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Bottom Bar: Subtotal & Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8E4D5] bg-[#F8F5E8] space-y-3.5">
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-xs text-[#65736F] font-semibold block">
                  Subtotal
                </span>
                <span className="text-2xl font-black text-[#168C82] font-mono tabular-nums">
                  ₹{cartTotal}
                </span>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-[#65736F] hover:text-red-600 font-semibold underline"
              >
                Clear Cart
              </button>
            </div>

            {/* Buttons: [ Continue Shopping ] & [ Order Now ] */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F8F5E8] text-[#164A43] border border-[#D5D0C0] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <ArrowLeft className="w-4 h-4 text-[#168C82]" />
                <span>Continue Shopping</span>
              </button>

              <a
                href={SWIGGY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#F4C430] hover:bg-[#E8B923] text-[#164A43] font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
              >
                <span>Order Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
