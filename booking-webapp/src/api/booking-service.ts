import { AxiosInstance } from "axios";
import axiosClient from "./axios-client";
import { Booking } from "@/interfaces/Booking";

class BookingService {
    private readonly URL = "/bookings";
    // private axiosClient: AxiosInstance;
    // constructor(axiosClient: AxiosInstance) {
    //     this.axiosClient = axiosClient;
    // }

    public async getAll(params?: {}): Promise<Booking | null> {
        return axiosClient.get(this.URL, { params: { ...params } });
    }
}
export default new BookingService();
