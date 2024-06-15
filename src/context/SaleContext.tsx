
import React, { useState } from "react";
import { Sale } from "../models/Sale";
import { SALES_DATA } from "../mocks/SalesMock";

const SaleContext = React.createContext({
    get: (): Array<Sale> => [], /* TODO: filtros y parametros de paginado */
    getById: (id: string) : Sale | undefined => undefined,
    add: (sale: Sale) => { }
})

const SaleContextProvider = (props: any) => {

    const [sales, setSales] = useState<Array<Sale>>(SALES_DATA);
    
    const get = () : Array<Sale> => {
        return sales;
    }

    const getById = (id: string) : Sale | undefined  => {
        return sales.find(sale => sale.id === id)!;
    }

    const add = (sale: Sale) => {
        sale.id = Date.now().toString();
        sale.date = new Date();
        setSales([...sales, sale]);
    }

    return (
        <SaleContext.Provider value={{ get, getById, add }} {...props} />
    )
}

const useSales = () => React.useContext(SaleContext);


export { SaleContextProvider, useSales };