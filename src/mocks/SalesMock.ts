import { PaymentMethod } from "../models/Movement";

export const SALES_DATA = [
    {
        id: '12345678',
        amount: 233.34,
        date: '05/06/2024 13:50',
        paymentMethod: PaymentMethod.EFECTIVO
    },
    {
        id: '22345678',
        amount: 21234.50,
        date: '05/06/2024 14:50',
        paymentMethod: PaymentMethod.EFECTIVO
    },
    {
        id: '32345678',
        amount: 899.99,
        date: '05/06/2024 15:50',
        paymentMethod: PaymentMethod.TARJETA
    },
    {
        id: '42345678',
        amount: 1430,
        date: '05/06/2024 16:50',
        paymentMethod: PaymentMethod.EFECTIVO
    },
    {
        id: '52345678',
        amount: 9834,
        date: '05/06/2024 17:50',
        paymentMethod: PaymentMethod.TRANSFERENCIA
    },
]

