import React from "react";
import { Leaf, Utensils, ShieldCheck, Flame, Users, Sparkles } from "lucide-react";
import { IMAGES } from "../data/menuData";
import { VegetarianBadge } from "./VegetarianBadge";

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: "Freshly Prepared",
      desc: "Made fresh for every order.",
    },
    {
      icon: Utensils,
      title: "Something For Everyone",
      desc: "Indian, Chinese, Continental and more.",
    },
    {
      icon: Leaf,
      title: "Vegetarian Delights",
      desc: "A complete vegetarian menu packed with variety.",
    },
    {
      icon: Users,
      title: "Perfect For Every Occasion",
      desc: "Casual meals, family dining and celebrations.",
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#FFFDF5] border-b border-[#E8E4D5] relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left Column: Real Restaurant Exterior Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
              <img
                src={IMAGES.eddysExterior}
                alt="Eddy's Restaurant actual exterior storefront"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-center"
              />
              <div className="p-4 bg-[#FFFDF5] border-t border-[#E8E4D5]">
                <p className="text-xs font-bold text-[#168C82] uppercase tracking-wide">
                  Welcome to Eddy's Restaurant
                </p>
                <p className="text-sm font-semibold text-[#164A43] mt-0.5">
                  Our welcoming dining room with teal awning and warm lighting.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#168C82] text-xs font-bold uppercase tracking-widest mb-3">
              <VegetarianBadge size="sm" />
              <span>About Eddy's</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-5 leading-tight">
              More Than Just a Meal
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#18312E] leading-relaxed">
              <p className="font-medium text-[#164A43]">
                “Eddy’s Restaurant brings together comforting Indian favourites, flavour-packed Chinese dishes, pastas, pizzas, refreshing beverages, mocktails and desserts — all in one place.”
              </p>
              <p className="text-sm sm:text-base text-[#65736F]">
                From fragrant clay-oven naans and bubbling tandoori tikka to wok-tossed Hakka noodles and Italian pasta, we take pride in serving wholesome vegetarian food crafted with fresh ingredients and genuine care.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 pt-6 border-t border-[#E8E4D5] grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-[#F8F5E8] text-center border border-[#E8E4D5]">
                <span className="block text-2xl font-black text-[#168C82] font-mono">
                  25+
                </span>
                <span className="text-xs text-[#65736F] font-semibold">Categories</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F5E8] text-center border border-[#E8E4D5]">
                <span className="block text-2xl font-black text-[#15803D] font-mono">
                  100%
                </span>
                <span className="text-xs text-[#65736F] font-semibold">Vegetarian</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F5E8] text-center border border-[#E8E4D5]">
                <span className="block text-2xl font-black text-[#F4C430] font-mono">
                  Daily
                </span>
                <span className="text-xs text-[#65736F] font-semibold">Fresh Prep</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8F5E8] border border-[#E8E4D5] hover:border-[#168C82]/40 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF8F6] border border-[#168C82]/20 flex items-center justify-center text-[#168C82] mb-3.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#164A43] font-display mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#65736F] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
