export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface PageAndFilterParam {
    page?: number;
    limit?: number;
    orderBy?: string;
    order?: SortOrder;
    createdAt?: string;
    updatedAt?: string;
}