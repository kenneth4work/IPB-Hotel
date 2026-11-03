@extends('payments.layout')

@section('title', 'Simulator pembayaran')

@section('content')
    <span class="badge wait">Mode pengembangan</span>
    <h1>Simulator pembayaran</h1>
    <p>Halaman ini menggantikan halaman bayar Xendit selama akun belum aktif. Tidak ada uang yang ditarik.</p>

    @include('payments._summary')

    @if ($payment->status === App\Enums\PaymentStatus::Pending)
        <form method="POST" action="{{ url()->current() }}" class="actions">
            @csrf
            <button class="btn primary" type="submit" name="result" value="paid">Simulasikan lunas</button>
            <button class="btn danger" type="submit" name="result" value="expired">Simulasikan kedaluwarsa</button>
        </form>
    @else
        <p class="note">Tagihan ini sudah berstatus {{ $payment->status->value }}.</p>
        <a class="btn secondary" href="{{ route('payments.finish', $payment->reference) }}">Lihat status</a>
    @endif
@endsection
