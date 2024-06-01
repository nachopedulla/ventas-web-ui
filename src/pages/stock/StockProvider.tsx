import { PaymentMethod } from "../../models/Movement"
import { TableCellProps } from "@mui/material"
import { formatAmount, formatNumber } from "../../utils/numberUtil"
import Stock from "./Stock"
import { Category } from "../../models/Product"

const FORMS = [
    {
        id: 'name',
        type: 'text',
        label: 'Nombre',
    },
    {
        id: 'category',
        type: 'select',
        label: 'Categoría',
        options: [ 
            {
                value: undefined,
                label: ''
            },
            {
                value: Category.ACEITES,
                label: 'ACEITES'
            },
            {
                value: Category.ALMACEN,
                label: 'ALMACEN'
            },
            {
                value: Category.CONGELADOS,
                label: 'CONGELADOS'
            },
            {
                value: Category.LACTEOS,
                label: 'LACTEOS'
            },
        ]
    }
]

const HEADERS = [
    {
        id: 'barCode',
        label: 'Código',
        align: 'left' as TableCellProps["align"]
    },
    {
        id: 'name',
        label: 'Nombre',
        align: 'left' as TableCellProps["align"]
    },
    {
        id: 'category',
        label: 'Categoría',
        align: 'left' as TableCellProps["align"],
    },
    {
        id: 'unitaryPrice',
        label: 'Precio unitario',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
    {
        id: 'unitaryCost',
        label: 'Costo unitario',
        align: 'right' as TableCellProps["align"],
        formatter: formatAmount
    },
    {
        id: 'stock',
        label: 'En stock',
        align: 'right' as TableCellProps["align"],
        formatter: formatNumber
    }
]

const StockProvider = () => (
    <Stock forms={FORMS} headers={HEADERS}/>
)

export default StockProvider;
