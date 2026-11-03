@extends('payments.layout')

@php
    use App\Enums\PaymentStatus;
    use App\Enums\ReservationStatus;

    // Status ditentukan dari data webhook di database, bukan dari parameter URL redirect provider.
    $confirmed = $reservation->status === ReservationStatus::Confirmed;
    $paid = $payment->status === PaymentStatus::Paid;
    $waiting = $payment->status === PaymentStatus::Pending;
    $canContinue = $waiting && $payment->checkout_url && $payment->expires_at?->isFuture();
@endphp

@section('title', $confirmed ? 'Reservasi terkonfirmasi' : ($waiting ? 'Menunggu pembayaran' : 'Status pembayaran'))

@section('content')
    @if ($confirmed)
        <span class="badge ok">Lunas</span>
        <h1>Reservasi terkonfirmasi</h1>
        <p>Terima kasih. Pembayaran sudah kami terima dan kamar Anda telah dikunci.</p>
    @elseif ($paid)
        <span class="badge wait">Ditinjau</span>
        <h1>Pembayaran diterima</h1>
        <p>Pembayaran masuk setelah masa tahan kamar berakhir. Tim kami akan menghubungi Anda untuk konfirmasi kamar atau pengembalian dana.</p>
    @elseif ($waiting)
        <span class="badge wait">Menunggu</span>
        <h1>Menunggu konfirmasi pembayaran</h1>
        <p>Jika Anda baru saja membayar, konfirmasi dari penyedia pembayaran biasanya masuk dalam beberapa detik.</p>
    @else
        <span class="badge bad">Tidak selesai</span>
        <h1>Pembayaran tidak selesai</h1>
        <p>Tagihan ini sudah kedaluwarsa atau gagal, dan kamar tidak lagi ditahan. Silakan buat reservasi baru.</p>
    @endif

    @include('payments._summary')

    <div class="actions">
        @if ($canContinue)
            <a class="btn primary" href="{{ $payment->checkout_url }}">Lanjutkan pembayaran</a>
        @endif
        @if ($waiting)
            <a class="btn secondary" href="{{ route('payments.finish', $payment->reference) }}">Muat ulang status</a>
        @endif
        <a class="btn secondary" href="{{ route('home') }}">Kembali ke beranda</a>
    </div>
@endsection
