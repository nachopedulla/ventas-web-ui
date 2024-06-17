import './Sales.css';
import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import { PaymentMethod, Sale, SearchRequest } from '../../models/Sale';
import { Form } from '../../models/Filter';
import ResultTable, { Header } from '../../components/Table/ResultTable';
import SuccessIconButton from '../../components/Button/Success';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../../context/SaleContext';
import { Pagination } from '@mui/material';
import { pages } from '../../utils/PaginationUtil';


const Sales = ({ title, forms, headers }: { title: string, forms: Array<Form>, headers: Array<Header> }) => {

    const [request, setRequest] = useState<SearchRequest>({ dateUntil: undefined, dateFrom: undefined, paymentMethod: undefined });

    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [results, setResults] = useState<Array<Sale>>([]);

    const navigate = useNavigate();
    const showDetailHandler = (id: string) => navigate('/ventas/' + id);
    const newSaleHandler = () => navigate('/ventas/nueva');
    const sales = useSales();

    useEffect(() => {
        async function fetchSales() {
            setResults(await sales.get(request));
            setTotalResults(await sales.count(request));
        }
        fetchSales();
        setCurrentPage(1);
    }, [request])

    const handlePageChange = async (value: number) => {
        setCurrentPage(value);
        if (currentPage < value) {
            setResults(await sales.getNext(request, results[results.length - 1]));
        } else {
            setResults(await sales.getPrevious(request, results[0]));
        }
    }

    function changeHandler<K extends keyof SearchRequest>(key: K, event: any) {
        alert('ASDAS')
        let auxRequest = { ...request };
        auxRequest[key] = event.target.value;
        setRequest(auxRequest);
    }

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
                changeHandler={changeHandler}
            />
            <SuccessIconButton
                text='Nueva Venta'
                icon={<FaPlus size={13} />}
                handler={newSaleHandler}
            />
            <ResultTable
                data={results}
                headers={headers}
                actions={actions}
            />
            <Pagination 
                count={pages(totalResults)} 
                onChange={ (_, value) => handlePageChange(value) } 
                page={currentPage}
            />
        </>
    )
}

export default Sales;