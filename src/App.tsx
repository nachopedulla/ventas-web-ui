import { ProductProvider } from './context/ProductContext';
import Router from './Router';

function App() {
  return (
      <ProductProvider>
        <Router/>
      </ProductProvider>
  );
}

//<Movements title='Ventas'/>
export default App;
