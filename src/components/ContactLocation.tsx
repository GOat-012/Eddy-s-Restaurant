import React from "react";
import { MapPin, Phone, Clock, Navigation, ExternalLink, Instagram } from "lucide-react";
import {
  SWIGGY_URL,
  RESTAURANT_PHONE,
  RESTAURANT_ADDRESS,
  RESTAURANT_HOURS,
  MAPS_EMBED_URL,
  INSTAGRAM_URL,
} from "../config";

export const ContactLocation: React.FC = () => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT_ADDRESS
  )}`;

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8F5E8] border-b border-[#E8E4D5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-sm relative overflow-hidden mb-12">
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#168C82] block mb-2">
              Visit Eddy’s Restaurant
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-3">
              Hungry Yet?
            </h2>
            <p className="text-base sm:text-lg text-[#65736F] font-normal mb-8 max-w-2xl leading-relaxed">
              Come over and make your next meal an Eddy’s experience.
            </p>

            {/* 3 Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8F5E8] text-[#164A43] font-bold text-sm border-2 border-[#D5D0C0] hover:border-[#168C82] shadow-xs transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4 text-[#168C82]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${RESTAURANT_PHONE}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F8F5E8] text-[#164A43] font-bold text-sm border-2 border-[#D5D0C0] hover:border-[#168C82] shadow-xs transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-[#168C82]" />
                <span>Call Now</span>
              </a>

              <a
                href={SWIGGY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F4C430] hover:bg-[#E8B923] text-[#164A43] font-black text-sm shadow-sm transition-all hover:scale-[1.02]"
              >
                <span>Order Online</span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/10 font-bold">
                  Swiggy
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#EBF8F6] text-[#168C82] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1">
                  Restaurant Address
                </h4>
                <p className="text-sm text-[#18312E] leading-relaxed">
                  {RESTAURANT_ADDRESS}
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#168C82] font-bold hover:underline mt-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#EBF8F6] text-[#168C82] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1">
                  Opening Hours
                </h4>
                <p className="text-sm text-[#18312E] leading-relaxed">
                  {RESTAURANT_HOURS}
                </p>
                <p className="text-xs text-[#15803D] font-bold mt-1">
                  Open for Dine-In, Takeaway &amp; Online Delivery
                </p>
              </div>
            </div>

            {/* Phone & Booking */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#EBF8F6] text-[#168C82] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1">
                  Phone &amp; Table Bookings
                </h4>
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="text-base font-bold text-[#168C82] hover:underline tabular-nums"
                >
                  {RESTAURANT_PHONE}
                </a>
                <p className="text-xs text-[#65736F] mt-0.5">
                  Call for table reservations and parcel queries.
                </p>
              </div>
            </div>

            {/* Instagram Social Card */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#EBF8F6] text-[#168C82] shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#164A43] uppercase tracking-wider">
                    Follow on Instagram
                  </h4>
                  <p className="text-xs font-semibold text-[#168C82]">
                    @eddysrestro
                  </p>
                </div>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#168C82] hover:bg-[#0F766E] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Follow →
              </a>
            </div>

            {/* Swiggy block */}
            <div className="p-5 rounded-2xl bg-[#EBF8F6] border border-[#168C82]/30 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#168C82] uppercase tracking-wider block">
                  Online Delivery
                </span>
                <p className="text-sm font-bold text-[#164A43] mt-0.5">
                  Order Eddy’s from Swiggy
                </p>
              </div>
              <a
                href={SWIGGY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#168C82] hover:bg-[#0F766E] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Order Online →
              </a>
            </div>
          </div>

          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E8E4D5] shadow-xs bg-stone-100 min-h-[340px] relative">
            <iframe
              title="Eddy's Restaurant Location Map"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "340px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <div className="absolute top-3.5 left-3.5 bg-white/95 px-3 py-2 rounded-xl border border-[#E8E4D5] shadow-sm pointer-events-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#15803D]" />
                <span className="text-xs font-bold text-[#164A43]">Eddy’s Restaurant</span>
              </div>
              <span className="text-[11px] text-[#65736F] block">
                Pure Vegetarian Dining
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
