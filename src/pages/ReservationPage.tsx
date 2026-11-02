import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReservationFormSection } from "../components/ReservationFormSection";
import { useLanguage } from "../context/LanguageContext";

export default function ReservationPage() {
    const { language } = useLanguage();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Tombol Kembali ke Beranda */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm font-semibold text-[#1E3A2B] hover:bg-[#1E3A2B] hover:text-white transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 text-[#C5A880] transition-transform group-hover:-translate-x-0.5" />
                    <span>
                        {language === "en"
                            ? "Back to Home"
                            : "Kembali ke Beranda"}
                    </span>
                </Link>
            </div>

            {/* Section Formulir Reservasi Kamar Lengkap */}
            <ReservationFormSection />
        </div>
    );
}
