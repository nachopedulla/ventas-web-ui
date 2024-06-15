import React from "react";
import { SaleItem, total } from "../../../models/Sale";
import SaleProductItem from "./SaleProductItem";
import './SaleItems.css';
import { formatAmount } from "../../../utils/NumberUtil";

const SaleItems = ({ items }: { items: Array<SaleItem> | undefined }) => (
    <div className='sale-items-container'>
        <div className='sale-items-list'>
            <div className="sale-product-item">
                <p className='sale-product-name-and-code'><b>Producto</b></p>
                <p className="sale-product-count-or-price"><b>Precio unitario</b></p>
                <p className="sale-product-count-or-price"><b>Unidades</b></p>
                <p className="sale-product-count-or-price"><b>Total</b></p>
            </div>
            {items?.map(item => <SaleProductItem item={item} />)}
        </div>
        <div className="sale-items-total">
            <p>Total</p>
            <p>{ formatAmount(items?.map(item => total(item)).reduce((a, b) => a + b , 0)) }</p>
        </div>
    </div>
)

export default React.memo(SaleItems);