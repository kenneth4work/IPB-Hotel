import React, { createContext, useContext, useState, useMemo } from 'react';

interface BookingContextType {
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  roomCount: number;
  selectedRoomId: string;
  totalNights: number;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuestCount: (count: number) => void;
  setRoomCount: (count: number) => void;
  setSelectedRoomId: (roomId: string) => void;
  scrollToReservation: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const formatIsoDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getTomorrow = (baseDateStr?: string): string => {
  const base = baseDateStr ? new Date(baseDateStr) : new Date();
  base.setDate(base.getDate() + 1);
  return formatIsoDate(base);
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const todayStr = useMemo(() => formatIsoDate(new Date()), []);
  const tomorrowStr = useMemo(() => getTomorrow(todayStr), [todayStr]);

  const [checkInDate, setCheckInDateState] = useState<string>(todayStr);
  const [checkOutDate, setCheckOutDateState] = useState<string>(tomorrowStr);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [roomCount, setRoomCount] = useState<number>(1);
  // Kosong sampai tamu memilih kamar sendiri
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  // Set Check-in with auto adjust on Check-out if invalid
  const setCheckInDate = (newCheckIn: string) => {
    setCheckInDateState(newCheckIn);
    if (new Date(checkOutDate) <= new Date(newCheckIn)) {
      setCheckOutDateState(getTomorrow(newCheckIn));
    }
  };

  const setCheckOutDate = (newCheckOut: string) => {
    if (new Date(newCheckOut) > new Date(checkInDate)) {
      setCheckOutDateState(newCheckOut);
    }
  };

  // Compute total nights
  const totalNights = useMemo(() => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  const scrollToReservation = () => {
    const element = document.getElementById('reservasi');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <BookingContext.Provider
      value={{
        checkInDate,
        checkOutDate,
        guestCount,
        roomCount,
        selectedRoomId,
        totalNights,
        setCheckInDate,
        setCheckOutDate,
        setGuestCount,
        setRoomCount,
        setSelectedRoomId,
        scrollToReservation,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
