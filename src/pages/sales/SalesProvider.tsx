import { PaymentMethod, SaleItem } from "../../models/Sale"
import { TableCellProps } from "@mui/material"
import { formatAmount, formatNumber } from "../../utils/NumberUtil"
import Sales from "./Sales"
import ResultTable from "../../components/Table/ResultTable"
import { SALES_DATA } from "../../mocks/SalesMock"
import moment from "moment"

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
        default: 'Todos',
        options: [
            {
                value: 'Todos',
                label: 'Todos',
                color: 'grey'
            },
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
        id: 'id',
        label: 'Nro. de Venta',
        align: 'left' as TableCellProps["align"],
    },
    {
        id: 'date',
        label: 'Fecha',
        align: 'left' as TableCellProps["align"],
        formatter: (date: Date) => moment(date).format('DD/MM/yyyy, hh:mm:ss a')
    },
    {
        id: 'paymentMethod',
        label: 'Medio de pago',
        align: 'left' as TableCellProps["align"],
    }, 
    {
        id: 'amount',
        label: 'Monto',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
]

const SalesProvider = () => (
    <Sales title="Ventas" forms={FORMS} headers={HEADERS} />
)

export default SalesProvider;
