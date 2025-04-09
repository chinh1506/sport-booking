import { Complex } from "./Complex";

export interface Court {
    id: string;
    name: string;
    description: string;
    type: string;
    complex: Complex;
}
