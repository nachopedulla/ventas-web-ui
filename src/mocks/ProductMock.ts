import { Category } from "../models/Product";

export const DATA = [
    {
        id: 'ab34c-dc9c8-aa1ac-b1a24',
        barCode: '10000001',
        name: 'Fideos Matarazzo',
        unitaryPrice: 1000.50,
        unitaryCost: 400,
        category: Category.ALMACEN,
        stock: 30
    },
    {
        id: 'ab34c-dc9c8-aa1ac-b1a25',
        barCode: '10000002',
        name: 'Royal Canin - 1KG - Adulto',
        unitaryPrice: 9450,
        category: Category.CONGELADOS,
        unitaryCost: 3250.32,
        stock: 2
    }
]