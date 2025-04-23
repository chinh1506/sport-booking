import { bookingService } from "@/api";
import { Booking, BookingFilter, Page, Pageable } from "@/interfaces/Booking";
import { EventInput } from "@fullcalendar/core/index.js";
import { useEffect, useState } from "react";

export type CustomEventInput = EventInput & {
    userId?: string;
    locked: boolean;
};

export const usePaginatedBookings = () => {
    const [events, setEvents] = useState<CustomEventInput[]>([]);
    const [booings, setBookings] = useState<Booking[]>([]);
    const [pageable, setPageable] = useState<Pageable>();
    const [filter, setFilter] = useState<BookingFilter>();

    const fetchBooking = async () => {
        try {
            const bookingRes = await bookingService.getAll(filter);

            if (!bookingRes) return;

            setBookings(bookingRes.content);
            setPageable(bookingRes.pageable);
            // setFilter

            const eventTemp: CustomEventInput[] = bookingRes.content.map((booking) => {
                return {
                    locked: true,
                    start: new Date(`${booking.startDate}T${booking.startTime}`),
                    end: new Date(`${booking.startDate}T${booking.endTime}`),
                    title: booking.status,
                    id: booking.id,
                };
            });
            setEvents(eventTemp);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [filter]);

    return {
        events,
        setEvents,
        booings,
        setBookings,
        pageable,
        filter,
        setFilter,
    };
};
