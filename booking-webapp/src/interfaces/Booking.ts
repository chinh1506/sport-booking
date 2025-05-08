import { Court } from "./Court";

export type UserSelected = {
    field?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
};

export type Booking = {
    id: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    totalPrice: number;
    status: "CONFIRMED" | "PENDING" | "CANCELLED"; // Example of possible statuses
    customer: string | null; // Assuming customer is a string (e.g., customer ID) or null
    createdAt: string | null; // ISO date string or null
    updatedAt: string | null; // ISO date string or null
    bookingDetails: BookingDetail[]; // Replace `any` with a specific type if available
};
export interface BookingDetail {
    id: string;
    name: string;
    startTime: string; // Time in HH:mm:ss format
    endTime: string; // Time in HH:mm:ss format
    type: String; // Add other possible types if applicable
    quantity: number;
    description: string;
    totalPrice: number;
    court?: Court; // Assuming `Court` is already defined and imported
}

export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface BookingFilter {
    complexId?:string;
    startDate?: string;
    courtId?: string;
}

export interface CreateBookingRequest {
    startDate?: string;
    email?: string;
    timeSlots?: TimeSlot[]; // Array of time slots
}
export interface TimeSlot {
    startTime: string; // Time in HH:mm:ss format
    endTime: string; // Time in HH:mm:ss format
    courtId: string; // ID of the court
}
export interface SlotInfor extends TimeSlot {
    slotId: string;
    courtName?: string;
   
}
