
import React, { useState } from "react";
import { Sale, SearchRequest } from "../models/Sale";
import { SALES_DATA } from "../mocks/SalesMock";

import { collection, endAt, getCount, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore/lite';
import { firestore } from "../App";
import { PAGE_SIZE } from "../utils/PaginationUtil";

const SaleContext = React.createContext({
    get: async (searchRequest: SearchRequest) : Promise<Array<Sale>> => [], /* TODO: filtros y parametros de paginado */
    getNext: async (searchRequest : SearchRequest, sale: Sale) : Promise<Array<Sale>> => [], /* TODO: filtros y parametros de paginado */
    getPrevious: async (searchRequest : SearchRequest, sale: Sale) : Promise<Array<Sale>> => [], /* TODO: filtros y parametros de paginado */
    getById: (id: string) : Sale | undefined => undefined,
    add: (sale: Sale) => { },
    remove: (id: string) => {},
    count: (searchRequest : SearchRequest) : number => 0
})

const SaleContextProvider = (props: any) => {

    const [sales, setSales] = useState<Array<Sale>>(SALES_DATA);

    const salesCollection = collection(firestore, "sales")
    
    const get = async (searchRequest : SearchRequest) : Promise<Array<Sale>> =>  {
        const searchQuery = query(
            salesCollection, 
            ...filters(searchRequest),
            orderBy('date', 'desc'), 
            limit(PAGE_SIZE)
        );
        const snapshot = await getDocs(searchQuery);
        const docs =  snapshot.docs.map(doc => { return {...doc.data(), id: doc.id } as Sale} );
        return docs;
    }

    const getNext = async (searchRequest : SearchRequest, sale: Sale) : Promise<Array<Sale>> =>  {
        const searchQuery = query(
            salesCollection, 
            ...filters(searchRequest),  
            orderBy('date', 'desc'), 
            startAfter(sale.date), 
            limit(PAGE_SIZE)
        );
        const snapshot = await getDocs(searchQuery);
        const docs =  snapshot.docs.map(doc => { return {...doc.data(), id: doc.id } as Sale} );
        console.log(docs);
        return docs;
    }

    const getPrevious = async (searchRequest : SearchRequest, sale: Sale) : Promise<Array<Sale>> =>  {
        const searchQuery = query(
            salesCollection, 
            ...filters(searchRequest), 
            orderBy('date', 'desc'), 
            endAt(sale.date), 
            limit(PAGE_SIZE)
        );
        const snapshot = await getDocs(searchQuery);
        const docs =  snapshot.docs.map(doc => { return {...doc.data(), id: doc.id } as Sale} );
        return docs;
    }


    const getById = (id: string) : Sale | undefined  => {
        return sales.find(sale => sale.id === id)!;
    }

    const add = (sale: Sale) => {
        sale.id = Date.now().toString();
        sale.date = new Date();
        setSales([...sales, sale]);
    }

    const remove = (id: string) => {
        setSales([...sales.filter(sale => sale.id !== id)]);
    }

    const count = async (searchRequest : SearchRequest) => {
        const sasd = (await getCount(query(salesCollection, ...filters(searchRequest)))).data().count;
        console.log(sasd);
        return sasd;
    }

    const filters = (searchRequest : SearchRequest) : Array<any> => {
        return [
            (searchRequest.paymentMethod !== undefined && searchRequest.paymentMethod !== 'Todos') ? 
                where('paymentMethod', '==', searchRequest.paymentMethod) 
                : undefined,
            (searchRequest.dateFrom) ? where('date', '>', new Date(searchRequest.dateFrom)) : undefined,
            (searchRequest.dateUntil) ? where('date', '<', new Date(searchRequest.dateUntil)) : undefined,
        ].filter(queryFilter => queryFilter !== undefined);
    }

    return (
        <SaleContext.Provider value={{ get, getById, add, count, getNext, getPrevious }} {...props} />
    )
}

const useSales = () => React.useContext(SaleContext);


export { SaleContextProvider, useSales };