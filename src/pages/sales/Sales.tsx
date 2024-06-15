import './Sales.css';
import { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import { PaymentMethod } from '../../models/Sale';
import { Form } from '../../models/Filter';
import ResultTable, { Header } from '../../components/Table/ResultTable';
import SuccessIconButton from '../../components/Button/Success';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { useNavigate } from 'react-router-dom';
import { SALES_DATA } from '../../mocks/SalesMock';


const STOCK_FORMS = [
    { type: 'date', label: 'Fecha desde', id: 'dateFrom' },
    { type: 'date', label: 'Fecha hasta', id: 'dateUntil' },
    {
        type: 'select', label: 'Medio de pago', id: 'paymentMethod', options: [
            { value: PaymentMethod.EFECTIVO, label: 'Efectivo' },
            { value: PaymentMethod.TRANSFERENCIA, label: 'Transferencia' },
            { value: PaymentMethod.TARJETA, label: 'Tarjeta' },
        ]
    }
]


const Sales = ({ title, forms, headers }: { title: string, forms: Array<Form>, headers: Array<Header> }) => {

    const [request, setRequest] = useState({ dateUntil: undefined, dateFrom: undefined, paymentMethod: undefined });
    const navigate = useNavigate();

    const showDetailHandler = (id: string) => navigate('/ventas/' + id);

    const newSaleHandler = (id: string) => navigate('/ventas/nueva');

    const actions = [
        {
            id: 'Ver detalle',
            icon: <FaEye size={14} />,
            handler: showDetailHandler
        }
    ]

    return (
        <>
            <h4>{`Panel de ${title}`}</h4>
            <Filters
                forms={forms}
                request={{}}
                changeHandler={() => { }}
            />
            <SuccessIconButton
                text='Nueva Venta'
                icon={<FaPlus size={13} />}
                handler={newSaleHandler}
            />
            <ResultTable
                data={SALES_DATA}
                headers={headers}
                actions={actions}
            />
        </>
    )
}

export default Sales;