import { Complex } from "./Complex";

export interface Court {
    id: string;
    name: string;
    description: string;
    type: string;
    complex: Complex;
}

export interface CourtPrice {
    id: string;
    startTime: string; // Time in HH:mm:ss format
    endTime: string; // Time in HH:mm:ss format
    price: number; // Price as a number
    description: string; // Description of the price
    court: Court; // Reference to the associated Court
}
