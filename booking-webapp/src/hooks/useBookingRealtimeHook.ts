import { stompClient } from "@/Utils";
import { useEffect } from "react";

export const useBookingRealtimeHook = () => {
    useEffect(() => {
        if (!stompClient.active) {
            stompClient.activate();
        }
        () => {
            stompClient.deactivate();
        };
    });

    return {};
};
