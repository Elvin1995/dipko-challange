export interface AutoCompleteResponse {
    count: number;
    addresses: Address[];
    time: number;
}

export interface Address {
    street: string;
    numbers: string[];
    zip: string;
    district: string;
    city: string;
}
