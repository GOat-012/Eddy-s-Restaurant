import React from "react";
import { Users, Sparkles, ArrowRight } from "lucide-react";
import { SPECIAL_COMBOS, MENU_ITEMS } from "../data/menuData";
import { VegetarianBadge } from "./VegetarianBadge";
import { QuantityButton } from "./QuantityButton";
import { useOrder } from "../context/OrderContext";
import { SWIGGY_URL } from "../config";

export const ComboSection: React.FC = () => {
  const { openModal } = useOrder();

  const getComboItem = (name: string, price: number, desc: string, img: string) => {
    return (
      MENU_ITEMS.find((m) => m.name.toLowerCase() === name.toLowerCase()) || {
        id: `combo-${name}`,
        name,
        price,
        description: desc,
        category: "Combo",
        vegetarian: true,
        image: img,
      }
    );
  };

  return (
    <section id="offers" className="py-16 lg:py-24 bg-[#F8F5E8] border-b border-[#E8E4D5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#168C82] text-xs font-bold uppercase tracking-widest mb-2.5">
            <Users className="w-3.5 h-3.5" />
            <span>Feast Together</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-3">
            Made For Sharing
          </h2>
          <p className="text-sm sm:text-base text-[#65736F] leading-relaxed">
            Abundant sharing combos, steaming sizzling platters, and wholesome thalis prepared for family dining and gatherings.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SPECIAL_COMBOS.map((combo, idx) => {
            const item = getComboItem(combo.name, combo.price, combo.description, combo.image);
            return (
              <div
                key={idx}
                onClick={() => openModal(item)}
                className="bg-[#FFFDF5] rounded-2xl overflow-hidden border border-[#E8E4D5] hover:border-[#168C82]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#F4C430] text-[#164A43] text-xs font-extrabold shadow-xs">
                      {combo.badge}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 p-1 rounded-lg border border-[#E8E4D5]">
                      <VegetarianBadge size="sm" />
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-bold text-[#168C82] uppercase tracking-wider block mb-1">
                      Sharing Special
                    </span>
                    <h3 className="text-xl font-bold text-[#164A43] font-display group-hover:text-[#168C82] transition-colors mb-2">
                      {combo.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#65736F] leading-relaxed">
                      {combo.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#F0ECE0] mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#65736F] block">Sharing Price</span>
                    <span className="text-xl font-black text-[#168C82] font-mono tabular-nums">
                      ₹{combo.price}
                    </span>
                  </div>
                  <QuantityButton item={item} size="md" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Swiggy Sharing Banner in Warm Teal / Cream styling */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#EBF8F6] via-[#FFFDF5] to-[#FEF9E7] border border-[#168C82]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#168C82] block mb-1">
              Group Ordering Made Simple
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#164A43] font-display">
              Order Eddy's Combos &amp; Sizzlers on Swiggy
            </h4>
            <p className="text-xs sm:text-sm text-[#65736F] mt-1 max-w-xl">
              Freshly boxed in spill-proof containers and delivered hot right to your doorstep.
            </p>
          </div>
          <a
            href={SWIGGY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#F4C430] hover:bg-[#E8B923] text-[#164A43] font-extrabold text-sm shadow-sm transition-all hover:scale-103 whitespace-nowrap"
          >
            Order on Swiggy →
          </a>
        </div>
      </div>
    </section>
  );
};
