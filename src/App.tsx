import React, { useEffect, useRef } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { BookingProvider } from "./context/BookingContext";
import { ConsentProvider } from "./context/ConsentContext";
import { CookieConsent } from "./components/CookieConsent";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutHotel } from "./components/AboutHotel";
import { RoomShowcase } from "./components/RoomShowcase";
import { HotelGallery } from "./components/HotelGallery";
import { StrategicLocation } from "./components/StrategicLocation";
import { GuestReviews } from "./components/GuestReviews";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import ReservationPage from "./pages/ReservationPage";
import LegalPage from "./pages/LegalPage";
import { LEGAL_ROUTES } from "./data/legalContent";

function ScrollToHash() {
    const { pathname, hash } = useLocation();
    const previousPathname = useRef(pathname);

    // Pindahkan fokus ke konten utama setelah berganti halaman
    useEffect(() => {
        if (previousPathname.current !== pathname) {
            previousPathname.current = pathname;
            document
                .getElementById("main-content")
                ?.focus({ preventScroll: true });
        }
    }, [pathname]);

    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const timer = setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 50);
            return () => clearTimeout(timer);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [pathname, hash]);

    return null;
}

// Komponen untuk Halaman Utama (Landing Page Tanpa Formulir Reservasi)
function HomePage() {
    return (
        <>
            <HeroSection />
            <AboutHotel />
            <RoomShowcase />
            <HotelGallery />
            <StrategicLocation />
            <GuestReviews />
            <FaqSection />
        </>
    );
}

function SkipLink() {
    const { language } = useLanguage();

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-white focus:text-[#1E3A2B] focus:font-bold focus:shadow-lg"
        >
            {language === "en" ? "Skip to main content" : "Langsung ke konten utama"}
        </a>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <ConsentProvider>
                <BookingProvider>
                    <Router>
                        <ScrollToHash />
                        <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-[#C5A880]/30 selection:text-slate-900 font-sans">
                            <SkipLink />
                            <CookieConsent />

                            {/* Sticky Header Navigation */}
                            <Navbar />

                            {/* Main Content dengan Router */}
                            <main id="main-content" tabIndex={-1} className="flex-1 outline-hidden">
                                <Routes>
                                    {/* Halaman Beranda Utama */}
                                    <Route path="/" element={<HomePage />} />

                                    {/* Halaman Khusus Formulir Reservasi */}
                                    <Route
                                        path="/reservasi"
                                        element={<ReservationPage />}
                                    />

                                    {/* Halaman Legal */}
                                    <Route
                                        path={LEGAL_ROUTES.privacy}
                                        element={<LegalPage page="privacy" />}
                                    />
                                    <Route
                                        path={LEGAL_ROUTES.terms}
                                        element={<LegalPage page="terms" />}
                                    />
                                    <Route
                                        path={LEGAL_ROUTES.refund}
                                        element={<LegalPage page="refund" />}
                                    />
                                    <Route
                                        path={LEGAL_ROUTES.cookies}
                                        element={<LegalPage page="cookies" />}
                                    />
                                </Routes>
                            </main>

                            {/* Footer */}
                            <Footer />
                        </div>
                    </Router>
                </BookingProvider>
            </ConsentProvider>
        </LanguageProvider>
    );
}
