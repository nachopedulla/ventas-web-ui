import { useEffect, useState } from "react";
import { Sale } from "../../models/Sale";
import { useNavigate, useParams } from "react-router-dom";
import { useSales } from "../../context/SaleContext";
import { TextField } from "@mui/material";
import './SaleDetail.css';
import { formatAmount } from "../../utils/NumberUtil";
import SaleItems from "./saleProducts/SaleItems";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import TooltipIconButton from "../../components/TooltipIconButton/TooltipIconButton";
import PageTitle from "../../components/PageTitle/PageTitle";
import { formatDate } from "../../utils/DateUtil";


const SaleDetail = () => {

    const { saleId } = useParams();
    const navigate = useNavigate();

    const sales = useSales();
    const [sale, setSale] = useState<Sale | undefined>(undefined);


    useEffect(() => {
        setSale(sales.getById(saleId!))
    }, [])

    return (
        <div>
            <PageTitle text='Detalle de la venta'/>
            <div className='sale-detail'>
                <TextField
                    className='filter'
                    id='datetime'
                    value={formatDate(sale?.date)}
                    label='Fecha y Hora'
                    variant='standard'
                    inputProps={{ readOnly: true }}
                />
                <TextField
                    className='filter'
                    id='paymentMethod'
                    value={sale?.paymentMethod}
                    label='Medio de pago'
                    variant='standard'
                    inputProps={{ readOnly: true }}
                />
            </div>
            <SaleItems items={sale?.items} />
        </div>
    )
}

export default SaleDetail;