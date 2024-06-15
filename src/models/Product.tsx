import { formatAmount } from "../utils/NumberUtil";

export class Product {
    id?: string;
    barCode?: string;
    unitaryPrice?: number;
    unitaryCost?: number;
    name?: string;
    description?: string;
    category?: string;
    stock?: number;
    unity?: Unity;
}

export enum Unity {
    Unidad = 'u.',
    Kilo = 'kg',
    Metro = 'm',
    Litro = 'l'
}

export interface SaleUnity {
    stockLabel : string,
    label: string,
    scale: number,
}

export const unityMap = () : Map<Unity, SaleUnity> => {
    const map = new Map<Unity, SaleUnity>();
    map.set(Unity.Kilo, { stockLabel: 'Kilogramos', label: 'g', scale: 1000} );
    map.set(Unity.Metro, { stockLabel: 'Metro', label: 'cm', scale: 100} );
    map.set(Unity.Litro, { stockLabel: 'Litro', label: 'ml', scale: 1000} );
    map.set(Unity.Unidad, { stockLabel: 'Unidades', label: '', scale: 1} );
    return map;
}