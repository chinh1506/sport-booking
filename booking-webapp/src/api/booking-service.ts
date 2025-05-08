import { AxiosInstance } from "axios";
import axiosClient from "./axios-client";
import { Booking, BookingFilter, CreateBookingRequest, Page } from "@/interfaces/Booking";

class BookingService {
    private readonly URL = "/bookings";
    // private axiosClient: AxiosInstance;
    // constructor(axiosClient: AxiosInstance) {
    //     this.axiosClient = axiosClient;
    // }

    public async getAll(params?: BookingFilter): Promise<Page<Booking> | null> {
        return axiosClient.get(this.URL, { params: { ...params } });
    }
    public async bookingCourt(booking:CreateBookingRequest): Promise<Booking | null> {
        return axiosClient.post(this.URL, booking);
    }
}
export default new BookingService();
