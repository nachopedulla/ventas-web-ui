export class Product {
    id?: string;
    barCode?: string;
    unitaryPrice?: number;
    unitaryCost?: number;
    name?: string;
    description?: string;
    category?: Category;
    stock?: number;
}

export enum Category {
    LACTEOS = "LACTEOS",
    CONGELADOS = "CONGELADOS",
    ALMACEN = "ALMACEN",
    ACEITES = "ACEITES"
}