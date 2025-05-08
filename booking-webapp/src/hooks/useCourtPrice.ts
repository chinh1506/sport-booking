import { courtService } from "@/api";
import { CourtPrice } from "@/interfaces/Court";
import { useEffect, useState } from "react";

export const useCourtPrice = (complexId: string) => {
    const [courtPrices, setCourtPrices] = useState<CourtPrice[]>([]);

    const fetchCourtPrice = async () => {
        try {
            if (!complexId) return;
            const courtPriceRes = await courtService.getCourtPricesByComplexId(complexId);
            if (!courtPriceRes) return;
            setCourtPrices(courtPriceRes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourtPrice();
    }, [ complexId ]);

    return {
        courtPrices,
        setCourtPrices,
    };
};