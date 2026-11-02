import React from 'react';
import { BusFront, FerrisWheel, MapPinned, Plane, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface LocationItem {
  name: { id: string; en: string } | string;
  distance: string;
}

// Data kategori dan daftar tempat beserta jaraknya dalam Bahasa Indonesia dan Bahasa Inggris
export const locationData = {
  nearbyPlaces: [
    { name: { id: "Institut Pertanian Bogor (IPB)", en: "Bogor Agricultural University" }, distance: "72 m" },
    { name: { id: "IPB International Convention Center", en: "IPB International Convention Center" }, distance: "77 m" },
    { name: { id: "KFC Pajajaran Bogor", en: "Kentucky Fried Chicken Pajajaran Bogor" }, distance: "96 m" },
    { name: { id: "Tugu Kujang", en: "Kujang Monument" }, distance: "105 m" },
    { name: { id: "Pool Bis Wisata Bogor", en: "Pool Bis Wisata Bogor" }, distance: "115 m" },
    { name: { id: "Mall Botani Square", en: "Botani Square Mall" }, distance: "125 m" },
    { name: { id: "Terminal Baranangsiang", en: "Baranangsiang Terminal" }, distance: "292 m" },
    { name: { id: "Masjid Raya Bogor", en: "Masjid Raya Bogor" }, distance: "654 m" },
    { name: { id: "Kebun Raya Bogor", en: "Bogor Botanical Garden" }, distance: "677 m" },
    { name: { id: "Lippo Plaza Keboen Raya", en: "Lippo Plaza Keboen Raya" }, distance: "711 m" },
    { name: { id: "Bogor Yogya Plaza", en: "Bogor Yogya Plaza" }, distance: "731 m" },
    { name: { id: "McDonald's Pajajaran", en: "McDonald's Pajajaran" }, distance: "1.07 km" },
    { name: { id: "Halte Bus Bogor Trade Mall", en: "Halte Bus Bogor Trade Mall" }, distance: "1.12 km" },
    { name: { id: "Bogor Trade Mall", en: "Bogor Trade Mall" }, distance: "1.13 km" },
    { name: { id: "Pasteur Trans Bogor Trade Mall", en: "Pasteur Trans Bogor Trade Mall" }, distance: "1.22 km" },
  ],
  airport: [
    { name: { id: "Bandara Internasional Halim Perdanakusuma", en: "Halim Perdanakusuma International Airport" }, distance: "38.44 km" },
  ],
  transportation: [
    { name: { id: "Stasiun Bogor", en: "Bogor Station" }, distance: "1.87 km" },
    { name: { id: "Terminal Baranangsiang", en: "Baranangsiang Terminal" }, distance: "292 m" },
    { name: { id: "Stasiun Batutulis", en: "Batutulis Station" }, distance: "2.71 km" },
    { name: { id: "Pool Bis Wisata Bogor", en: "Pool Bis Wisata Bogor" }, distance: "115 m" },
    { name: { id: "Halte Bus Bogor Trade Mall", en: "Halte Bus Bogor Trade Mall" }, distance: "1.12 km" },
  ],
  entertainment: [
    { name: { id: "Kebun Raya Bogor", en: "Bogor Botanical Garden" }, distance: "677 m" },
    { name: { id: "Alun-Alun Kota Bogor", en: "Alun-Alun Kota Bogor" }, distance: "1.78 km" },
    { name: { id: "Mall Botani Square", en: "Botani Square Mall" }, distance: "125 m" },
    { name: { id: "Bogor Trade Mall", en: "Bogor Trade Mall" }, distance: "1.13 km" },
    { name: { id: "Taman Sempur", en: "Taman Sempur" }, distance: "1.27 km" },
  ],
  others: [
    { name: { id: "IPB International Convention Center", en: "IPB International Convention Center" }, distance: "77 m" },
    { name: { id: "Institut Pertanian Bogor (IPB)", en: "Bogor Agricultural University" }, distance: "72 m" },
    { name: { id: "Masjid Raya Bogor", en: "Masjid Raya Bogor" }, distance: "654 m" },
    { name: { id: "Kantor Pos Bogor Sukasari", en: "Kantor Pos Bogor Sukasari" }, distance: "2.11 km" },
    { name: { id: "SDN Cikaret 2", en: "SDN Cikaret 2" }, distance: "2.87 km" },
  ]
};

interface LocationGroupProps {
  icon: LucideIcon;
  title: string;
  items: LocationItem[];
  getItemName: (item: LocationItem) => string;
  className?: string;
}

function LocationGroup({ icon: Icon, title, items, getItemName, className = '' }: LocationGroupProps) {
  if (items.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex items-center gap-2.5 mb-3">
        <Icon className="w-5 h-5 text-slate-800 shrink-0" strokeWidth={1.75} />
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
      </div>
      <ul className="space-y-2.5 pl-[30px]">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-start gap-4 text-sm">
            <span className="text-slate-800 leading-snug">{getItemName(item)}</span>
            <span className="text-slate-500 leading-snug whitespace-nowrap shrink-0">{item.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SimpleLocationList() {
  const { language, t } = useLanguage();

  const getItemName = (item: LocationItem): string => {
    if (typeof item.name === 'string') return item.name;
    return language === 'en' ? item.name.en : item.name.id;
  };

  return (
    <div className="w-full bg-white font-sans text-gray-800 rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      {/* Header Bar */}
      <div className="pb-6 mb-6 border-b border-gray-100">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
          {t.location.listTitle}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {t.location.listSubtitle}
        </p>
      </div>

      {/* Grid Layout: kolom pertama memanjang, dua kolom lainnya terbagi dua baris */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-8">
        <LocationGroup
          icon={MapPinned}
          title={t.location.nearbyPlaces}
          items={locationData.nearbyPlaces}
          getItemName={getItemName}
          className="md:row-span-2"
        />
        <LocationGroup
          icon={Plane}
          title={t.location.nearestAirport}
          items={locationData.airport}
          getItemName={getItemName}
        />
        <LocationGroup
          icon={BusFront}
          title={t.location.transportHub}
          items={locationData.transportation}
          getItemName={getItemName}
        />
        <LocationGroup
          icon={FerrisWheel}
          title={t.location.entertainment}
          items={locationData.entertainment}
          getItemName={getItemName}
        />
        <LocationGroup
          icon={Store}
          title={t.location.others}
          items={locationData.others}
          getItemName={getItemName}
        />
      </div>
    </div>
  );
}
