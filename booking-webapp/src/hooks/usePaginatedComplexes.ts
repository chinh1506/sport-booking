import { bookingService } from "@/api";
import { Booking, BookingFilter, CreateBookingRequest } from "@/interfaces/Booking";
import { Complex, ComplexFilter } from "@/interfaces/Complex";
import { Pageable } from "@/interfaces/Page";
import { useEffect, useState } from "react";

// export type CustomEventInput = EventInput & {
//     userId?: string;
//     locked: boolean;
// };

export const usePaginatedComplexes = (complexId: string) => {
    const [complexes, setComplexes] = useState<Complex[]>([]);
    const [pageable, setPageable] = useState<Pageable>();
    const [filter, setFilter] = useState<ComplexFilter>({});

    const fetchBooking = async () => {
        try {
            const bookingRes = await bookingService.getAll({ ...filter, complexId });
            if (!bookingRes) return;
            // setBookings(bookingRes.content);
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
            // setBookings((prevBookings) => [...prevBookings, bookingRes]);
 
        } catch (error) {
            console.error(error);
        }
    }

    return {
        pageable,
        filter,
        setFilter,
        bookingCourt
    };
};
