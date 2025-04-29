"use client";

import { Booking } from "@/interfaces/Booking";
import { Court } from "@/interfaces/Court";
import moment from "moment";
import React, { useState } from "react";

type Props = {
    courts: Court[];
    bookings: Booking[];
};

const BookingTable: React.FC<Props> = ({ courts, bookings }) => {
    //   const courts = ["Sân 7", "Sân 8", "Sân 9", "Sân 10", "Sân 11", "Sân 12", "Sân 16", "Sân 17"];
    const pricePerHour = 80000; // 80,000đ / giờ

    const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

    const toggleSlot = (slotId: string) => {
        setSelectedSlots((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(slotId)) {
                newSet.delete(slotId);
            } else {
                newSet.add(slotId);
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
    console.log(bookings);
    

    const totalMinutes = selectedSlots.size * 30;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalPrice = (selectedSlots.size * pricePerHour) / 2;

    const hours = generateHours();

    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-6 select-none">
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
                            const events = bookings.filter((bkg) => bkg.court.id === court.id);

                            return (
                                <tr key={court.id}>
                                    <td className="border p-1 md:p-2 text-center font-bold whitespace-nowrap">
                                        {court.name}
                                    </td>
                                    {hours.map((hour) => {
                                        const slotId = `${court.id}-${hour}`;
                                        const isSelected = selectedSlots.has(slotId);
                                        let isBooked = false;

                                        for (let i = 0; i < events.length; i++) {
                                            const event = events[i];
                                            console.log(event.startTime);
                                            console.log(hour);
                                            
                                            if (event.startTime <= (hour + ":00") && event.endTime >= (hour + ":00")) {
                                                isBooked = true;
                                                break;
                                            }
                                        }

                                        return (
                                            <td
                                                key={slotId}
                                                className={`border h-8 md:h-10 cursor-pointer hover:bg-green-100 ${
                                                    isBooked ? "bg-red-400" : isSelected ? "bg-green-300" : "bg-white"
                                                }`}
                                                onClick={() => toggleSlot(slotId)}
                                            ></td>
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
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl text-base md:text-lg flex items-center justify-center space-x-2">
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
