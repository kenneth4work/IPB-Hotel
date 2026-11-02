import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { BookingProvider } from "./context/BookingContext";
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

function ScrollToHash() {
    const { pathname, hash } = useLocation();

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

export default function App() {
    return (
        <LanguageProvider>
            <BookingProvider>
                <Router>
                    <ScrollToHash />
                    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-[#C5A880]/30 selection:text-slate-900 font-sans">
                        {/* Sticky Header Navigation */}
                        <Navbar />

                        {/* Main Content dengan Router */}
                        <main className="flex-1">
                            <Routes>
                                {/* Halaman Beranda Utama */}
                                <Route path="/" element={<HomePage />} />

                                {/* Halaman Khusus Formulir Reservasi */}
                                <Route
                                    path="/reservasi"
                                    element={<ReservationPage />}
                                />
                            </Routes>
                        </main>

                        {/* Footer */}
                        <Footer />
                    </div>
                </Router>
            </BookingProvider>
        </LanguageProvider>
    );
}
