"use client";

import { Booking, BookingDetail, BookingFilter, CreateBookingRequest, SlotInfor, TimeSlot } from "@/interfaces/Booking";
import { Court, CourtPrice } from "@/interfaces/Court";
import { Utils } from "@/Utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal";
import { useLoading } from "../LoadingProvider";

type Props = {
    courts: Court[];
    bookings: Booking[];
    filter: BookingFilter;
    courtPrices: CourtPrice[];
    bookingFunction: (booking: CreateBookingRequest) => void;
    setFilter: React.Dispatch<React.SetStateAction<BookingFilter>>;
};

const BookingTable: React.FC<Props> = ({ courts, bookings, filter, setFilter, courtPrices, bookingFunction }) => {
    const now = moment(new Date()).format("YYYY-MM-DD");
    const [selectedSlots, setSelectedSlots] = useState<Set<SlotInfor>>(new Set<SlotInfor>());
    const [date, setDate] = useState(now);
    const [open, setOpen] = useState(false);
    const { isLoading, setLoading } = useLoading();

    const handleModalCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedSlots(new Set());
        setFilter({ ...filter, startDate: date });
    }, [date]);

    const toggleSlot = (timeSlot: SlotInfor, locked: boolean) => {
        if (locked) return;
        setSelectedSlots((prev) => {
            const newSet = new Set(prev);
            const slotId = timeSlot.slotId; // Sử dụng slotId làm khóa

            if (Array.from(newSet).some((slot) => slot.slotId === slotId)) {
                // Nếu slot đã tồn tại, xóa nó
                return new Set(Array.from(newSet).filter((slot) => slot.slotId !== slotId));
            } else {
                // Nếu slot chưa tồn tại, thêm nó
                newSet.add(timeSlot);
            }

            return newSet;
        });
    };

    const generateHours = () => {
        const hours: string[] = [];
        for (let i = 0; i < 24; i++) {
            hours.push(`${String(i).padStart(2, "0")}:00`);
            hours.push(`${String(i).padStart(2, "0")}:30`);
        }
        return hours;
    };

    const totalMinutes = selectedSlots.size * 30;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalPrice = Array.from(selectedSlots).reduce((total, slot) => {
        // Find the matching court price for the selected slot
        const courtPrice = courtPrices.find(
            (price) =>
                price.court.id === slot.courtId &&
                moment(slot.startTime, "HH:mm").isBetween(
                    moment(price.startTime, "HH:mm"),
                    moment(price.endTime, "HH:mm"),
                    null,
                    "[)"
                )
        );

        // Add the price of the slot to the total (if a matching price is found)
        return total + (courtPrice ? courtPrice.price : 0) / 2;
    }, 0);

    const handleModelOk = () => {
        setLoading(true);
        try {
            const booking: CreateBookingRequest = {
                startDate: date,
                email: "chinhhoang115@gmail.com",
                timeSlots: Array.from(selectedSlots).map((slot) => ({
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    courtId: slot.courtId,
                })),
            };

            setSelectedSlots(new Set());
            bookingFunction(booking);
            setOpen(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const hours = generateHours();

    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6 select-none">
            <BookingModal
                open={open}
                handleCancel={handleModalCancel}
                hanldeOk={handleModelOk}
                object={{
                    startDate: date,
                    email: "chinhhoang115@gmail.com",
                    totalPrice: totalPrice,
                    timeSlots: selectedSlots,
                }}
            ></BookingModal>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-green-700">Đặt lịch ngày trực quan</h1>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                    className="border rounded-lg p-2 text-sm"
                />
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-white border"></div>
                    <span className="text-sm">Trống</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-green-300"></div>
                    <span className="text-sm">Đã chọn</span>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-red-400"></div>
                    <span className="text-sm">Đã đặt</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs md:text-sm">
                    <thead>
                        <tr>
                            <th className="border p-1 md:p-2 text-gray-600 whitespace-nowrap">Sân</th>
                            {hours.map((hour, idx) => (
                                <th key={idx} className="border p-1 md:p-2 whitespace-nowrap">
                                    {hour}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courts.map((court) => {
                            const bkgDetails = bookings.map((bkg) => bkg.bookingDetails).flat(1);
                            const events = bkgDetails.filter((bd) => bd.court?.id === court.id);

                            return (
                                <tr key={court.id}>
                                    <td className="border p-1 md:p-2 text-center font-bold whitespace-nowrap">
                                        {court.name}
                                    </td>
                                    {hours.map((hour) => {
                                        const timeSlot: SlotInfor = {
                                            slotId: `${court.id}_${hour}`,
                                            courtId: court.id,
                                            startTime: hour,
                                            courtName: court.name,
                                            endTime: Utils.addThirtyMinutes(hour),
                                        };
                                        const isSelected = Array.from(selectedSlots).some(
                                            (slot) => slot.slotId === timeSlot.slotId
                                        );
                                        let isLooked = false;
                                        let isBooked = false;

                                        if (filter.startDate && filter.startDate < now) {
                                            isLooked = true;
                                        }
                                        // Check if the slot is already booked
                                        for (let i = 0; i < events.length; i++) {
                                            const event = events[i];
                                            if (event.startTime <= hour + ":00" && event.endTime > hour + ":00") {
                                                isBooked = true;
                                                break;
                                            }
                                        }

                                        return (
                                            <td
                                                key={timeSlot.courtId + "_" + timeSlot.startTime}
                                                className={`border h-8 md:h-10 cursor-pointer hover:bg-green-100 ${
                                                    isBooked ? "bg-red-400" : isSelected ? "bg-green-300" : "bg-white"
                                                }`}
                                                onClick={() => toggleSlot(timeSlot, isLooked || isBooked)}
                                            >
                                                <p className="text-[8px]">
                                                    {timeSlot.startTime}-{timeSlot.endTime}
                                                </p>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Tổng giờ và tiền */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-6 gap-2">
                <div className="text-gray-700 text-base md:text-lg font-semibold">
                    Tổng giờ: {totalHours}:{remainingMinutes.toString().padStart(2, "0")}
                </div>
                <div className="text-gray-700 text-base md:text-lg font-semibold">
                    Tổng tiền: {totalPrice.toLocaleString()}₫
                </div>
            </div>

            {/* Nút tiếp theo */}
            <div className="mt-6">
                <button
                    onClick={() => {
                        if (selectedSlots.size === 0) return;
                        setOpen(true);
                    }}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl text-base md:text-lg flex items-center justify-center space-x-2"
                >
                    <span>TIẾP THEO</span>
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookingTable;
