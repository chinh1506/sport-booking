"use client";
import { courtService } from "@/api";
import BookingModal from "@/components/BookingModal";
import BookingTable from "@/components/BookingTable";
import { useCourtPrice } from "@/hooks/useCourtPrice";
import { usePaginatedBookings } from "@/hooks/usePaginatedBookings";
import { CreateBookingRequest, UserSelected } from "@/interfaces/Booking";
import { Court } from "@/interfaces/Court";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function BookingPage() {

    const [courts, setCourts] = useState<Court[]>([]);
    const [activeBooking, setActiveBooking] = useState<CreateBookingRequest>();
    // const [selectedCourtId, setSelectedCourtId]= useState()
    const param = useParams();
    const complexId: string = param.complexId as string;

    const { filter, setFilter, bookings , bookingCourt}= usePaginatedBookings(complexId);
    const { courtPrices } = useCourtPrice(complexId);

    const fetchCourt = async () => {
        if (complexId) {
            const courtsRes = await courtService.getCourtsByComplexId(complexId);
            if (courtsRes && courtsRes.length > 0) {
                courtsRes && setCourts(courtsRes);
            }
        }
    };

    useEffect(() => {
        fetchCourt();
    }, []);

    return (
        <>
       
            <BookingTable courtPrices={courtPrices} courts={courts} bookings={bookings} filter={filter} setFilter={setFilter} bookingFunction={bookingCourt}></BookingTable>
        </>
    );
}

export default BookingPage;
