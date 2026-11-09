import { useEffect, useState } from 'react';

// true hanya pada kunjungan pertama (website baru dibuka). Navbar memakai ini agar animasinya
// diputar sekali; HeroSection memakainya untuk mengatur jeda (hero sendiri selalu beranimasi).
let introPlayed = false;

export function useIntroAnimation(): boolean {
  const [play] = useState(() => !introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);
  return play;
}
