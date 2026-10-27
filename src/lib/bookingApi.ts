export class BookingApiError extends Error {
  constructor(public status: number, public errors: Record<string, string[]> = {}) {
    super('Booking request failed');
  }
}

export async function bookingRequest<T>(url: string, data?: unknown, signal?: AbortSignal): Promise<T> {
  const csrf = document.cookie.split('; ').find(cookie => cookie.startsWith('XSRF-TOKEN='))?.slice('XSRF-TOKEN='.length);
  const response = await fetch(url, {
    method: data === undefined ? 'GET' : 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(csrf ? {'X-XSRF-TOKEN': decodeURIComponent(csrf)} : {}),
    },
    body: data === undefined ? undefined : JSON.stringify(data),
    signal,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new BookingApiError(response.status, body.errors);
  }
  return response.json();
}

export interface BookingSelection {
  room_type_id: number;
  check_in: string;
  check_out: string;
  room_count: number;
  guest_count: number;
  bed_type: string;
  with_breakfast: boolean;
  promo_code: string | null;
}

export interface BookingQuote {
  can_book: boolean;
  available_rooms: number;
  night_count: number;
  room_total: number;
  breakfast_total: number;
  discount_amount: number;
  total_amount: number;
  promo_code: string | null;
}

export interface SavedReservation {
  booking_code: string;
  status: string;
  room_name: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  night_count: number;
  room_count: number;
  guest_count: number;
  bed_type: 'king' | 'queen' | 'twin';
  with_breakfast: boolean;
  special_request: string | null;
  promo_code: string | null;
  room_total: number;
  breakfast_total: number;
  discount_amount: number;
  total_amount: number;
  hold_expires_at: string;
}
