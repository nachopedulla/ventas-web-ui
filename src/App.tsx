import { CategoriesContextProvider } from './context/CategoryContext';
import { ExpenseContextProvider } from './context/ExpenseContext';
import { ProductProvider } from './context/ProductContext';
import { SaleContextProvider } from './context/SaleContext';
import { UserProvider } from './context/UserContext';

import Router from './router/Router';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBuHN3GhNCGdxBxGdtjdRWRcD6lOcJAdk0",
  authDomain: "test-ventas-44545.firebaseapp.com",
  projectId: "test-ventas-44545",
  storageBucket: "test-ventas-44545.appspot.com",
  messagingSenderId: "1061601153337",
  appId: "1:1061601153337:web:a6192f65fb9e21461158e8"
};

// Initialize Firebase
export const firestore = getFirestore(initializeApp(firebaseConfig));

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
