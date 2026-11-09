import { useEffect } from 'react';

/*
 * Animasi muncul saat di-scroll: elemen naik & memudar masuk seperti animasi pembuka hero.
 *
 * Elemen ditandai lewat atribut data-reveal ("pending" -> "shown"), bukan class, supaya
 * tidak terhapus ketika React memperbarui className komponen. Elemen yang baru muncul
 * (ganti halaman, data selesai dimuat) ikut ditandai lewat MutationObserver.
 */

// Setiap elemen hasil selector dianimasikan sebagai satu kesatuan.
// Elemen bersaudara yang cocok muncul bergantian (lihat STAGGER_MS).
const REVEAL_TARGETS = [
  // Beranda: blok judul & isi tiap section
  '#tentang > div:not([aria-hidden]) > .grid > *',
  '#kamar > div > :not(.grid)',
  '#kamar > div > .grid > *',
  '#galeri > div > *',
  '#lokasi > div > *',
  '#ulasan > div > *',
  '#faq > div > *',
  // Halaman reservasi
  '#reservasi > div > :not(form)',
  '#reservasi form > div:first-child > *',
  '#reservasi form > div:last-child',
  // Footer: tiga kolom atas
  'footer > div > div:first-child > *',
].join(', ');

const STAGGER_MS = 110;
const MAX_STAGGER_STEPS = 5;

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.reveal = 'shown';
          observer.unobserve(el);
        }
      },
      // Mulai saat bagian atas elemen melewati ~90% tinggi layar
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );

    // Elemen yang diamati oleh efek INI. Jangan pakai atribut data-reveal sebagai penanda:
    // saat efek dijalankan ulang (StrictMode/HMR) observer lama sudah diputus, sehingga
    // elemen berstatus "pending" harus diamati lagi atau akan tersembunyi selamanya.
    const tracked = new WeakSet<HTMLElement>();

    const scan = () => {
      const fresh = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_TARGETS)).filter(
        (el) => el.dataset.reveal !== 'shown' && !tracked.has(el),
      );
      for (const el of fresh) {
        // Urutan di antara saudara yang juga ditandai -> jeda bertingkat
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((c) => fresh.includes(c as HTMLElement))
          : [el];
        const step = Math.min(siblings.indexOf(el), MAX_STAGGER_STEPS);
        el.style.setProperty('--reveal-delay', `${Math.max(step, 0) * STAGGER_MS}ms`);
        el.dataset.reveal = 'pending';
        tracked.add(el);
        observer.observe(el);
      }
    };

    let frame = 0;
    const scheduleScan = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    };

    // Pengaman: bila observer gagal melapor, elemen yang sudah terlihat/terlewati di layar
    // tetap dimunculkan. Konten tidak boleh tersembunyi hanya karena animasinya gagal.
    let failsafeFrame = 0;
    const revealPassed = () => {
      cancelAnimationFrame(failsafeFrame);
      failsafeFrame = requestAnimationFrame(() => {
        const bottom = window.innerHeight;
        document.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((el) => {
          if (el.getBoundingClientRect().top < bottom) {
            el.dataset.reveal = 'shown';
            observer.unobserve(el);
          }
        });
      });
    };
    const failsafeTimer = window.setTimeout(revealPassed, 1500);
    window.addEventListener('scroll', revealPassed, { passive: true });
    window.addEventListener('resize', revealPassed, { passive: true });

    scan();
    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(failsafeFrame);
      window.clearTimeout(failsafeTimer);
      window.removeEventListener('scroll', revealPassed);
      window.removeEventListener('resize', revealPassed);
      mutations.disconnect();
      observer.disconnect();
      // Kembalikan DOM seperti semula: tanpa observer, elemen "pending" akan tersembunyi
      // selamanya. Efek berikutnya (StrictMode/HMR/remount) akan menandainya lagi.
      document.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((el) => {
        delete el.dataset.reveal;
        el.style.removeProperty('--reveal-delay');
      });
    };
  }, []);

  return null;
}
