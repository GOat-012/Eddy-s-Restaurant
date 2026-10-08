import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { Reviews } from "../components/reviews/Reviews";
import { ContactLocation } from "../components/ContactLocation";
import { Footer } from "../components/Footer";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#18312E] font-body flex flex-col">
      {/* 1. Homepage Navigation Bar */}
      <Navbar />

      {/* Main Single Intro Page Sections */}
      <main className="flex-1">
        {/* Section 1: Hero (Features actual Eddy's Restaurant photo, Explore Menu & Order Now -> /menu) */}
        <Hero />

        {/* Section 2: About Eddy's (#about) */}
        <About />

        {/* Section 3: Visual Editorial Gallery (#gallery) */}
        <Gallery />

        {/* Section 4: Customer Reviews (#reviews) */}
        <Reviews />

        {/* Section 5: Contact & Location (#contact) */}
        <ContactLocation />
      </main>

      {/* Deep Forest Green Footer */}
      <Footer />
    </div>
  );
};
