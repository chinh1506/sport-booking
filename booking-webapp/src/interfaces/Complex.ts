import { PageAndFilterParam } from "./Page";
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

export interface ComplexFilter extends PageAndFilterParam {
    name?: string;
}
