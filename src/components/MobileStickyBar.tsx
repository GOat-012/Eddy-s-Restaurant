import React from "react";
import { Utensils, ShoppingCart, ExternalLink, Home } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "../context/RouterContext";
import { SWIGGY_URL } from "../config";

export const MobileStickyBar: React.FC = () => {
  const { cartCount, cartTotal, setIsCartOpen } = useOrder();
  const { currentPath, navigate } = useRouter();

  const isMenuPage = currentPath === "/menu";

  return (
    <aside
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-t border-[#E8E4D5] px-3 py-2 shadow-lg flex items-center justify-between gap-2 h-14"
    >
      {/* Switch between Menu or Home + Cart Drawer Trigger */}
      {isMenuPage ? (
        <>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F8F5E8] border border-[#D5D0C0] text-[#164A43] text-xs font-bold shrink-0 shadow-xs"
          >
            <Home className="w-3.5 h-3.5 text-[#168C82]" />
            <span>Home</span>
          </button>

          {/* Cart Drawer Trigger with Instant Count (Menu page only) */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D5D0C0] text-[#18312E] text-xs font-bold flex-1 justify-center truncate shadow-xs"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-[#168C82]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#168C82] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="truncate font-semibold text-[#164A43]">
              {cartCount > 0 ? `Cart: ₹${cartTotal}` : "My Cart"}
            </span>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/menu")}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#168C82] text-white text-xs font-bold flex-1 shadow-xs hover:bg-[#0F766E] transition-all"
        >
          <Utensils className="w-3.5 h-3.5 text-[#F4C430]" />
          <span>Explore Full Menu</span>
        </button>
      )}

      {/* Swiggy Button */}
      <a
        href={SWIGGY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-[#F4C430] hover:bg-[#E8B923] text-[#164A43] text-xs font-black shrink-0 shadow-xs"
      >
        <span>Swiggy</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </aside>
  );
};
