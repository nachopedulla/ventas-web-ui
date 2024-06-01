import { Category } from "./Product";

export interface SearchRequest {
    name?: string,
    category?: Category,
    paymentMethod? : PaymentMethod;
    dateFrom? : string;
    dateUntil? : string;
}

export enum PaymentMethod {
    EFECTIVO = "EFECTIVO",
    TRANSFERENCIA = "TRANSFERENCIA",
    TARJETA = "TARJETA"
}