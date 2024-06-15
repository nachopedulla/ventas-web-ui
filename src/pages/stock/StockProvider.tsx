import Stock from "./Stock"
import { TableCellProps } from "@mui/material"
import { formatAmount, formatNumber } from "../../utils/NumberUtil"
import { useCategories } from "../../context/CategoryContext"
import { Unity, unityMap } from "../../models/Product"

const StockProvider = () => {


    const OPTIONS = useCategories().get()
        .map(category => { return { value: category, label: category } });

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
            options: [ { value: 'Todas', label: 'Todas', color: 'grey' } , ...OPTIONS],
            default: 'Todas',
            color: 'grey'
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
            id: 'unity',
            label: 'Unidad del Precio',
            align: 'left' as TableCellProps["align"],
            formatter: (unity: Unity) => unityMap().get(unity)?.stockLabel
        },
        {
            id: 'stock',
            label: 'En stock',
            align: 'right' as TableCellProps["align"],
            formatter: formatNumber
        },
    ]

    return (
        <Stock forms={FORMS} headers={HEADERS} />
    )
}

export default StockProvider;
