import { Product } from "../../../models/Product";
import { formatAmount, formatNumber } from "../../../utils/numberUtil";
import './ProductDetail.css';

const ProductDetail = ({product} :{ product: Product}) => (
    <div className="product-detail">
        <h4 className="product-detail-title">DETALLE DEL PRODUCTO</h4>
        <ul className="product-detail-list">
            <li className="product-detail-item">
                <div><b>Código de barras</b></div>
                <div>{product.barCode}</div>
            </li>
            <li className="product-detail-item">
                <div><b>Nombre</b></div>
                <div>{product.name}</div>
            </li>
            <li className="product-detail-item">
                <div><b>Categoría</b></div>
                <div>{product.category}</div>
            </li>
            <li className="product-detail-item">
                <div><b>Costo unitario</b></div>
                <div>{formatAmount(product.unitaryCost)}</div>
            </li>
            <li className="product-detail-item">
                <div><b>Precio unitario</b></div>
                <div>{formatAmount(product.unitaryPrice)}</div>
            </li>
            <li className="product-detail-item">
                <div><b>Stock actual</b></div>
                <div>{formatNumber(product.stock)}</div>
            </li>
        </ul>
    </div>
)

export default ProductDetail;