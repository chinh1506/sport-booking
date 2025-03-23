import moment from "moment";
import { stompClient } from "./stomp-client";

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
}

export { stompClient };
