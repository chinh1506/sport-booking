import { Court } from "./Court";

export type UserSelected = {
    field?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
};

export type Booking = {
    id: string;
    startDate: string;
    createdAt: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: string;
    court: Court;
};

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
    courtId?: string;
    startDate?: string;
    startTime?: string;
    endTime?: string;
    email?: string;
}
