import { bookingService } from "@/api";
import { Booking, BookingFilter, CreateBookingRequest, Page, Pageable } from "@/interfaces/Booking";
import { useEffect, useState } from "react";

// export type CustomEventInput = EventInput & {
//     userId?: string;
//     locked: boolean;
// };

export const usePaginatedBookings = (complexId: string) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [pageable, setPageable] = useState<Pageable>();
    const [filter, setFilter] = useState<BookingFilter>({});

    const fetchBooking = async () => {
        try {
            if (!complexId || !filter.startDate) return;
            const bookingRes = await bookingService.getAll({ ...filter, complexId });
            if (!bookingRes) return;
            setBookings(bookingRes.content);
            setPageable(bookingRes.pageable);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [filter]);


    const bookingCourt=async (booking:CreateBookingRequest)=>{
        try {
        
            const bookingRes = await bookingService.bookingCourt(booking);
            if(!bookingRes) return;
            setBookings((prevBookings) => [...prevBookings, bookingRes]);
 
        } catch (error) {
            console.error(error);
        }
    }

    return {
        bookings,
        setBookings,
        pageable,
        filter,
        setFilter,
        bookingCourt
    };
};
