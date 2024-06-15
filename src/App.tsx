import { CategoriesContextProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { SaleContextProvider } from './context/SaleContext';
import { UserProvider } from './context/UserContext';

import Router from './router/Router';

function App() {
  return (
    <UserProvider>
      <SaleContextProvider>
        <CategoriesContextProvider>
          <ProductProvider>
            <Router />
          </ProductProvider>
        </CategoriesContextProvider>
      </SaleContextProvider>
    </UserProvider>
  );
}

//<Movements title='Ventas'/>
export default App;
