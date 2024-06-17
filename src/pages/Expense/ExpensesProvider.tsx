import { PaymentMethod } from "../../models/Sale"
import { TableCellProps } from "@mui/material"
import { formatAmount } from "../../utils/NumberUtil"
import { formatDate } from "../../utils/DateUtil"
import Expenses from "./Expenses"
import { CONCEPTS } from "../../mocks/ConceptMock"

const OPTIONS = CONCEPTS.map(concept => { return { value: concept, label: concept } })

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
        id: 'category',
        type: 'select',
        label: 'Categoría',
        default: 'Todos',
        options: [
            {
                value: 'Todos',
                label: 'Todos',
                color: 'grey'
            },
            ...OPTIONS
        ]
    }
]

const HEADERS = [
    {
        id: 'date',
        label: 'Fecha',
        align: 'left' as TableCellProps["align"],
        formatter: formatDate
    },
    {
        id: 'category',
        label: 'Categoria',
        align: 'left' as TableCellProps["align"],
    },
    {
        id: 'concept',
        label: 'Descripción',
        align: 'left' as TableCellProps["align"],
    },
    {
        id: 'amount',
        label: 'Monto',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
]

const ExpensesProvider = () => (
    <Expenses forms={FORMS} headers={HEADERS} />
)

export default ExpensesProvider;
