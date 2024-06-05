import { PaymentMethod } from "../../models/Movement"
import { TableCellProps } from "@mui/material"
import { formatAmount, formatNumber } from "../../utils/NumberUtil"
import Sales from "./Sales"
import ResultTable from "../../components/Table/ResultTable"
import { SALES_DATA } from "../../mocks/SalesMock"

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
        id: 'date',
        label: 'Fecha',
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
    },
]

const SalesProvider = () => (
    <>
        <Sales title="Ventas" forms={FORMS} headers={HEADERS} />
        <ResultTable 
            data={SALES_DATA} 
            headers={HEADERS} 
            detailHandler={() => { }}
            removeHanlder={() => []} 
        />
    </>
)

export default SalesProvider;
