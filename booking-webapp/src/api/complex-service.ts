import { Complex } from "@/interfaces/Complex";
import { Page } from "@/interfaces/Page";
import axiosClient from "./axios-client";

class CourtService {
    private readonly URL: string = "complexes";

    /**
        get 
     */
    public async findAll(pageable:any): Promise<Page<Complex> | null> {
        return axiosClient.get(this.URL + "/", { params: { ...pageable } });
    }

}

export default new CourtService();
