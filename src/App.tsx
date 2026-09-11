import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomShowcase } from './components/RoomShowcase';
import { HotelGallery } from './components/HotelGallery';
import { StrategicLocation } from './components/StrategicLocation';
import { GuestReviews } from './components/GuestReviews';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { ContactAndInquiry } from './components/ContactAndInquiry';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-[#C5A880]/30 selection:text-slate-900 font-sans">
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with Hotel Intro & Key Highlights */}
          <HeroSection />

          {/* Section A: Header & Room Showcase Section (4-Column Luxury Grid) */}
          <RoomShowcase />

          {/* Section B: Hotel Gallery Grid ("Potret Keindahan Hotel Kami") */}
          <HotelGallery />

          {/* Section C: Strategic Location & Interactive Map Section */}
          <StrategicLocation />

          {/* Section D: Verified Guest Reviews ("Apa Kata Tamu Kami") */}
          <GuestReviews />

          {/* Section E: High-Conversion Luxury Banner ("Penawaran Spesial") */}
          <SpecialOfferBanner />

          {/* Section F: Contact & Quick Inquiry Form ("Kami Siap Membantu Anda") */}
          <ContactAndInquiry />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
