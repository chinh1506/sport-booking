import moment from "moment";
import { stompClient } from "./stomp-client";
import { SlotInfor } from "@/interfaces/Booking";

export class Utils {
    public static convertFormatDateToMatchInput(date: string): string {
        // return moment(date).format("HH:mm DD/MM/YYYY") + "";
        return moment.utc(date).format("YYYY-MM-DD") + "";
    }
    public static convertFormatTimeToMatchInput(date: string): string {
        console.log(date);

        return moment.utc(date, true).format("HH:mm") + "";
        // return moment(date).format("YYYY-MM-DD") + "";
    }
    public static addThirtyMinutes(startTime: string): string {
        const [hours, minutes] = startTime.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + 30);

        const endHours = String(date.getHours()).padStart(2, "0");
        const endMinutes = String(date.getMinutes()).padStart(2, "0");

        return `${endHours}:${endMinutes}`;
    }
    public static mergeContinuousSlots(slots: SlotInfor[]): SlotInfor[] {
        if (!slots || slots.length === 0) {
            return [];
        }
    
        // Sắp xếp theo courtId, startTime
        slots.sort((a, b) => {
            if (a.courtId !== b.courtId) {
                return a.courtId.localeCompare(b.courtId);
            }
            return a.startTime.localeCompare(b.startTime);
        });
    
        const merged: SlotInfor[] = [];
        let current = { ...slots[0] };
    
        for (let i = 1; i < slots.length; i++) {
            const next = slots[i];
    
            if (current.courtId === next.courtId && current.endTime === next.startTime) {
                // Gộp: kéo dài endTime
                current.endTime = next.endTime;
            } else {
                // Không liên tiếp, thêm current vào danh sách
                merged.push(current);
                current = { ...next };
            }
        }
    
        // Thêm slot cuối cùng
        merged.push(current);
    
        return merged;
    }
}

export { stompClient };
