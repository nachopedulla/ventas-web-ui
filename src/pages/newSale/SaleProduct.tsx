import { SaleItem, total } from "../../models/Sale";
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { RiSubtractFill } from "@react-icons/all-files/ri/RiSubtractFill";
import { formatAmount } from "../../utils/NumberUtil";
import './SaleProduct.css';
import { Unity, unityMap } from "../../models/Product";
import { InputAdornment, TextField } from "@mui/material";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import TooltipIconButton from "../../components/TooltipIconButton/TooltipIconButton";

const SaleProduct = ({ item, changeHandler }: { item: SaleItem, changeHandler: Function }) => {

    return (
        <div className="sale-product-container" >
            <div className="sale-product-name"> {item.name} </div>
            <div className="sale-product-price">
                {formatAmount(item.price)} x {item.unity}
            </div>
            <div className="sale-product-price">{formatAmount(total(item))}</div>
            {
                item.unity === Unity.Unidad ?
                    (
                        <div className="sale-product-buttons">
                            <div className="sale-product-button">
                                <RiSubtractFill size={14} onClick={() => changeHandler(item, item.count - 1)} />
                            </div>
                            <TextField
                                className="sale-product-text"
                                size="small"
                                style={{ width: '50px' }}
                                value={item.count}
                                variant="outlined"
                                type='number'
                                onChange={(event) => {
                                    alert(event.target.value);
                                    changeHandler(item, event.target.value)}
                                }
                                InputProps={{
                                    style: { fontSize: '.8rem' },
                                }}
                            />
                            <div className="sale-product-button">
                                <FiPlus size={14} onClick={() => changeHandler(item, item.count + 1)} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <TextField
                                className="sale-product-text"
                                size="small"
                                style={{ width: '90px' }}
                                value={item.count}
                                variant="outlined"
                                type='number'
                                onChange={(event) => changeHandler(item, event.target.value)}
                                InputProps={{
                                    style: { fontSize: '.9rem' },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {unityMap().get(item.unity)?.label}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                    )
            }
            <TooltipIconButton
                icon={<FaTrash size={ 13 } color='#c11f1f' />}
                title="Eliminar"
                handler={ () => changeHandler(item, 0) }
            />
        </div>
    )
}

export default SaleProduct;