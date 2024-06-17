import { CategoriesContextProvider } from './context/CategoryContext';
import { ExpenseContextProvider } from './context/ExpenseContext';
import { ProductProvider } from './context/ProductContext';
import { SaleContextProvider } from './context/SaleContext';
import { UserProvider } from './context/UserContext';

import Router from './router/Router';

function App() {
  return (
    <UserProvider>
      <ExpenseContextProvider>
        <SaleContextProvider>
          <CategoriesContextProvider>
            <ProductProvider>
              <Router />
            </ProductProvider>
          </CategoriesContextProvider>
        </SaleContextProvider>
      </ExpenseContextProvider>
    </UserProvider>
  );
}

//<Movements title='Ventas'/>
export default App;
