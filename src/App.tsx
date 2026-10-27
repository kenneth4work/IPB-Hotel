import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickAvailabilityBar } from './components/QuickAvailabilityBar';
import { RoomShowcase } from './components/RoomShowcase';
import { ReservationFormSection } from './components/ReservationFormSection';
import { HotelGallery } from './components/HotelGallery';
import { StrategicLocation } from './components/StrategicLocation';
import { GuestReviews } from './components/GuestReviews';
import { ContactAndInquiry } from './components/ContactAndInquiry';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-900 selection:bg-[#C5A880]/30 selection:text-slate-900 font-sans">
          {/* Sticky Header Navigation */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* Hero Section with Hotel Intro & Key Highlights */}
            <HeroSection />

            {/* Quick Room Availability & Best Rates Search Bar (Floating Hero Overlap) */}
            <QuickAvailabilityBar />

            {/* Section A: Header & Room Showcase Section (4-Column Luxury Grid) */}
            <RoomShowcase />

          {/* Section A2: Online Room Reservation Form Feature */}
          <ReservationFormSection />

          {/* Section B: Hotel Gallery Grid ("Potret Keindahan Hotel Kami") */}
          <HotelGallery />

          {/* Section C: Strategic Location & Interactive Map Section */}
          <StrategicLocation />

          {/* Section D: Verified Guest Reviews ("Apa Kata Tamu Kami") */}
          <GuestReviews />

          {/* Section F: Contact & Quick Inquiry ("Kami Siap Membantu Anda") */}
          <ContactAndInquiry />
        </main>

        {/* Footer */}
        <Footer />
      </div>
      </BookingProvider>
    </LanguageProvider>
  );
}
