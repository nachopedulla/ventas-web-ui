import { CategoriesProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';
import Router from './router/Router';

function App() {
  return (
    <UserProvider>
    <CategoriesProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </CategoriesProvider>
    </UserProvider>
  );
}

//<Movements title='Ventas'/>
export default App;
