import { Button, InputAdornment, MenuItem, TextField } from "@mui/material"
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaBarcode } from "@react-icons/all-files/fa/FaBarcode";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Product } from "../../models/Product";
import { useEffect, useState } from "react";
import TooltipIconButton from "../../components/TooltipIconButton/TooltipIconButton";
import { useProducts } from "../../context/ProductContext";
import Modal from "../../components/Modal/Modal";
import './ProductItem.css';
import ProductDetail from "./components/ProductDetail";

const ProductItem = ({ title }: { title: string }) => {

    const { productId } = useParams();
    const navigate = useNavigate();
    const products = useProducts();

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
            <h4>{title}</h4>
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
                    <MenuItem value={Category.ALMACEN}>{Category.ALMACEN}</MenuItem>
                    <MenuItem value={Category.ACEITES}>{Category.ACEITES}</MenuItem>
                    <MenuItem value={Category.CONGELADOS}>{Category.CONGELADOS}</MenuItem>
                    <MenuItem value={Category.LACTEOS}>{Category.LACTEOS}</MenuItem>
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
                    className="product-filter"
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
                    >
                        Editar
                    </Button>
                ) : (
                    <Button
                        size="medium"
                        className="product-button"
                        variant="outlined"
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        Guardar
                    </Button>
                )}
                <Button
                    size="medium"
                    className="button"
                    variant="outlined"
                    color='error'
                    onClick={goBack}
                >
                    Volver
                </Button>
            </div>
            <Modal
                show={showConfirmation}
                cancel={() => setShowConfirmation(!showConfirmation)}
                confirm={save}
            >
                <ProductDetail product={product}/>
            </Modal>
        </div>
    )
}

export default ProductItem;