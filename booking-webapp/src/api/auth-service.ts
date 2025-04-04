import { User } from "@/interfaces/User";
import axiosClient from "./axios-client";
import { JwtToken } from "@/interfaces/JwtToken";

class AuthService {
    // http://localhost:8080/users/my-information
    private readonly URL = "/auth";

    /**
     * getMyInfor
     * get active user base on access token (JWT)
     */
    public async refreshToken(token: JwtToken, clientId: string): Promise<User | null> {
        return axiosClient.post(this.URL + "/refresh-token", {
            clientId: clientId,
            refreshToken: token.refreshToken || "",
        });
    }
}

export default new AuthService();
