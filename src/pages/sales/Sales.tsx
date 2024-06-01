import './Sales.css';
import { useState } from 'react';
import Filters from '../../components/Filters/Filters';
import { PaymentMethod } from '../../models/Movement';
import { Form } from '../../models/Filter';
import { Header } from '../../components/Table/ResultTable';



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

    return (
        <>
            <h4>{`Panel de ${title}`}</h4>
            <Filters
                forms={forms}
                request={{}}
                changeHandler={() => { }}
            />

        </>
    )
}

export default Sales;