import {useEffect, useState} from 'react';
import {bookingRequest, type BookingSelection, type BookingQuote} from '../lib/bookingApi';

// selection null = tamu belum melengkapi pilihan kamar, kasur, dan sarapan; harga tidak diminta
export function useReservationQuote(selection: BookingSelection | null, enabled: boolean) {
  const key = selection ? JSON.stringify(selection) : '';
  const active = enabled && key !== '';
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{key: string; revision: number; quote?: BookingQuote; error?: unknown} | null>(null);
  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      bookingRequest<{quote: BookingQuote}>('/booking/quote', JSON.parse(key), controller.signal)
        .then(({quote}) => { if (!controller.signal.aborted) setResult({key, revision, quote}); })
        .catch(error => {
          if (!controller.signal.aborted) setResult({key, revision, error});
        });
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [key, revision, active]);
  const current = result?.key === key && result.revision === revision ? result : null;
  return {
    quote: current?.quote ?? null,
    error: current?.error,
    loading: active && !current,
    refresh: () => setRevision(value => value + 1),
  };
}
