
export interface SearchRequest {
    name?: string,
    category?: string,
    paymentMethod? : PaymentMethod;
    dateFrom? : string;
    dateUntil? : string;
}

export enum PaymentMethod {
    EFECTIVO = "EFECTIVO",
    TRANSFERENCIA = "TRANSFERENCIA",
    TARJETA = "TARJETA"
}

export interface Sale {
    id?: string,
    amount?: number,
    paymentMethod?: PaymentMethod
    date?: string,
    /* TODO: lista de productos */
}