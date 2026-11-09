// Standalone demo: answers the Laravel booking endpoints in the browser.
// Rates mirror database/seeders/RoomTypeSeeder.php.
const ROOM_TYPES = [
  {id: 1, slug: 'standard', name: 'Standard Room', size_sqm: 19, max_guests: 2, base_price: 600000, breakfast_price: 75000, bed_types: ['queen', 'twin']},
  {id: 2, slug: 'superior', name: 'Superior Room', size_sqm: 20, max_guests: 2, base_price: 700000, breakfast_price: 75000, bed_types: ['queen', 'twin']},
  {id: 3, slug: 'deluxe', name: 'Deluxe Room', size_sqm: 22, max_guests: 2, base_price: 850000, breakfast_price: 75000, bed_types: ['queen']},
  {id: 4, slug: 'executive', name: 'Executive Room', size_sqm: 24, max_guests: 2, base_price: 900000, breakfast_price: 75000, bed_types: ['king']},
  {id: 5, slug: 'grand-executive', name: 'Grand Executive Room', size_sqm: 28, max_guests: 2, base_price: 1050000, breakfast_price: 75000, bed_types: ['king']},
  {id: 6, slug: 'suite', name: 'Executive Suite Room', size_sqm: 36, max_guests: 3, base_price: 1500000, breakfast_price: 75000, bed_types: ['king']},
];
const ROOMS_PER_TYPE = 10;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {status, headers: {'Content-Type': 'application/json'}});
const invalid = (field: string, message: string) => json({errors: {[field]: [message]}}, 422);
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function quote(d: any) {
  const room = ROOM_TYPES.find(r => r.id === Number(d.room_type_id));
  if (!room) return {error: invalid('room_type_id', 'Tipe kamar tidak tersedia.')};
  if (!d.check_in || d.check_in < today()) return {error: invalid('check_in', 'Tanggal check-in tidak valid.')};
  if (!d.check_out || d.check_out <= d.check_in) return {error: invalid('check_out', 'Tanggal check-out harus setelah check-in.')};
  if (!room.bed_types.includes(d.bed_type)) return {error: invalid('bed_type', 'Pilihan kasur tidak tersedia untuk tipe kamar ini.')};
  if (d.guest_count > d.room_count * room.max_guests) return {error: invalid('guest_count', 'Jumlah tamu melebihi kapasitas kamar.')};
  const nights = Math.round((Date.parse(d.check_out) - Date.parse(d.check_in)) / 86400000);
  const roomTotal = room.base_price * d.room_count * nights;
  const breakfastTotal = d.with_breakfast ? room.breakfast_price * d.guest_count * nights : 0;
  return {room, q: {
    can_book: ROOMS_PER_TYPE >= d.room_count, available_rooms: ROOMS_PER_TYPE, night_count: nights,
    room_total: roomTotal, breakfast_total: breakfastTotal, discount_amount: 0,
    total_amount: roomTotal + breakfastTotal, promo_code: null, currency: 'IDR',
  }};
}

const realFetch = window.fetch.bind(window);
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const path = url.replace(/^[a-z]+:\/\/[^/]*/i, '').split('?')[0];
  const body = init?.body ? JSON.parse(String(init.body)) : undefined;
  await new Promise(r => setTimeout(r, 250));

  if (path === '/booking/room-types') return json({room_types: [...ROOM_TYPES].sort((a, b) => b.base_price - a.base_price), payment: {enabled: false}});
  if (path === '/booking/quote') { const r = quote(body); return r.error ?? json({quote: r.q}); }
  if (path === '/reservations') {
    const r = quote(body);
    if (r.error) return r.error;
    if (!body.terms_accepted) return invalid('terms_accepted', 'Syarat & Ketentuan dan Kebijakan Refund harus disetujui.');
    const code = 'IPB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    return json({reservation: {
      booking_code: code, status: 'pending', room_name: r.room!.name,
      guest_name: body.guest_name, guest_email: body.guest_email, guest_phone: body.guest_phone,
      check_in: body.check_in, check_out: body.check_out, night_count: r.q!.night_count,
      room_count: body.room_count, guest_count: body.guest_count, bed_type: body.bed_type,
      with_breakfast: body.with_breakfast, special_request: body.special_request ?? null,
      promo_code: r.q!.promo_code, room_total: r.q!.room_total, breakfast_total: r.q!.breakfast_total,
      discount_amount: r.q!.discount_amount, total_amount: r.q!.total_amount, currency: 'IDR',
      hold_expires_at: new Date(Date.now() + 30 * 60000).toISOString(),
    }}, 201);
  }
  return realFetch(input, init);
};
