export interface RestResponse<T> {
    status: string;
    statusCode: number;
    error: string;
    message: string;
    data: T[];
}
