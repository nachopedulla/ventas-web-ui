import { Button, InputAdornment, MenuItem, TextField } from "@mui/material"
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaBarcode } from "@react-icons/all-files/fa/FaBarcode";
import { useNavigate, useParams } from "react-router-dom";
import { Product, Unity } from "../../models/Product";
import { useEffect, useState } from "react";
import TooltipIconButton from "../../components/TooltipIconButton/TooltipIconButton";
import { useProducts } from "../../context/ProductContext";
import Modal from "../../components/Modal/Modal";
import { useCategories } from "../../context/CategoryContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import { FaEdit } from '@react-icons/all-files/fa/FaEdit';
import { FaSave } from '@react-icons/all-files/fa/FaSave';
import ProductItem from "./components/ProductItem";
import './StockDetail.css';

const StockDetail = ({ title }: { title: string }) => {

    const { productId } = useParams();

    const navigate = useNavigate();
    const products = useProducts();
    const categories = useCategories();

    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [disabled, setDisabled] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (productId === undefined) {
            setProduct(new Product());
            setDisabled(false);
        } else {
            setProduct(products.getById(productId as string));
        }
    }, [])

    function changeHandler<K extends keyof Product>(key: K, event: any) {
        let auxProduct = { ...product! };
        auxProduct[key] = event.target.value;
        setProduct(auxProduct);
    }

    function goBack() {
        navigate(-1);
    }

    function save() {
        products.upsert(product!);
        goBack();
    }

    return product === undefined ? null : (
        <div>
            <PageTitle text={title} />
            <div className="product-form">
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='barCode'
                    label='Codigo de barras'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    value={product?.barCode}
                    onChange={(event) => changeHandler('barCode', event)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                            >
                                <TooltipIconButton title="Escanear" icon={<FaBarcode />} handler={() => { }} />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='name'
                    label='Nombre'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    value={product?.name}
                    onChange={(event) => changeHandler('name', event)}
                />
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='name'
                    label='Categoria'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    select
                    value={product?.category}
                    onChange={(event) => changeHandler('category', event)}
                >
                    <MenuItem value={undefined}></MenuItem>
                    {
                        categories.get().map(category =>
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        )
                    }
                </TextField>
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='unitaryPrice'
                    label='Precio Unitario'
                    type='number'
                    onChange={(event) => changeHandler('unitaryPrice', event)}
                    InputLabelProps={{ shrink: true }}
                    value={product?.unitaryPrice}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaDollarSign />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='name'
                    label='Costo Unitario'
                    type='number'
                    onChange={(event) => changeHandler('unitaryCost', event)}
                    InputLabelProps={{ shrink: true }}
                    value={product?.unitaryCost}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaDollarSign />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    disabled={disabled}
                    className="product-filter-unity"
                    id='unity'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    select
                    label='Unidad del precio'
                    value={product?.unity}
                    onChange={(event) => changeHandler('unity', event)}
                >
                    <MenuItem value={Unity.Unidad}>Unidades</MenuItem>
                    <MenuItem value={Unity.Kilo}>Kilogramo</MenuItem>
                    <MenuItem value={Unity.Litro}>Litro</MenuItem>
                    <MenuItem value={Unity.Metro}>Metro</MenuItem>                    
                </TextField>
                <TextField
                    disabled={disabled}
                    className="product-filter-stock"
                    id='stock'
                    label='Stock'
                    InputLabelProps={{ shrink: true }}
                    type='number'
                    value={product?.stock}
                    onChange={(event) => changeHandler('stock', event)}
                />
            </div>
            <div className="product-buttons">
                {disabled ? (
                    <Button
                        size="medium"
                        className="product-button"
                        variant="outlined"
                        onClick={() => setDisabled(!disabled)}
                        endIcon={<FaEdit size={14} />}
                    >
                        Editar
                    </Button>
                ) : (
                    <Button
                        size="medium"
                        className="product-button"
                        variant="outlined"
                        endIcon={<FaSave size={14} />}
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        Guardar
                    </Button>
                )}
            </div>
            <Modal
                show={showConfirmation}
                cancel={() => setShowConfirmation(!showConfirmation)}
                confirm={save}
            >
                <ProductItem
                    title="DETALLE DEL PRODUCTO"
                    product={product}
                />
            </Modal>
        </div>
    )
}

export default StockDetail;