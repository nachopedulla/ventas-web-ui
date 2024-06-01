import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProductDetail from "./pages/product/ProductItem";
import StockProvider from "./pages/stock/StockProvider";
import SalesProvider from "./pages/sales/SalesProvider";

const Router = () => {
  return (
    <BrowserRouter  basename={process.env.PUBLIC_URL}> 
      <Routes>
        <Route
          element={<Layout />}
        >
          <Route
            path="/ventas"
            element={<SalesProvider/>}
          />
          <Route
            path="/gastos"
            element={<SalesProvider />}
          />
          <Route
            path="/stock"
            element={ <StockProvider />}
          />
          <Route
            path="/productos/nuevo"
            element={
              <ProductDetail
                title="Nuevo Producto"
              />
            }
          />
          <Route
            path="/productos/:productId"
            element={
              <ProductDetail
                title="Detalle de producto"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;
