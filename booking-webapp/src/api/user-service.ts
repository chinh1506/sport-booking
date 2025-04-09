import { User } from "@/interfaces/User";
import axiosClient from "./axios-client";

class UserService {
    private readonly URL: string = "users";

    /**
     * getUserInfor
     * get active user base on access token (JWT)
     *
     * return user - if token is valid
     *             - else return null
     */
    public async getUserInfor(): Promise<User | null> {
        return axiosClient.get(this.URL + "/my-information");
    }
}

export default new UserService();
