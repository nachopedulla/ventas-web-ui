import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import StockDetail from "../pages/StokDetail/StockDetail";
import StockProvider from "../pages/stock/StockProvider";
import SalesProvider from "../pages/sales/SalesProvider";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import SaleDetail from "../pages/saleDetail/SaleDetail";
import NewSale from "../pages/newSale/NewSale";

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
              element={<SalesProvider />}
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
              path="/ventas/:saleId"
              element={
                <SaleDetail/>
              }
            />
            <Route
              path='/ventas/nueva'
              element={ <NewSale /> }
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
