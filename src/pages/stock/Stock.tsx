import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import SuccessIconButton from "../../components/Button/Success";
import Filters from "../../components/Filters/Filters";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import ResultTable, { Header } from "../../components/Table/ResultTable";
import { Form } from "../../models/Filter";
import { SearchRequest } from "../../models/Sale";
import { Product } from "../../models/Product";
import ProductDetail from "../StokDetail/components/ProductItem";
import { isNotFiltered } from "../../utils/RequestUtils";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { icons } from "@react-icons/all-files";

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
            .filter(product => isNotFiltered(searchRequest.name) || product.name?.toUpperCase().includes(searchRequest.name!.toUpperCase()))
            .filter(product => isNotFiltered(searchRequest.category) || product.category === searchRequest.category);

        totalProducts.sort((a, b) => a.barCode! < b.barCode! ? 1 : - 1)
        return totalProducts;
    }

    function changeHandler<K extends keyof SearchRequest>(key: K, event: any) {
        let auxRequest = { ...searchRequest };
        auxRequest[key] = event.target.value;
        setSearchRequest(auxRequest);
    }


    const ACTIONS = [
        {
            id: 'Ver detalle',
            icon: <FaEye size={14}/>,
            handler: showDetailHandler
        },
        {
            id: 'Eliminar',
            icon: <FaTrash size={14} color='#c11f1f'/>,
            handler: handleConfirm
        }
    ]


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
            </div>
            <ResultTable
                headers={headers}
                data={filterAndSort()}
                actions={ACTIONS}
            />
            <Modal
                show={showConfirmation}
                cancel={handleConfirm}
                confirm={removeHandler}
            >
                <ProductDetail
                    title="¿Está seguro de que desea eliminar el elemento?"
                    product={products.getById(selectedItem!)!}
                />

            </Modal>
        </>
    );

}

export default Stock;