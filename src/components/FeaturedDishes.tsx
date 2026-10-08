import React from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { FEATURED_DISHES, MENU_ITEMS, MenuItem } from "../data/menuData";
import { VegetarianBadge } from "./VegetarianBadge";
import { QuantityButton } from "./QuantityButton";
import { useOrder } from "../context/OrderContext";

export const FeaturedDishes: React.FC = () => {
  const { openModal } = useOrder();

  const getMenuItem = (name: string, fallbackCategory = "Favourites"): MenuItem => {
    const found = MENU_ITEMS.find(
      (m) =>
        m.name.toLowerCase() === name.toLowerCase() ||
        m.name.replace(/[’']/g, "").toLowerCase() === name.replace(/[’']/g, "").toLowerCase()
    );
    if (found) return found;

    return {
      id: `feat-${name.replace(/\s+/g, "-").toLowerCase()}`,
      name,
      price: 219,
      category: fallbackCategory,
      vegetarian: true,
      description: "Prepared fresh to order with authentic spices.",
    };
  };

  return (
    <section id="featured" className="py-16 lg:py-24 bg-[#F8F5E8] border-b border-[#E8E4D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#168C82] mb-1.5">
              <Sparkles className="w-4 h-4 text-[#F4C430]" />
              <span>Chef's Handpicked Favourites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display">
              Eddy's Favourites
            </h2>
            <p className="text-sm text-[#65736F] mt-2 max-w-xl">
              Our most celebrated vegetarian creations — freshly prepared, rich in authentic spices, and loved by guests.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#168C82] hover:text-[#0F766E] transition-colors group"
            >
              <span>Explore All 25 Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 6 Balanced Featured Dish Cards (2 rows of 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FEATURED_DISHES.map((dish) => {
            const item = getMenuItem(dish.name, dish.category);
            const isSignature = dish.name.includes("Thali") || dish.name.includes("Sizzler");

            return (
              <div
                key={dish.name}
                onClick={() => openModal(item)}
                className="bg-[#FFFDF5] rounded-2xl overflow-hidden border border-[#E8E4D5] hover:border-[#168C82]/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Fixed-Height Food Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />

                    {/* Vegetarian Emblem */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-lg border border-[#E8E4D5] shadow-xs">
                      <VegetarianBadge size="sm" showLabel />
                    </div>

                    {/* Featured / Signature Badge */}
                    {isSignature && (
                      <div className="absolute top-3 right-3 bg-[#F4C430] text-[#164A43] font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#164A43]" />
                        <span>Signature</span>
                      </div>
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#168C82] uppercase tracking-wider">
                        {dish.category}
                      </span>
                      <span className="text-xs text-[#65736F] font-medium">
                        Pure Veg
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#164A43] font-display group-hover:text-[#168C82] transition-colors mb-2">
                      {dish.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#65736F] leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer with Price & Interactive Quantity Button */}
                <div className="p-5 sm:p-6 pt-0 border-t border-[#F0ECE0] mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#65736F] block">Special Price</span>
                    <span className="text-xl sm:text-2xl font-black text-[#168C82] font-mono tabular-nums">
                      ₹{dish.price}
                    </span>
                  </div>

                  <QuantityButton item={item} size="md" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-10">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#FFFDF5] hover:bg-[#168C82] text-[#168C82] hover:text-white border-2 border-[#168C82] font-bold text-sm shadow-xs transition-all hover:scale-[1.02]"
          >
            <span>View Full Menu &amp; Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
