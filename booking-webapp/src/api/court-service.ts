import { Court, CourtPrice } from "@/interfaces/Court";
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
    public async getCourtsByComplexId(complexId: string): Promise<Court[] | null> {
        return axiosClient.get(this.URL + "/complexes", { params: { complexId } });
    }
      /**
     * getCourt
     * get active court
     *
     * return court - if token is valid
     *             - else return null
     */
      public async getCourtPricesByComplexId(complexId: string): Promise<CourtPrice[] | null> {
        return axiosClient.get(this.URL + "/prices", { params: { complexId } });
    }
}

export default new CourtService();
