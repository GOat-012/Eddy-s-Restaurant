import React from "react";
import { ArrowRight, Utensils, Sparkles, MapPin } from "lucide-react";
import { IMAGES } from "../data/menuData";
import { VegetarianBadge } from "./VegetarianBadge";
import { useRouter } from "../context/RouterContext";

export const Hero: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section
      id="home"
      className="relative bg-[#FFFDF5] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#E8E4D5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Content & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Vegetarian & Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF8F6] border border-[#168C82]/30 text-[#164A43] text-xs font-semibold mb-5 shadow-xs">
              <VegetarianBadge size="sm" />
              <span className="text-[#15803D] font-bold">100% Vegetarian</span>
              <span className="text-[#A2ADA9]" aria-hidden="true">·</span>
              <span>Freshly Prepared</span>
              <span className="text-[#A2ADA9]" aria-hidden="true">·</span>
              <span>Family Friendly</span>
            </div>

            {/* Brand Kicker */}
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#168C82] mb-2 block">
              EDDY'S RESTAURANT
            </span>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#164A43] font-display mb-4 leading-[1.15]">
              Good Food.{" "}
              <span className="text-[#168C82]">Great Moments.</span>
            </h1>

            {/* Subheading from Prompt */}
            <p className="text-base sm:text-lg md:text-xl text-[#65736F] font-normal leading-relaxed mb-8 max-w-xl">
              “Fresh vegetarian favourites, comforting classics and something for every craving.”
            </p>

            {/* Primary & Secondary Buttons - BOTH redirect to /menu */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl text-white bg-[#168C82] hover:bg-[#0F766E] font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:shadow-[#168C82]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Utensils className="w-4 h-4 text-[#F4C430]" />
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/menu")}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl text-[#164A43] bg-[#F4C430] hover:bg-[#E8B923] font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Order Now</span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/10 font-bold text-[#164A43]">
                  Digital Menu
                </span>
              </button>
            </div>

            {/* Quick Cuisine Highlights in Warm Cream Box */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl pt-6 border-t border-[#E8E4D5]">
              <div className="p-3 rounded-xl bg-[#F8F5E8] border border-[#E8E4D5]">
                <span className="block text-xs font-bold text-[#168C82] uppercase tracking-wider mb-0.5">
                  Cuisines
                </span>
                <span className="text-xs text-[#18312E] font-medium leading-snug">
                  North Indian &amp; Chinese
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F5E8] border border-[#E8E4D5]">
                <span className="block text-xs font-bold text-[#168C82] uppercase tracking-wider mb-0.5">
                  Signatures
                </span>
                <span className="text-xs text-[#18312E] font-medium leading-snug">
                  Royal Thalis &amp; Sizzlers
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F5E8] border border-[#E8E4D5]">
                <span className="block text-xs font-bold text-[#168C82] uppercase tracking-wider mb-0.5">
                  Beverages
                </span>
                <span className="text-xs text-[#18312E] font-medium leading-snug">
                  Mocktails &amp; Shakes
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Actual Restaurant Exterior Photograph (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src={IMAGES.eddysExterior}
                alt="Actual Eddy's Restaurant storefront with teal awning and warm illuminated yellow signage"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-center max-h-[480px] hover:scale-102 transition-transform duration-500 ease-out"
              />
              {/* Natural caption strip */}
              <div className="p-3.5 bg-[#FFFDF5] border-t border-[#E8E4D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#164A43] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#168C82]" />
                  <span>Eddy’s Restaurant Storefront</span>
                </div>
                <span className="text-[#15803D] font-bold">Open Daily 11 AM - 11 PM</span>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-3 -left-3 sm:-left-5 bg-[#F4C430] text-[#164A43] font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-md border border-[#E8E4D5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Vegetarian Dining</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
