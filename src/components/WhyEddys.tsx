import React from "react";
import { Sparkles, UtensilsCrossed, Leaf, PartyPopper } from "lucide-react";

export const WhyEddys: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Freshly Prepared",
      desc: "Made fresh for every order.",
    },
    {
      icon: UtensilsCrossed,
      title: "Something For Everyone",
      desc: "Indian, Chinese, Continental and more.",
    },
    {
      icon: Leaf,
      title: "Vegetarian Delights",
      desc: "A complete vegetarian menu packed with variety.",
    },
    {
      icon: PartyPopper,
      title: "Perfect For Every Occasion",
      desc: "Casual meals, family dining and celebrations.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFFDF5] border-b border-[#E8E4D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#168C82] mb-1.5 block">
            The Eddy's Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#164A43] font-display">
            Why Dine With Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8F5E8] border border-[#E8E4D5] hover:border-[#168C82]/40 transition-all duration-300 hover:-translate-y-1 group shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EBF8F6] border border-[#168C82]/20 flex items-center justify-center text-[#168C82] mb-4 group-hover:scale-108 transition-transform">
                  <Icon className="w-5 h-5 text-[#168C82]" />
                </div>
                <h3 className="text-base font-bold text-[#164A43] font-display mb-1.5 group-hover:text-[#168C82] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#65736F] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
