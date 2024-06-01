
import './Layout.css';
import Menu from '../Menu/Menu';
import Toolbar from '../Toolbar/Toolbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    
    return (
        <div className="container">
            <Toolbar/>
            <Menu/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout;