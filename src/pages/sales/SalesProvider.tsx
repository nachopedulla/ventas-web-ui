import { PaymentMethod } from "../../models/Movement"
import { TableCellProps } from "@mui/material"
import { formatAmount, formatNumber } from "../../utils/numberUtil"
import Sales from "./Sales"

const FORMS = [
    {
        id: 'dateFrom',
        type: 'date',
        label: 'Fecha desde',
    },
    {
        id: 'dateUntil',
        type: 'date',
        label: 'Fecha hasta',
    },
    {
        id: 'paymentMethod',
        type: 'select',
        label: 'Medio de pago',
        options: [
            {
                value: PaymentMethod.EFECTIVO,
                label: 'EFECTIVO'
            },
            {
                value: PaymentMethod.TARJETA,
                label: 'TARJETA'
            },
            {
                value: PaymentMethod.TRANSFERENCIA,
                label: 'TRANSFERENCIA'
            },
        ]
    }
]

const HEADERS = [
    {
        id: 'date',
        label: 'Fecha',
        align: 'left' as TableCellProps["align"]
    },
    {
        id: 'concept',
        label: 'Concepto',
        align: 'left' as TableCellProps["align"]
    },
    {
        id: 'amount',
        label: 'Monto',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
    {
        id: 'paymentMethod',
        label: 'Medio de pago',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
]

const SalesProvider = () => (
    <Sales title="Ventas" forms={FORMS} headers={HEADERS}/>
)

export default SalesProvider;
