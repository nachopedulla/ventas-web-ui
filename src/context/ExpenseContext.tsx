
import React, { useState } from "react";
import { Expense } from "../models/Expense";
import { EXPENSES } from "../mocks/ExpenseMock";

const ExpenseContext = React.createContext({
    get: () : Array<Expense> => [], /* TODO: filtros y parametros de paginado */
    getById: (id: string) : Expense | undefined => undefined,
    add: (expense: Expense) => { },
    remove: (id: string) => { }
})

const ExpenseContextProvider = (props: any) => {

    const [expenses, setExpenses] = useState<Array<Expense>>(EXPENSES);
    
    const get = () : Array<Expense> => {
        return expenses;
    }
    

    const getById = (id: string) : Expense | undefined  => {
        return expenses.find(expense => expense.id === id)!;
    }

    const add = (expense: Expense) => {
        expense.id = Date.now().toString();
        expense.date = new Date();
        setExpenses([...expenses, expense]);
    }

    const remove = (id: string) => {
        var auxExpenses = expenses.filter(e => id !== e.id)
        setExpenses([...auxExpenses]);
    }

    return (
        <ExpenseContext.Provider value={{ get, getById, add, remove }} {...props} />
    )
}

const useExpenses = () => React.useContext(ExpenseContext);


export { ExpenseContextProvider, useExpenses };