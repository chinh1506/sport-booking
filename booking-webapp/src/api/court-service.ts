import { Court } from "@/interfaces/Court";
import axiosClient from "./axios-client";
import { RestResponse } from "@/interfaces/RestResponse";

class CourtService {
    private readonly URL: string = "courts";

    /**
     * getCourt
     * get active court
     *
     * return court - if token is valid
     *             - else return null
     */
    public async getCourtsByComplexId(complexId: string): Promise<RestResponse<Court> | null> {
        return axiosClient.get(this.URL + "/complexes", { params: { complexId } });
    }
}

export default new CourtService();
