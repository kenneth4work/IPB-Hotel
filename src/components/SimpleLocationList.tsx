import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface LocationItem {
  name: { id: string; en: string } | string;
  distance: string;
}

// Data kategori dan daftar tempat beserta jaraknya dalam Bahasa Indonesia dan Bahasa Inggris
export const locationData = {
  nearbyPlaces: [
    { name: { id: "Institut Pertanian Bogor (IPB)", en: "Bogor Agricultural University (IPB)" }, distance: "72 m" },
    { name: { id: "IPB International Convention Center", en: "IPB International Convention Center" }, distance: "77 m" },
    { name: { id: "KFC Pajajaran Bogor", en: "Kentucky Fried Chicken Pajajaran Bogor" }, distance: "96 m" },
    { name: { id: "Tugu Kujang", en: "Kujang Monument" }, distance: "105 m" },
    { name: { id: "Pool Bis Wisata Bogor", en: "Bogor Tour Bus Terminal" }, distance: "115 m" },
    { name: { id: "Mall Botani Square", en: "Botani Square Mall" }, distance: "125 m" },
    { name: { id: "Terminal Baranangsiang", en: "Baranangsiang Terminal" }, distance: "292 m" },
    { name: { id: "Masjid Raya Bogor", en: "Bogor Great Mosque" }, distance: "654 m" },
    { name: { id: "Kebun Raya Bogor", en: "Bogor Botanical Garden" }, distance: "677 m" },
    { name: { id: "Lippo Plaza Keboen Raya", en: "Lippo Plaza Keboen Raya" }, distance: "711 m" },
  ],
  transportation: [
    { name: { id: "Bandara Internasional Halim Perdanakusuma", en: "Halim Perdanakusuma International Airport" }, distance: "38.44 km" },
    { name: { id: "Stasiun Bogor", en: "Bogor Railway Station" }, distance: "1.87 km" },
    { name: { id: "Terminal Baranangsiang", en: "Baranangsiang Terminal" }, distance: "292 m" },
    { name: { id: "Stasiun Batutulis", en: "Batutulis Railway Station" }, distance: "2.71 km" },
    { name: { id: "Pool Bis Wisata Bogor", en: "Bogor Tour Bus Terminal" }, distance: "115 m" },
    { name: { id: "Halte Bus Bogor Trade Mall", en: "Bogor Trade Mall Bus Stop" }, distance: "1.12 km" },
  ],
  entertainment: [
    { name: { id: "Kebun Raya Bogor", en: "Bogor Botanical Garden" }, distance: "677 m" },
    { name: { id: "Alun-Alun Kota Bogor", en: "Bogor City Square" }, distance: "1.78 km" },
    { name: { id: "Mall Botani Square", en: "Botani Square Mall" }, distance: "125 m" },
    { name: { id: "Bogor Trade Mall (BTM)", en: "Bogor Trade Mall (BTM)" }, distance: "1.13 km" },
    { name: { id: "Taman Sempur", en: "Sempur Park" }, distance: "1.27 km" },
  ],
  others: [
    { name: { id: "IPB International Convention Center", en: "IPB International Convention Center" }, distance: "77 m" },
    { name: { id: "Institut Pertanian Bogor (IPB)", en: "Bogor Agricultural University (IPB)" }, distance: "72 m" },
    { name: { id: "Masjid Raya Bogor", en: "Bogor Great Mosque" }, distance: "654 m" },
    { name: { id: "Kantor Pos Bogor Sukasari", en: "Bogor Sukasari Post Office" }, distance: "2.11 km" },
    { name: { id: "SDN Cikaret 2", en: "SDN Cikaret 2 Elementary School" }, distance: "2.87 km" },
  ]
};

export default function SimpleLocationList() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const getItemName = (item: LocationItem): string => {
    if (typeof item.name === 'string') return item.name;
    return language === 'en' ? item.name.en : item.name.id;
  };

  const filterItems = (items: LocationItem[]) => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item => {
      const name = getItemName(item).toLowerCase();
      const rawNameId = typeof item.name === 'object' ? item.name.id.toLowerCase() : '';
      const rawNameEn = typeof item.name === 'object' ? item.name.en.toLowerCase() : '';
      const dist = item.distance.toLowerCase();
      return name.includes(term) || rawNameId.includes(term) || rawNameEn.includes(term) || dist.includes(term);
    });
  };

  const filteredNearby = filterItems(locationData.nearbyPlaces);
  const filteredTransport = filterItems(locationData.transportation);
  const filteredEntertainment = filterItems(locationData.entertainment);
  const filteredOthers = filterItems(locationData.others);

  const totalResults = filteredNearby.length + filteredTransport.length + filteredEntertainment.length + filteredOthers.length;

  return (
    <div className="w-full bg-white font-sans text-gray-800 rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
      {/* Search & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#A8865B] uppercase tracking-wider">
              {t.location.whatsAroundTag}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">
              {t.location.areaTag}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            {t.location.listTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.location.listSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.location.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-gray-800 rounded-xl border border-gray-200 focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 outline-hidden transition-all placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer font-medium"
            >
              {t.location.clearSearch}
            </button>
          )}
        </div>
      </div>

      {totalResults === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-gray-500 font-medium">
            {t.location.noResultsText} "{searchTerm}"
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="mt-2 text-xs text-[#1E3A2B] font-bold underline cursor-pointer"
          >
            {t.location.resetSearch}
          </button>
        </div>
      ) : (
        /* Grid Layout untuk membagi beberapa kolom kategori */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Kolom 1: Nearby Places */}
          {filteredNearby.length > 0 && (
            <div className="h-full flex flex-col bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-sm shadow-xs shrink-0">
                    📍
                  </span>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">
                    {t.location.nearbyPlaces}
                  </h4>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60">
                  {filteredNearby.length} {t.location.placesCount}
                </span>
              </div>
              <ul className="space-y-1 flex-1 divide-y divide-slate-100/80">
                {filteredNearby.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center py-2 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
                  >
                    <span className="text-slate-700 group-hover:text-slate-900 font-medium pr-2 text-xs sm:text-[13px] leading-snug">
                      {getItemName(item)}
                    </span>
                    <span className="text-slate-600 font-mono text-xs font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs shrink-0">
                      {item.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kolom 2: Transportation & Entertainment */}
          <div className="flex flex-col gap-6 h-full justify-between">
            {/* Transportation */}
            {filteredTransport.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-sm shadow-xs shrink-0">
                      🚗
                    </span>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {t.location.transportHub}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60">
                    {filteredTransport.length} {t.location.routesCount}
                  </span>
                </div>
                <ul className="space-y-1 divide-y divide-slate-100/80">
                  {filteredTransport.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-center py-2 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
                    >
                      <span className="text-slate-700 group-hover:text-slate-900 font-medium pr-2 text-xs sm:text-[13px] leading-snug">
                        {getItemName(item)}
                      </span>
                      <span className="text-slate-600 font-mono text-xs font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs shrink-0">
                        {item.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Entertainment */}
            {filteredEntertainment.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-sm shadow-xs shrink-0">
                      🎡
                    </span>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {t.location.entertainment}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60">
                    {filteredEntertainment.length} {t.location.attractionsCount}
                  </span>
                </div>
                <ul className="space-y-1 divide-y divide-slate-100/80">
                  {filteredEntertainment.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-center py-2 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
                    >
                      <span className="text-slate-700 group-hover:text-slate-900 font-medium pr-2 text-xs sm:text-[13px] leading-snug">
                        {getItemName(item)}
                      </span>
                      <span className="text-slate-600 font-mono text-xs font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs shrink-0">
                        {item.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kolom 3: Others / Fasilitas Lainnya */}
          {filteredOthers.length > 0 && (
            <div className="h-full flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-sm shadow-xs shrink-0">
                      🏛️
                    </span>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {t.location.publicFacilities}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/60">
                    {filteredOthers.length} {t.location.facilitiesCount}
                  </span>
                </div>
                <ul className="space-y-1 divide-y divide-slate-100/80">
                  {filteredOthers.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-center py-2 px-2 hover:bg-slate-50/80 rounded-lg transition-colors group"
                    >
                      <span className="text-slate-700 group-hover:text-slate-900 font-medium pr-2 text-xs sm:text-[13px] leading-snug">
                        {getItemName(item)}
                      </span>
                      <span className="text-slate-600 font-mono text-xs font-semibold whitespace-nowrap bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs shrink-0">
                        {item.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary highlight to balance height */}
              <div className="mt-6 pt-4 border-t border-slate-100 bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E7D6C1]/60">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-xs mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{t.location.mobilityTitle}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {t.location.mobilityDesc}
                </p>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
