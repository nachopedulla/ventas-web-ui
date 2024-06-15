import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { PaymentMethod, Sale, total, unitaryPrice } from "../../../models/Sale";
import { useState } from "react";
import { formatAmount } from "../../../utils/NumberUtil";
import { unityMap } from "../../../models/Product";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";

const SaleConfirmation = (
    { sale, changeHandler }: 
    { sale: Sale, paymentMethod: PaymentMethod, changeHandler: Function}
) => {

    const [paid, setPaid] = useState<number | undefined>();

    return (
        <>
            <>
                <div className="product-detail">
                    <h4>{'Detalle de la venta'}</h4>
                    <ul className="product-detail-list" style={{ gap: '15px' }}>
                        <li className="product-detail-item">
                            <div className="product-detail-title"><b>Total</b></div>
                            <div>{formatAmount(sale.amount)}</div>
                        </li>
                        <li className="product-detail-item">
                            <div className="product-detail-title"><b>Medio de pago</b></div>
                            <TextField
                                className="filter"
                                select
                                variant="standard"
                                value={sale.paymentMethod}
                                InputProps={{
                                    style: { fontSize: '.8rem' },
                                }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(event) => changeHandler(event.target.value as PaymentMethod)}
                            >
                                <MenuItem value={PaymentMethod.EFECTIVO}> EFECTIVO </MenuItem>
                                <MenuItem value={PaymentMethod.TRANSFERENCIA}> TRANSFERENCIA </MenuItem>
                                <MenuItem value={PaymentMethod.TARJETA}> TARJETA </MenuItem>
                            </TextField>
                        </li>
                        {
                            sale.paymentMethod === PaymentMethod.EFECTIVO ? (
                                <>
                                    <li className="product-detail-item">
                                        <div className="product-detail-title"><b>Paga con</b></div>
                                        <TextField
                                            className="filter"
                                            variant="standard"
                                            type="number"

                                            value={paid}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={(event) => setPaid(Number.parseFloat(event.target.value))}
                                            InputProps={{
                                                style: { fontSize: '.9rem' },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FaDollarSign />
                                                    </InputAdornment>
                                                ),
                                            }}

                                        />
                                    </li>
                                    <li className="product-detail-item">
                                        <div className="product-detail-title"><b>Vuelto</b></div>
                                        <div>{formatAmount((paid === undefined ? 0 : paid!) - sale.amount!)} </div>
                                    </li>
                                </>
                            ) : null
                        }
                    </ul>
                    <div style={{ gap: '5px', lineHeight: '1px', width: '600px', margin: '20px auto 0px auto' }}>
                        <>
                            <h5>Items</h5>
                            <div style={{ maxHeight: '300px', overflow: 'scroll' }}>
                                {
                                    sale.items?.map(item => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.9rem', padding: '0px 10px' }}>
                                            <p style={{ width: '240px', overflow: 'elipsis', textAlign: 'start' }}>{item.name}</p>
                                            <p style={{ width: '80px', textAlign: 'end' }}>
                                                {item.count}{unityMap().get(item.unity)?.label}
                                            </p>
                                            <p style={{ width: '150px', textAlign: 'end' }}>
                                                {unitaryPrice(item.price, item.unity)}
                                            </p>
                                            <p style={{ width: '130px', textAlign: 'end' }}>{formatAmount(total(item))}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    </div>
                </div>
            </>
        </>
    )

}

export default SaleConfirmation;
