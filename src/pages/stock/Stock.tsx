import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import SuccessIconButton from "../../components/Button/Success";
import Filters from "../../components/Filters/Filters";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import ResultTable, { Header } from "../../components/Table/ResultTable";
import { Form } from "../../models/Filter";
import { SearchRequest } from "../../models/Movement";
import { Product } from "../../models/Product";

const Stock = ({ forms, headers }: { forms: Array<Form>, headers: Array<Header> }) => {

    const navigate = useNavigate();
    const products = useProducts();

    const [searchRequest, setSearchRequest] = useState<SearchRequest>({});
    const [selectedItem, setSeletecItem] = useState<string | undefined>(undefined);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const removeHandler = () => {
        products.remove(selectedItem);
        setSeletecItem(undefined);
        handleConfirm(undefined);
    }

    const handleConfirm = (id: string | undefined) => {
        setSeletecItem(id);
        setShowConfirmation(!showConfirmation);
    }

    const addProduct = () => navigate('/productos/nuevo');

    const showDetailHandler = (id: string) => navigate('/productos/' + id);

    const filterAndSort = (): Array<Product> => {
        var totalProducts = products.get()
            .filter(product => searchRequest.name === undefined || product.name?.toUpperCase().includes(searchRequest.name.toUpperCase()))
            .filter(product => searchRequest.category === undefined || product.category === searchRequest.category);
        totalProducts.sort((a, b) => a.barCode! < b.barCode! ? 1 : - 1)
        return totalProducts;
    }

    function changeHandler<K extends keyof SearchRequest>(key: K, event: any) {
        let auxRequest = { ...searchRequest };
        auxRequest[key] = event.target.value;
        setSearchRequest(auxRequest);
    }

    return (
        <>
            <h4>{`Inventario`}</h4>
            <Filters
                forms={forms}
                request={searchRequest}
                changeHandler={changeHandler}
            />
            <div className="actions">
                <SuccessIconButton
                    text='Nuevo Producto'
                    icon={<FaPlus size={13} />}
                    handler={addProduct}
                />
                {
                    /* TODO: agregar categorías 
                    <SuccessIconButton
                        text='Nueva Categoría'
                        icon={<FaPlus size={13} />}
                        handler={addProduct}
                    />
                    */
                }
            </div>
            <ResultTable
                headers={headers}
                data={filterAndSort()}
                detailHandler={showDetailHandler}
                removeHanlder={handleConfirm}
            />
            <Modal
                show={showConfirmation}
                cancel={handleConfirm}
                confirm={removeHandler}
            >
                <p>¿Está segudo de que desea eliminar el elemento?</p>
            </Modal>
        </>
    );

}

export default Stock;