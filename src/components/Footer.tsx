import React from "react";
import { MapPin, Phone, ExternalLink, Instagram, Facebook } from "lucide-react";
import { SWIGGY_URL, RESTAURANT_PHONE, RESTAURANT_ADDRESS, INSTAGRAM_URL } from "../config";
import { useRouter } from "../context/RouterContext";

export const Footer: React.FC = () => {
  const { navigate, currentPath } = useRouter();

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === "/menu") {
      navigate("/menu");
      return;
    }

    if (currentPath !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#164A43] text-[#FFFDF5] pt-14 pb-24 md:pb-12 border-t-4 border-[#168C82]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="inline-flex items-center gap-2 text-2xl font-bold font-display text-left"
            >
              <span className="text-[#F4C430] font-display font-extrabold">Eddy’s</span>
              <span className="text-white">Restaurant</span>
            </button>
            <p className="text-base font-display italic text-[#F4C430]">
              “Good Food. Great Moments.”
            </p>
            <p className="text-xs sm:text-sm text-[#E2EAE8] max-w-sm leading-relaxed font-light">
              Wholesome vegetarian multi-cuisine dining inspired by authentic Indian street flavours, clay-oven tandoor, wok specialties, and refreshing drinks.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-bold text-[#F4C430] border border-white/20">
                100% Pure Vegetarian Kitchen
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols - Home, About, Gallery, Contact, View Menu) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C430] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, "#home")}
                  className="text-[#E2EAE8] hover:text-[#F4C430] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className="text-[#E2EAE8] hover:text-[#F4C430] transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, "#gallery")}
                  className="text-[#E2EAE8] hover:text-[#F4C430] transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, "#reviews")}
                  className="text-[#E2EAE8] hover:text-[#F4C430] transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, "#contact")}
                  className="text-[#E2EAE8] hover:text-[#F4C430] transition-colors"
                >
                  Contact
                </button>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={() => navigate("/menu")}
                  className="text-[#F4C430] font-bold hover:underline"
                >
                  View Menu →
                </button>
              </li>
            </ul>
          </div>

          {/* Online Order & Social (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C430] uppercase tracking-wider">
              Order Online
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={SWIGGY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#F4C430] font-semibold transition-colors"
              >
                <span>Order on Swiggy</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F4C430]" />
              </a>
              <div className="pt-2">
                <span className="text-[11px] text-[#A6BFBB] block mb-2">Follow Us on Instagram</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#F4C430] text-white hover:text-[#164A43] transition-colors text-xs font-semibold"
                    aria-label="Instagram @eddysrestro"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>@eddysrestro</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Placeholders (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C430] uppercase tracking-wider">
              Visit &amp; Contact
            </h4>
            <div className="space-y-2 text-xs text-[#E2EAE8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F4C430] shrink-0 mt-0.5" />
                <span>{RESTAURANT_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4C430] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="hover:text-[#F4C430] font-semibold transition-colors"
                >
                  {RESTAURANT_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6BFBB] gap-3">
          <p>© 2026 Eddy’s Restaurant. All Rights Reserved.</p>
          <p className="text-[11px]">
            100% Pure Vegetarian · Two-Page Digital Dining Platform
          </p>
        </div>
      </div>
    </footer>
  );
};
