import { useState } from "react"
import { PaymentMethod, Sale, SaleItem, total } from "../../models/Sale"
import { Button, InputAdornment, TableCellProps, TextField } from "@mui/material"
import TooltipIconButton from "../../components/TooltipIconButton/TooltipIconButton"
import { FaBarcode } from "@react-icons/all-files/fa/FaBarcode"
import { useProducts } from "../../context/ProductContext"
import SaleProduct from "./components/SaleProduct"
import ResultTable from "../../components/Table/ResultTable"
import { formatAmount } from "../../utils/NumberUtil"
import { Unity, unityMap } from "../../models/Product"
import { IoMdAddCircle } from "@react-icons/all-files/io/IoMdAddCircle";
import PageTitle from "../../components/PageTitle/PageTitle"
import Modal from "../../components/Modal/Modal"
import SaleConfirmation from "./components/SaleConfirmation"
import { useSales } from "../../context/SaleContext"
import { useNavigate } from "react-router-dom"
import './NewSale.css';

const HEADERS = [
    {
        id: 'barCode',
        label: 'Código de barras',
        align: 'left' as TableCellProps["align"]
    },
    {
        id: 'name',
        label: 'Nombre',
        align: 'left' as TableCellProps["align"]
    },
]

const NewSale = () => {

    const [sale, setSale] = useState<Sale>({ paymentMethod: PaymentMethod.EFECTIVO, items: [] })
    const [search, setSeach] = useState<string>();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const sales = useSales();
    const navigate = useNavigate();
    const products = useProducts();

    const filteredProducts = () => {
        return products.get().filter(product => {
            return search === undefined ||
                product.name?.toUpperCase().includes(search!.toUpperCase()) ||
                product.barCode?.toUpperCase().includes(search!.toUpperCase())
        });
    }

    const addItem = (id: string) => {
        const currentItem = sale.items?.find(item => item.id === id);
        currentItem === undefined ? newItem(id) : updateItem(currentItem, currentItem.count + 1)
    }

    const updateItem = (currentItem: SaleItem, count: number | string) => {
        const auxSale = { ...sale };
        const index = auxSale.items?.indexOf(currentItem!);
        if (count === 0) {
            auxSale.items!.splice(index!, 1);
        } else {
            currentItem.count = count as number > 99 && currentItem.unity === Unity.Unidad ? 99 : count as number;
            auxSale.items![index!] = currentItem!;
        }
        auxSale.amount = auxSale.items?.map(item => total(item)).reduce((a, b) => a + b, 0);
        setSale(auxSale);
    }

    const newItem = (id: string) => {
        const auxSale = { ...sale };
        const product = products.getById(id)!;
        auxSale.items?.push({
            id: id,
            name: product.name!,
            barcode: product.barCode!,
            price: product.
                unitaryPrice!,
            category: product.category!,
            count: product.unity === Unity.Unidad ? 1 : 0,
            unity: product.unity!
        })
        auxSale.amount = auxSale.items?.map(item => total(item)).reduce((a, b) => a + b, 0);
        setSale(auxSale);
    }

    const actions = [
        {
            id: 'Agregar',
            icon: <IoMdAddCircle size={20} />,
            handler: addItem
        }
    ]

    const confirmSale = () => {
        sales.add(sale);
        sale.items?.map(item => {
            const count = item.unity === Unity.Unidad ? item.count :  item.count / unityMap().get(item.unity)!.scale;
            products.updateStockOnSale(item.id, count)
        });
        navigate('/ventas');
    }

    const paymentMethodHandler = (paymentMethod: PaymentMethod) => {
        const auxSale = { ...sale };
        auxSale.paymentMethod = paymentMethod;
        setSale(auxSale)
    }

    return (
        <>
            <PageTitle text="Nueva venta" />
            <div className="sale-products-container">
                <div className="sale-products-filter">
                    <TextField
                        className='filter'
                        style={{ width: '100%' }}
                        label='Buscar producto'
                        value={search}
                        onChange={(event) => setSeach(event.target.value)}
                        InputProps={{
                            inputProps: { min: 0, max: 99 },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <TooltipIconButton
                                        title="Escanear"
                                        icon={<FaBarcode size={14} />}
                                        handler={() => { }}
                                    />
                                </InputAdornment>
                            )
                        }}
                    />
                    <div className="sale-product-table">
                        <ResultTable
                            headers={HEADERS}
                            data={filteredProducts()}
                            actions={actions}
                        />
                    </div>
                </div >
                {
                    sale?.items?.length !== undefined && sale?.items.length > 0 ? (
                        <div className="sale-items-detail">
                            <div className="sale-items-detail-container">
                                {
                                    sale?.items?.map(item => {
                                        return <SaleProduct changeHandler={updateItem} item={item} />
                                    })
                                }
                            </div>
                            <div className="total-container">
                                <p>Total</p>
                                <p>{formatAmount(sale.amount)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="success"
                                    onClick={() => setShowConfirmation(true)}
                                >
                                    CONTINUAR
                                </Button>
                            </div>
                        </div>
                    ) : null
                }
                <Modal
                    cancel={() => setShowConfirmation(false)}
                    confirm={confirmSale}
                    show={showConfirmation}
                >
                    <SaleConfirmation
                        sale={sale}
                        paymentMethod={sale.paymentMethod!}
                        changeHandler={paymentMethodHandler}
                    />
                </Modal>
            </div>
        </>
    )
}

export default NewSale;