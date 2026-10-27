import {useEffect, useState} from 'react';
import {bookingRequest, type BookingSelection, type BookingQuote} from '../lib/bookingApi';

export function useReservationQuote(selection: BookingSelection, enabled: boolean) {
  const key = JSON.stringify(selection);
  const [revision, setRevision] = useState(0);
  const [result, setResult] = useState<{key: string; revision: number; quote?: BookingQuote; error?: unknown} | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      bookingRequest<{quote: BookingQuote}>('/booking/quote', JSON.parse(key), controller.signal)
        .then(({quote}) => { if (!controller.signal.aborted) setResult({key, revision, quote}); })
        .catch(error => {
          if (!controller.signal.aborted) setResult({key, revision, error});
        });
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [key, revision, enabled]);
  const current = result?.key === key && result.revision === revision ? result : null;
  return {
    quote: current?.quote ?? null,
    error: current?.error,
    loading: enabled && !current,
    refresh: () => setRevision(value => value + 1),
  };
}
