import React, { useState } from "react";
import { Camera, Eye, X } from "lucide-react";
import { IMAGES } from "../data/menuData";

interface GalleryPhoto {
  id: string;
  title: string;
  category: "Exterior" | "Interior" | "Thalis" | "Tandoori" | "Pizza & Pasta" | "Mocktails & Desserts";
  image: string;
  tag: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: "g1",
      title: "Eddy's Restaurant Storefront & Signage",
      category: "Exterior",
      image: IMAGES.eddysExterior,
      tag: "Teal Awning & Illuminated Yellow Signage",
    },
    {
      id: "g2",
      title: "Warm Interior Dining Room",
      category: "Interior",
      image: IMAGES.heroAmbience,
      tag: "Cozy Family Dining Atmosphere",
    },
    {
      id: "g3",
      title: "Eddy's Royal Special Thali",
      category: "Thalis",
      image: IMAGES.specialThali,
      tag: "Pure Indian Vegetarian Spread",
    },
    {
      id: "g4",
      title: "Steaming Chinese Sizzler Platter",
      category: "Thalis",
      image: IMAGES.sizzlerPlatter,
      tag: "Wok Noodles, Rice & Paneer",
    },
    {
      id: "g5",
      title: "Artisanal Mix Sauce Pasta & Gourmet Pizza",
      category: "Pizza & Pasta",
      image: IMAGES.pastaCocktail,
      tag: "Continental Pastas & Stone-Baked Crusts",
    },
    {
      id: "g6",
      title: "Clay-Oven Tandoori Paneer Platter",
      category: "Tandoori",
      image: IMAGES.tandooriPlatter,
      tag: "Charred Tikka & Kebabs",
    },
    {
      id: "g7",
      title: "Handcrafted Mocktails & Makhana Kheer",
      category: "Mocktails & Desserts",
      image: IMAGES.pastaCocktail,
      tag: "Mint Mojitos, Shakes & Gulab Jamun",
    },
    {
      id: "g8",
      title: "Evening Ambience & Welcoming Hospitality",
      category: "Interior",
      image: IMAGES.heroAmbience,
      tag: "Tables Set For Celebrations",
    },
  ];

  const categories = ["All", "Exterior", "Interior", "Thalis", "Tandoori", "Pizza & Pasta", "Mocktails & Desserts"];

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#FFFDF5] border-b border-[#E8E4D5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#168C82] text-xs font-bold uppercase tracking-widest mb-2.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display">
              A Glimpse into Eddy’s
            </h2>
            <p className="text-sm text-[#65736F] mt-1 max-w-xl">
              From our vibrant storefront on the boulevard to royal thalis, tandoori grills, pizzas, and artisan drinks.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-5 md:mt-0 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeFilter === cat
                    ? "bg-[#168C82] text-white shadow-xs"
                    : "bg-[#F8F5E8] text-[#164A43] hover:bg-[#EBF8F6] border border-[#E8E4D5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 cursor-pointer border border-[#E8E4D5] hover:border-[#168C82]/50 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
              />

              {/* Natural subtle bottom scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#F4C430] uppercase tracking-wider block mb-0.5">
                    {photo.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display leading-tight line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs text-white group-hover:bg-[#168C82] transition-colors shrink-0 ml-2">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] w-full bg-stone-900">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-5 flex items-center justify-between bg-[#FFFDF5] border-t border-[#E8E4D5]">
              <div>
                <span className="text-xs text-[#168C82] font-bold uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h4 className="text-lg font-bold text-[#164A43] font-display mt-0.5">
                  {selectedPhoto.title}
                </h4>
              </div>
              <span className="text-xs text-[#65736F] font-medium hidden sm:inline">
                {selectedPhoto.tag}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
