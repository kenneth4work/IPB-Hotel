import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LEGAL_DRAFT, LEGAL_PAGES, LEGAL_UI, type LegalPageId } from '../data/legalContent';

// Teks {{...}} adalah data yang belum dikonfirmasi; ditandai agar tidak terlewat.
const LegalText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\{\{.*?\}\})/).map((part, index) =>
      part.startsWith('{{') ? (
        <mark key={index} className="bg-amber-100 text-amber-900 rounded px-1 font-semibold">
          [{part.slice(2, -2)}]
        </mark>
      ) : (
        part
      ),
    )}
  </>
);

export default function LegalPage({ page }: { page: LegalPageId }) {
  const { language } = useLanguage();
  const ui = LEGAL_UI[language];
  const document = LEGAL_PAGES[language][page];

  return (
    <div className="bg-[#FDFBF7] pt-28 sm:pt-32 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E3A2B] hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight mb-2">{document.title}</h1>
        <p className="text-sm text-slate-600 mb-6">
          {ui.lastUpdated} <LegalText text={ui.lastUpdatedValue} />
        </p>

        {LEGAL_DRAFT && (
          <p className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 mb-8">
            <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{ui.draftNotice}</span>
          </p>
        )}

        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{section.heading}</h2>
              {section.bullets && (
                <ul className="list-disc pl-5 space-y-1.5">
                  {section.bullets.map((item) => (
                    <li key={item}><LegalText text={item} /></li>
                  ))}
                </ul>
              )}
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={section.bullets ? 'mt-3' : ''}><LegalText text={paragraph} /></p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
