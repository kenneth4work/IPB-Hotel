import { useEffect, useState } from 'react';

// Animasi pembuka hanya diputar sekali, saat website pertama dibuka.
// Kembali ke beranda dari halaman lain tidak memutarnya lagi.
let introPlayed = false;

export function useIntroAnimation(): boolean {
  const [play] = useState(() => !introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);
  return play;
}
