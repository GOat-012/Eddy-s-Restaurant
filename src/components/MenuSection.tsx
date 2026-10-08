import React, { useState, useMemo, useRef } from "react";
import { Search, X, Utensils, Sparkles, Filter } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem, IMAGES } from "../data/menuData";
import { VegetarianBadge } from "./VegetarianBadge";
import { QuantityButton } from "./QuantityButton";
import { useOrder } from "../context/OrderContext";

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const { openModal } = useOrder();

  // Helper for thumbnail image per item
  const getItemThumbnail = (item: MenuItem) => {
    if (item.image) return item.image;
    if (item.category === "Sizzlers" || item.category === "Combo")
      return IMAGES.sizzlerPlatter;
    if (item.category === "Thali") return IMAGES.specialThali;
    if (item.category === "Pasta" || item.category === "Mocktails" || item.category === "Beverages" || item.category === "Shakes")
      return IMAGES.pastaCocktail;
    if (item.category === "Tandoori Starters" || item.category === "Rolls" || item.category === "Burger" || item.category === "Momos Mania")
      return IMAGES.tandooriPlatter;
    return IMAGES.heroAmbience;
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#FFFDF5] border-b border-[#E8E4D5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#168C82] text-xs font-bold uppercase tracking-widest mb-2.5">
            <Utensils className="w-3.5 h-3.5" />
            <span>Eddy’s Digital Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-3">
            Pure Vegetarian Delicacies
          </h2>
          <p className="text-sm sm:text-base text-[#65736F] leading-relaxed">
            All dishes are prepared fresh to order. Select items to curate your personal dining tray.
          </p>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#F8F5E8] border border-[#E8E4D5] shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#65736F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Pasta, Chaap, Thali, Sizzler, Paneer Tikka...)"
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#D5D0C0] rounded-xl text-[#18312E] text-xs sm:text-sm placeholder-[#95A09C] focus:outline-none focus:border-[#168C82] focus:ring-1 focus:ring-[#168C82] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65736F] hover:text-[#18312E]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <span className="text-xs font-medium text-[#65736F] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 bg-white border border-[#D5D0C0] rounded-xl text-xs sm:text-sm text-[#18312E] font-medium focus:outline-none focus:border-[#168C82] cursor-pointer"
            >
              <option value="default">Menu Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Sticky Category Navigation Bar */}
        <div className="sticky top-[68px] sm:top-[74px] z-30 py-3 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#FFFDF5]/95 backdrop-blur-md border-y border-[#E8E4D5] shadow-xs">
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
          >
            {/* All Items Button */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === "All"
                  ? "bg-[#168C82] text-white shadow-sm"
                  : "bg-[#FFFDF5] text-[#164A43] hover:bg-[#EBF8F6] border border-[#D5D0C0]"
              }`}
            >
              All Items ({MENU_ITEMS.length})
            </button>

            {/* 25 Category Buttons */}
            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat).length;
              const isActive = selectedCategory === cat;
              const isSpecial = cat === "Thali" || cat === "Sizzlers" || cat === "Combo";

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-[#168C82] text-white shadow-sm"
                      : "bg-[#FFFDF5] text-[#164A43] hover:bg-[#EBF8F6] border border-[#D5D0C0]"
                  }`}
                >
                  {isSpecial && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#F4C430]" />
                  )}
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] font-mono ${
                      isActive ? "text-white/80" : "text-[#65736F]"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 mb-6 flex items-center justify-between text-xs text-[#65736F]">
          <div>
            Showing <span className="font-bold text-[#168C82] tabular-nums">{filteredItems.length}</span> dishes
            {selectedCategory !== "All" && (
              <span> in <span className="text-[#164A43] font-bold">{selectedCategory}</span></span>
            )}
            {searchQuery && (
              <span> matching "<span className="text-[#164A43] font-bold">{searchQuery}</span>"</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-[#15803D] font-bold">
            <VegetarianBadge size="sm" />
            <span>100% Pure Vegetarian</span>
          </div>
        </div>

        {/* Clean, Lightweight Restaurant Menu Layout Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="group p-4 rounded-2xl bg-[#FFFDF5] hover:bg-[#FDFBF3] border border-[#E8E4D5] hover:border-[#168C82]/40 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-2.5">
                    {/* Small crisp thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#E8E4D5]">
                      <img
                        src={getItemThumbnail(item)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      />
                      <div className="absolute top-1 left-1 bg-white/90 p-0.5 rounded">
                        <VegetarianBadge size="sm" />
                      </div>
                    </div>

                    {/* Dish text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[11px] font-bold text-[#168C82] uppercase tracking-wider truncate">
                          {item.category}
                        </span>
                        {item.featured && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#F4C430] text-[#164A43] leading-none shrink-0">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#164A43] font-display group-hover:text-[#168C82] transition-colors leading-snug line-clamp-1">
                        {item.name}
                      </h3>

                      {item.description ? (
                        <p className="text-xs text-[#65736F] line-clamp-2 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      ) : (
                        <p className="text-xs text-[#95A09C] italic mt-1">
                          Freshly cooked with authentic herbs &amp; spices.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Price + Quantity Controller Button */}
                <div className="pt-2.5 border-t border-[#F0ECE0] flex items-center justify-between gap-2 mt-1">
                  <div>
                    <span className="text-lg font-black text-[#168C82] font-mono tabular-nums">
                      ₹{item.price}
                    </span>
                  </div>

                  <QuantityButton item={item} size="sm" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#F8F5E8] border border-[#E8E4D5]">
            <p className="text-[#164A43] text-base font-bold mb-1">
              No dishes found matching your query.
            </p>
            <p className="text-xs text-[#65736F] mb-5">
              Try searching with another dish name or reset categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#168C82] text-white font-bold text-xs shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
