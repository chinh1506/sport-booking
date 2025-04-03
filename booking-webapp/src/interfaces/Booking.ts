export type UserSelected = {
    field?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
};

export type Booking = {
    id: string;
    startDate: string;
    createdAt: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: boolean;
    sportField: SportField;
};

export type SportField = {
    id: string;
    name: string;
    description: string;
    type: string;
};
