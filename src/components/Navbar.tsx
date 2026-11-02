import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import brandLogoImg from "../assets/images/regenerated_image_1789095966156.png";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
    onSelectRoomBooking?: (roomType: string) => void;
}

const FlagID: React.FC<{ className?: string }> = ({
    className = "w-4 h-4",
}) => (
    <svg
        viewBox="0 0 24 24"
        className={`${className} rounded-full shadow-2xs ring-1 ring-slate-900/10 shrink-0`}
        aria-hidden="true"
    >
        <clipPath id="flag-id-clip">
            <circle cx="12" cy="12" r="12" />
        </clipPath>
        <g clipPath="url(#flag-id-clip)">
            <rect width="24" height="12" y="0" fill="#E70011" />
            <rect width="24" height="12" y="12" fill="#FFFFFF" />
        </g>
    </svg>
);

const FlagUK: React.FC<{ className?: string }> = ({
    className = "w-4 h-4",
}) => (
    <svg
        viewBox="0 0 24 24"
        className={`${className} rounded-full shadow-2xs ring-1 ring-slate-900/10 shrink-0`}
        aria-hidden="true"
    >
        <clipPath id="flag-uk-clip">
            <circle cx="12" cy="12" r="12" />
        </clipPath>
        <g clipPath="url(#flag-uk-clip)">
            <rect width="24" height="24" fill="#012169" />
            <path
                d="M0,0 L24,24 M24,0 L0,24"
                stroke="#FFFFFF"
                strokeWidth="4.5"
            />
            <path
                d="M0,0 L24,24 M24,0 L0,24"
                stroke="#C8102E"
                strokeWidth="2.2"
            />
            <path
                d="M12,0 L12,24 M0,12 L24,12"
                stroke="#FFFFFF"
                strokeWidth="6.5"
            />
            <path
                d="M12,0 L12,24 M0,12 L24,12"
                stroke="#C8102E"
                strokeWidth="3.8"
            />
        </g>
    </svg>
);

export const Navbar: React.FC<NavbarProps> = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, toggleLanguage, isSwitchingLang, t } = useLanguage();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        {
            label: language === "en" ? "Reservation" : "Reservasi",
            href: "/reservasi",
        },
        { label: t.navbar.gallery, href: "/#galeri" },
        { label: t.navbar.reviews, href: "/#ulasan" },
        { label: "FAQ", href: "/#faq" },
    ];

    return (
        <header
            id="main-navigation"
            className={`fixed inset-x-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none ${
                isScrolled ? "top-3 sm:top-4" : "top-4 sm:top-6"
            }`}
        >
            <div className="max-w-6xl mx-auto pointer-events-auto">
                {/* Floating Pill Container */}
                <nav
                    aria-label="Primary Navigation"
                    className={`rounded-full transition-all duration-300 px-4 sm:px-6 lg:px-7 py-2 sm:py-2.5 border ${
                        isScrolled
                            ? "bg-white/92 backdrop-blur-xl border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.12)]"
                            : "bg-white/85 backdrop-blur-lg border-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                    }`}
                >
                    <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-4">
                        {/* Left: Brand Logo */}
                        <div className="flex items-center justify-start">
                            <Link
                                to="/"
                                id="brand-logo-link"
                                className="group inline-flex items-center gap-3 shrink-0 focus:outline-none"
                                title="IPB Convention Hotel"
                            >
                                <div
                                    id="brand-emblem-container"
                                    className="h-11 sm:h-13 md:h-14 w-auto max-w-[190px] sm:max-w-[230px] md:max-w-[250px] -my-1 flex items-center justify-start shrink-0 overflow-visible"
                                >
                                    <img
                                        id="brand-emblem-picture"
                                        src={brandLogoImg}
                                        alt="IPB Convention Hotel"
                                        className="h-full w-auto max-w-full object-contain object-left scale-115 sm:scale-125 origin-left mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.28]"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/images/logo-emblem.svg";
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Center: Navigation Links */}
                        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
                            {navLinks.map((link) => {
                                const isActive =
                                    link.href === "/reservasi"
                                        ? location.pathname === "/reservasi"
                                        : location.pathname === "/" &&
                                          location.hash ===
                                              link.href.replace("/", "");

                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
                                            isActive
                                                ? "text-[#1E3A2B] bg-slate-900/6 font-semibold"
                                                : "text-slate-600 hover:text-slate-950 hover:bg-slate-900/5"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right: Flag Language Switcher & Pill CTA Button */}
                        <div className="hidden sm:flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
                            {/* Flag Language Switcher Pill with Soft Light Animation */}
                            <button
                                id="nav-lang-toggle-button"
                                type="button"
                                onClick={toggleLanguage}
                                className={`relative p-1 rounded-full border transition-all duration-500 inline-flex items-center cursor-pointer overflow-hidden group before:content-[''] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent ${
                                    isSwitchingLang
                                        ? "border-[#C5A880] bg-[#FDFBF7] shadow-[0_0_24px_rgba(197,168,128,0.55)] scale-[1.03]"
                                        : "border-slate-200/90 bg-slate-100/80 hover:bg-[#FDFBF7] hover:border-[#C5A880]/60 hover:shadow-[0_0_18px_rgba(197,168,128,0.3)]"
                                }`}
                                title={t.navbar.switchLang}
                                aria-label={
                                    language === "en"
                                        ? "Switch Language (ID / EN)"
                                        : "Ganti Bahasa (ID / EN)"
                                }
                            >
                                <div className="relative grid grid-cols-2 items-center rounded-full p-0.5">
                                    {/* Sliding Soft-Light Pill Indicator */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-[0_2px_10px_rgba(197,168,128,0.45)] ring-1 ring-[#C5A880]/40 transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            language === "en"
                                                ? "translate-x-full left-0.5"
                                                : "translate-x-0 left-0.5"
                                        }`}
                                    />
                                    <span
                                        className={`relative z-10 px-2 py-1 inline-flex items-center justify-center transition-all duration-300 ${
                                            language === "id"
                                                ? "scale-110 opacity-100"
                                                : "opacity-55 group-hover:opacity-85"
                                        }`}
                                    >
                                        <FlagID className="w-4.5 h-4.5" />
                                    </span>
                                    <span
                                        className={`relative z-10 px-2 py-1 inline-flex items-center justify-center transition-all duration-300 ${
                                            language === "en"
                                                ? "scale-110 opacity-100"
                                                : "opacity-55 group-hover:opacity-85"
                                        }`}
                                    >
                                        <FlagUK className="w-4.5 h-4.5" />
                                    </span>
                                </div>
                            </button>

                            {/* Primary Action Button (Pill-shaped, Pine Green Background like Cek Ketersediaan, White Text, Single Line) */}
                            <Link
                                id="nav-book-now-button"
                                to="/reservasi"
                                className="px-5 sm:px-6 py-2.5 bg-[#1E3A2B] hover:bg-[#15291E] text-white text-xs sm:text-[13px] font-semibold tracking-wide rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
                            >
                                <span className="whitespace-nowrap">{t.navbar.bookNow}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <div className="flex sm:hidden items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className={`relative p-1.5 rounded-full border inline-flex items-center justify-center transition-all duration-300 overflow-hidden ${
                                    isSwitchingLang
                                        ? "border-[#C5A880] bg-[#FDFBF7] shadow-[0_0_16px_rgba(197,168,128,0.5)]"
                                        : "border-slate-200/80 bg-slate-50/80 text-slate-700"
                                }`}
                                aria-label="Switch Language"
                            >
                                {language === "id" ? (
                                    <FlagID className="w-5 h-5" />
                                ) : (
                                    <FlagUK className="w-5 h-5" />
                                )}
                            </button>

                            <button
                                id="mobile-menu-trigger"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="p-2.5 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors focus:outline-none"
                                aria-label={
                                    language === "en"
                                        ? "Toggle Navigation Menu"
                                        : "Buka Menu Navigasi"
                                }
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Tablet Menu Trigger (sm to lg) */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="hidden sm:inline-flex lg:hidden p-2.5 rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors focus:outline-none ml-1"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile / Tablet Floating Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-2.5 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.15)] p-4 sm:p-5 space-y-3 animate-scale-up">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => {
                                const isActive =
                                    link.href === "/reservasi"
                                        ? location.pathname === "/reservasi"
                                        : location.pathname === "/" &&
                                          location.hash ===
                                              link.href.replace("/", "");

                                return (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-4 py-2.5 rounded-2xl text-sm sm:text-base font-medium transition-colors ${
                                            isActive
                                                ? "bg-slate-900/6 text-[#1E3A2B] font-semibold"
                                                : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-950"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                            <Link
                                to="/reservasi"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-3 px-5 text-center text-xs sm:text-sm font-semibold text-white bg-[#1E3A2B] hover:bg-[#15291E] rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
                            >
                                <span>{t.navbar.bookNow}</span>
                                <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
