
import React from "react";
import moment from "moment";
import { Product } from "../models/Product";
import { PRODUCT_DATA } from "../mocks/ProductMock";


const ProductContext = React.createContext({
    get: (): Array<Product> => [],
    getById: (id: string): Product | undefined => undefined,
    remove: (id: string | undefined) => { },
    upsert: (product: Product) => { }
});

const ProductProvider = (props: any) => {

    const get = () : Array<Product> => {
        var products = localStorage.getItem('products');
        if (products === null || expiration() < new Date()) {
            setItems(PRODUCT_DATA);
            products = JSON.stringify(PRODUCT_DATA);
            /* Sets the expiration to 30 minutes */
            setExpiration(moment(new Date()).add(30, 'm').toDate());
        }
        return JSON.parse(products);
    }

    const getById = (id: string): Product | undefined => {
        return get().find(product => product.id === id);
    }

    const upsert = (product: Product) => {
        if (product.id === undefined) {
            add(product);
        } else {
            update(product);
        }
    }

    function add(product: Product) {
        var products = get();
        /* TODO: add on BE */
        product.id = Date.now().toString();
        products.push(product);
        setItems(products);
    }

    function update(newProduct: Product) {
        var existingProduct = getById(newProduct.id!)!;
        existingProduct.barCode = newProduct.barCode;
        existingProduct.category = newProduct.category;
        existingProduct.description = newProduct.description;
        existingProduct.name = newProduct.name;
        existingProduct.stock = newProduct.stock;
        existingProduct.unitaryCost = newProduct.unitaryCost;
        existingProduct.unitaryPrice = newProduct.unitaryPrice;

        var items = get().filter(product => product.id !== newProduct.id);
        items.push(newProduct);
        setItems(items);
    }

    function remove(id: string | undefined) {
        /* TODO: remove on BE */
        var products = get().filter(product => product.id !== id);
        setItems(products);
    }

    function setItems(products: Array<any>) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function expiration(): Date {
        var expiration = localStorage.getItem('expiration');
        if (expiration === null) {
            setExpiration(new Date());
            return new Date();
        }
        return new Date(Date.parse(expiration));
    }

    function setExpiration(date: Date) {
        localStorage.setItem('expiration', date.toISOString());
    }

    return (
        <ProductContext.Provider value={{ get, getById, upsert, remove }} {...props} />
    )
}

const useProducts = () => React.useContext(ProductContext);


export { ProductProvider, useProducts };