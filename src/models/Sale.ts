import { formatAmount } from "../utils/NumberUtil";
import { Unity, unityMap } from "./Product";

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
    items?: Array<SaleItem>
}

export class SaleItem {
    id: string;
    name: string;
    barcode: string;
    category: string;
    count: number;
    price: number;
    unity: Unity;

    constructor (
        id: string,
        name: string,
        barcode: string,
        category: string,
        count: number,
        price: number,
        unity: Unity
    ) {
        this.id = id;
        this.name = name;
        this.barcode = barcode;
        this.category = category;
        this.count = count;
        this.unity = unity;
        this.price = price;
    }
}

export function total(sale: SaleItem) : number {
    const scale = unityMap().get(sale.unity)!.scale;
    return sale.count / scale * sale.price;
}


export function unitaryPrice(price: number, unity : Unity) : string {
    return `${formatAmount(price)} x ${unity}`
}