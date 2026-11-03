{{-- Ringkasan reservasi tanpa data kontak tamu, karena halaman dapat dibuka siapa pun yang memegang URL-nya. --}}
<dl>
    <dt>Kode booking</dt>
    <dd>{{ $reservation->booking_code }}</dd>
    <dt>Kamar</dt>
    <dd>{{ $reservation->room_type_name }} × {{ $reservation->room_count }}</dd>
    <dt>Menginap</dt>
    <dd>{{ $reservation->check_in->format('d/m/Y') }} – {{ $reservation->check_out->format('d/m/Y') }}</dd>
    <dt>Total</dt>
    <dd>Rp {{ number_format($payment->amount, 0, ',', '.') }}</dd>
</dl>
