
import React from "react";
import moment from "moment";
import { CATEGORIES_DATA } from "../mocks/CategoriesMock";

const CategoriesContext = React.createContext({
    get: (): Array<string> => []
});

const CategoriesContextProvider = (props: any) => {

    const get = () : Array<string> => {
        return getAll();
    }

   

    const getAll = () : Array<string> => {
        var categories = localStorage.getItem('categories');
        if (categories === null || expiration() < new Date()) {
            setItems(CATEGORIES_DATA);
            categories = JSON.stringify(CATEGORIES_DATA);
            /* Sets the expiration to 30 minutes */
            setExpiration(moment(new Date()).add(24, 'h').toDate());
        }
        return JSON.parse(categories) as Array<string>;
    }

    function setItems(products: Array<any>) {
        localStorage.setItem('categories', JSON.stringify(products));
    }

    function expiration(): Date {
        var expiration = localStorage.getItem('categories_expiration');
        if (expiration === null) {
            setExpiration(new Date());
            return new Date();
        }
        return new Date(Date.parse(expiration));
    }

    function setExpiration(date: Date) {
        localStorage.setItem('categories_expiration', date.toISOString());
    }

    return (
        <CategoriesContext.Provider value={{ get }} {...props} />
    )
}

const useCategories = () => React.useContext(CategoriesContext);


export { CategoriesContextProvider, useCategories };