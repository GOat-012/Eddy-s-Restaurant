import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, PhoneCall } from "lucide-react";
import { RESTAURANT_PHONE } from "../config";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "../context/RouterContext";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { cartCount, setIsCartOpen } = useOrder();
  const { currentPath, navigate } = useRouter();

  const showCart = currentPath === "/menu";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracker on home page
      const sections = ["home", "about", "gallery", "reviews", "contact"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Reviews", href: "#reviews", id: "reviews" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFFDF5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E4D5] py-3"
          : "bg-[#FFFDF5] border-b border-[#EFECE0] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight font-display"
          >
            <span className="text-[#168C82] font-display font-extrabold">Eddy’s</span>
            <span className="text-[#164A43] font-display">Restaurant</span>
          </a>

          {/* Desktop Nav Links (Home, About, Gallery, Contact) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#18312E]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`py-1 relative transition-colors ${
                    isActive
                      ? "text-[#168C82] font-bold"
                      : "text-[#18312E] hover:text-[#168C82]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#168C82] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Cart icon (Menu page only) & Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Counter Trigger - only visible on /menu */}
            {showCart && (
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="View Order Cart"
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFDF5] hover:bg-[#F8F5E8] text-[#164A43] border border-[#D5D0C0] shadow-xs hover:border-[#168C82] transition-all font-semibold text-xs sm:text-sm"
              >
                <ShoppingCart className="w-4 h-4 text-[#168C82]" />
                <span className="hidden sm:inline">Cart</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#168C82] text-white font-mono font-bold text-xs tabular-nums">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#18312E] hover:text-[#168C82] rounded-xl bg-[#F8F5E8] border border-[#E8E4D5] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF5] border-b border-[#E8E4D5] px-6 py-6 shadow-xl transition-all">
          <nav className="flex flex-col gap-3 text-base font-medium text-[#18312E]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 hover:text-[#168C82] border-b border-[#F0ECE0] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#168C82]">→</span>
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`tel:${RESTAURANT_PHONE}`}
                className="w-full text-center py-2 text-xs text-[#65736F] hover:text-[#18312E] flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#168C82]" />
                <span>Call Restaurant: {RESTAURANT_PHONE}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
