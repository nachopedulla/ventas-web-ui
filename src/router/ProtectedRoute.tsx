
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    return useUser().isLogged() ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoute;