import React from "react"
import './SaleItems.css'
import { SaleItem, total, unitaryPrice } from "../../../models/Sale"
import { formatAmount, formatNumber } from "../../../utils/NumberUtil"
import { Unity, unityMap } from "../../../models/Product"


const SaleProductItem = ({ item }: { item: SaleItem }) => {
    const saleUnity = unityMap().get(item.unity);
    return (
        <div className='sale-product-item'>
            <div className='sale-product-name-and-code'>
                <p>{item.name}</p>
                <p className='sale-product-barcode'>#{item?.barcode}</p>
            </div>
            <p className='sale-product-count-or-price'>
                { unitaryPrice(item.price, item.unity) }
            </p>
            <p className='sale-product-count-or-price'>
                {formatNumber(item.count)} {saleUnity!.label}
            </p>
            <p className="sale-product-count-or-price">{formatAmount(total(item))} </p>
        </div >
    )
}

export default React.memo(SaleProductItem);