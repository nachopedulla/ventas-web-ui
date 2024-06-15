
import React, { useState } from "react";
import { Sale } from "../models/Sale";
import { SALES_DATA } from "../mocks/SalesMock";

const SaleContext = React.createContext({
    get: (): Array<Sale> => [], /* TODO: filtros y parametros de paginado */
    getById: (id: string) : Sale | undefined => undefined
})

const SaleContextProvider = (props: any) => {

    const [sales, setSales] = useState<Array<Sale>>(SALES_DATA);
    
    const get = () : Array<Sale> => {
        return sales;
    }

    const getById = (id: string) : Sale | undefined  => {
        return sales.find(sale => sale.id === id)!;
    }

    return (
        <SaleContext.Provider value={{ get, getById }} {...props} />
    )
}

const useSales = () => React.useContext(SaleContext);


export { SaleContextProvider, useSales };