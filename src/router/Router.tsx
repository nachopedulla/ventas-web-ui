import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import StockDetail from "../pages/StokDetail/StockDetail";
import StockProvider from "../pages/Stock/StockProvider";
import SalesProvider from "../pages/Sales/SalesProvider";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import SaleDetail from "../pages/SaleDetail/SaleDetail";
import NewSale from "../pages/NewSale/NewSale";
import ExpensesProvider from "../pages/Expense/ExpensesProvider";
import ExpenseItem from "../pages/ExpenseDetail/ExpenseDetail";
import ExpenseDetail from "../pages/ExpenseDetail/ExpenseDetail";

/*
  <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}> 
  <BrowserRouter>
*/

const Router = () => {

  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <Routes >
        <Route element={<ProtectedRoute />}>
          <Route
            element={<Layout />}
          >
            <Route
              path="/ventas"
              element={<SalesProvider />}
            />
            <Route
              path="/gastos"
              element={<ExpensesProvider />}
            />
            <Route
              path="/stock"
              element={<StockProvider />}
            />
            <Route
              path="/productos/nuevo"
              element={
                <StockDetail
                  title="Nuevo Producto"
                />
              }
            />
            <Route
              path="/productos/:productId"
              element={
                <StockDetail
                  title="Detalle de producto"
                />
              }
            />
            <Route
              path="/gastos/nuevo"
              element={
                <ExpenseDetail
                  title="Nuevo Gasto"
                />
              }
            />
            <Route
              path="/gastos/:expenseId"
              element={
                <ExpenseDetail
                  title="Detalle de gasto"
                />
              }
            />
            <Route
              path="/ventas/:saleId"
              element={
                <SaleDetail />
              }
            />
            <Route
              path='/ventas/nueva'
              element={<NewSale />}
            />
            < Route path="/" element={<SalesProvider />} />
          </Route>
        </Route>
        < Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter >
  )
};

export default Router;
