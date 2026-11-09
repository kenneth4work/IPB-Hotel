import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { SocialPlatform } from '../types';
import { useLanguage } from '../context/LanguageContext';

// TikTok dan X tidak tersedia di lucide-react, jadi digambar sebagai SVG sendiri.
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const PLATFORMS: Record<SocialPlatform, { name: string; bg: string; icon: React.ReactNode }> = {
  instagram: {
    name: 'Instagram',
    bg: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
    icon: <Instagram className="w-5 h-5" strokeWidth={2.2} />,
  },
  facebook: {
    name: 'Facebook',
    bg: 'bg-[#1877F2]',
    icon: <Facebook className="w-5 h-5" fill="currentColor" strokeWidth={0} />,
  },
  youtube: {
    name: 'YouTube',
    bg: 'bg-[#FF0000]',
    icon: <Youtube className="w-5 h-5" strokeWidth={2.2} />,
  },
  tiktok: {
    name: 'TikTok',
    bg: 'bg-black',
    icon: <TikTokIcon className="w-[18px] h-[18px]" />,
  },
  x: {
    name: 'X',
    bg: 'bg-black',
    icon: <XIcon className="w-4 h-4" />,
  },
  linkedin: {
    name: 'LinkedIn',
    bg: 'bg-[#0A66C2]',
    icon: <Linkedin className="w-[18px] h-[18px]" fill="currentColor" strokeWidth={0} />,
  },
};

export const SocialLinks: React.FC = () => {
  const { language } = useLanguage();
  const links = HOTEL_CONFIG.socials.filter((s) => s.url.trim() !== '');
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {links.map(({ platform, url }) => {
        const meta = PLATFORMS[platform];
        const label = language === 'en'
          ? `${HOTEL_CONFIG.name} on ${meta.name} (opens in a new tab)`
          : `${HOTEL_CONFIG.name} di ${meta.name} (membuka tab baru)`;
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={meta.name}
              className={`${meta.bg} w-11 h-11 rounded-full text-white flex items-center justify-center ring-1 ring-white/15 shadow-md transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5`}
            >
              {meta.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
