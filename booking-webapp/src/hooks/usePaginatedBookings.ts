import { bookingService } from "@/api";
import { Booking, BookingFilter, Page, Pageable } from "@/interfaces/Booking";
import { useEffect, useState } from "react";

// export type CustomEventInput = EventInput & {
//     userId?: string;
//     locked: boolean;
// };

export const usePaginatedBookings = (complexId: string) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [pageable, setPageable] = useState<Pageable>();
    const [filter, setFilter] = useState<BookingFilter>();

    const fetchBooking = async () => {
        try {
            if (!complexId) return;
            const bookingRes = await bookingService.getAll({ ...filter, complexId });

            if (!bookingRes) return;

            setBookings(bookingRes.content);
            setPageable(bookingRes.pageable);
            // setFilter

            // const eventTemp: CustomEventInput[] = bookingRes.content.map((booking) => {
            //     return {
            //         locked: true,
            //         start: new Date(`${booking.startDate}T${booking.startTime}`),
            //         end: new Date(`${booking.startDate}T${booking.endTime}`),
            //         title: booking.court.name,
            //         id: booking.id,
            //     };
            // });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [filter]);

    return {
        bookings,
        setBookings,
        pageable,
        filter,
        setFilter,
    };
};
