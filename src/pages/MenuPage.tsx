import React, { useState, useMemo, useRef } from "react";
import { ArrowLeft, Search, ShoppingCart, X, Utensils, Sparkles, Filter, Home } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem, IMAGES } from "../data/menuData";
import { VegetarianBadge } from "../components/VegetarianBadge";
import { QuantityButton } from "../components/QuantityButton";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "../context/RouterContext";
import { Footer } from "../components/Footer";

export const MenuPage: React.FC = () => {
  const { cartCount, setIsCartOpen, openModal } = useOrder();
  const { navigate } = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const categoryScrollRef = useRef<HTMLDivElement>(null);

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

  // Immediate Search and Category Filtering
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#18312E] font-body flex flex-col">
      {/* 1. Dedicated Menu Page Header */}
      <header className="sticky top-0 z-40 bg-[#FFFDF5]/95 backdrop-blur-md border-b border-[#E8E4D5] shadow-xs py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: ← Eddy's Restaurant (Back to Home) */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 text-sm sm:text-base font-bold text-[#164A43] hover:text-[#168C82] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#168C82] group-hover:-translate-x-1 transition-transform" />
              <span className="font-display font-extrabold text-[#168C82]">Eddy’s</span>
              <span className="font-display hidden xs:inline">Restaurant</span>
            </button>

            {/* Center: Menu Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF8F6] border border-[#168C82]/20 text-[#168C82] text-xs font-bold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-[#F4C430]" />
              <span>Menu</span>
            </div>

            {/* Right: 🛒 Cart (Count) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8F5E8] hover:bg-[#EBF8F6] text-[#164A43] border border-[#D5D0C0] hover:border-[#168C82] transition-all font-bold text-xs sm:text-sm shadow-xs"
            >
              <ShoppingCart className="w-4 h-4 text-[#168C82]" />
              <span>Cart</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#168C82] text-white font-mono text-xs tabular-nums font-bold">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Menu Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#15803D] text-xs font-bold mb-2.5">
            <VegetarianBadge size="sm" showLabel />
            <span>· Freshly Prepared</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-2">
            Eddy's Menu
          </h1>
          <p className="text-base sm:text-lg text-[#65736F] font-light">
            Something delicious for every craving.
          </p>

          {/* Quick Back to Home text link */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1 text-xs text-[#168C82] font-semibold hover:underline mt-2"
          >
            <Home className="w-3 h-3" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-[#65736F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search dishes (Paneer, Pizza, Pasta, Momos, Burger, Soup...)"
              className="w-full pl-10 pr-9 py-3 bg-white border border-[#D5D0C0] rounded-2xl text-[#18312E] text-sm placeholder-[#8A9692] shadow-xs focus:outline-none focus:border-[#168C82] focus:ring-1 focus:ring-[#168C82] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#65736F] hover:text-[#18312E]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar: Horizontally scrollable on mobile, clean navigation bar on desktop */}
        <div className="sticky top-[60px] z-30 py-3 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#FFFDF5]/95 backdrop-blur-md border-y border-[#E8E4D5] shadow-xs mb-8">
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === "All"
                  ? "bg-[#168C82] text-white shadow-sm"
                  : "bg-[#FFFDF5] text-[#164A43] hover:bg-[#EBF8F6] border border-[#D5D0C0]"
              }`}
            >
              All Items ({MENU_ITEMS.length})
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-[#168C82] text-white shadow-sm"
                      : "bg-[#FFFDF5] text-[#164A43] hover:bg-[#EBF8F6] border border-[#D5D0C0]"
                  }`}
                >
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
        <div className="mb-6 flex items-center justify-between text-xs text-[#65736F]">
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
            <span>100% Vegetarian</span>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="group p-5 rounded-2xl bg-[#FFFDF5] hover:bg-[#FDFBF3] border border-[#E8E4D5] hover:border-[#168C82]/50 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Clean Food Image */}
                  <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-stone-100 mb-4 border border-[#E8E4D5]">
                    <img
                      src={getItemThumbnail(item)}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 px-2 py-0.5 rounded-md border border-[#E8E4D5] shadow-xs">
                      <VegetarianBadge size="sm" showLabel />
                    </div>
                    {item.featured && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#F4C430] text-[#164A43] text-[10px] font-extrabold shadow-xs">
                        ★ Recommended
                      </div>
                    )}
                  </div>

                  {/* Category and Title */}
                  <span className="text-[11px] font-bold text-[#168C82] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>

                  <h3 className="text-lg font-bold text-[#164A43] font-display group-hover:text-[#168C82] transition-colors mb-1.5 leading-snug">
                    {item.name}
                  </h3>

                  {item.description ? (
                    <p className="text-xs text-[#65736F] leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-xs text-[#95A09C] italic mb-4">
                      Freshly prepared upon order with authentic seasonings.
                    </p>
                  )}
                </div>

                {/* Footer: Price + Functional Quantity Button */}
                <div className="pt-3 border-t border-[#F0ECE0] flex items-center justify-between">
                  <span className="text-xl font-black text-[#168C82] font-mono tabular-nums">
                    ₹{item.price}
                  </span>

                  <QuantityButton item={item} size="md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-[#F8F5E8] border border-[#E8E4D5]">
            <p className="text-[#164A43] text-base font-bold mb-1">
              No dishes found matching your search.
            </p>
            <p className="text-xs text-[#65736F] mb-5">
              Try searching for Paneer, Pizza, Pasta, Momos, Burger, or clear your search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-[#168C82] text-white font-bold text-xs shadow-xs"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        )}

        {/* Back to Home bottom button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-[#F8F5E8] text-[#164A43] border border-[#D5D0C0] font-bold text-xs shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#168C82]" />
            <span>Back to Eddy's Home</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
