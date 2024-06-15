import { Unity } from "../models/Product";

export const PRODUCT_DATA = [
    {
        id: 'ab34c-dc9c8-aa1ac-b1a24',
        barCode: '10000001',
        name: 'Fideos Matarazzo - 500g',
        unitaryPrice: 1000.50,
        unitaryCost: 400,
        category: 'Almacén - Productos Secos',
        stock: 30,
        unity: Unity.Unidad
    },
    {
        id: 'ab34c-dc9c8-aa1ac-b1a25',
        barCode: '10000002',
        name: 'Royal Canin - 1KG - Adulto',
        unitaryPrice: 9450,
        category: 'Mascotas',
        unitaryCost: 3250.32,
        stock: 2,
        unity: Unity.Unidad
    },
    {
        id: 'ab34c-dc9c8-aa1ac-b1a26',
        barCode: '10000003',
        name: 'Queso la pauilina',
        unitaryPrice: 22300,
        category: 'Lácteos y Huevos',
        unitaryCost: 12300,
        stock: 1,
        unity: Unity.Kilo
    }
]