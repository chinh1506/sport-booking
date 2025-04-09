import { User } from "./User";

export interface Complex {
    id: string;
    name: string;
    description: string;
    openTime: string;
    closeTime: string;
    owner: User;
    address: string;
}
