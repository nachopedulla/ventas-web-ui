import { Product, unityMap } from "../../../models/Product";
import { formatAmount, formatNumber } from "../../../utils/NumberUtil";
import './ProductItem.css';

const ProductItem = ({ title, product }: { title?: string, product: Product }) => (
    <div className="product-detail">
        <p>{title}</p>
        <ul className="product-detail-list">
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Código de barras</b></div>
                <div>{product.barCode}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Nombre</b></div>
                <div>{product.name}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Categoría</b></div>
                <div>{product.category}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Costo unitario</b></div>
                <div>{formatAmount(product.unitaryCost)}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Precio unitario</b></div>
                <div>{formatAmount(product.unitaryPrice)}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Unidad del precio</b></div>
                <div>{unityMap().get(product.unity!)?.stockLabel}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Stock actual</b></div>
                <div>{formatNumber(product.stock)}</div>
            </li>
        </ul>
    </div>
)


export default ProductItem;