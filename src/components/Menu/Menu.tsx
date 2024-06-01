import { useNavigate } from 'react-router-dom';
import './Menu.css';
import MenuItem from './MenuItem';

const Menu = () => {

    const navigate = useNavigate();

    const navigateToPath = (path : string) => {
        navigate(path);
    }

    return (
        <div className="menu">
            <MenuItem 
                text="Ventas" 
                route='ventas'
                handler={navigateToPath}
            />
            <MenuItem 
                text="Gastos" 
                route='gastos'
                handler={navigateToPath}
            />
            <MenuItem 
                text="Stock" 
                route='stock'
                handler={navigateToPath}
            />
            <MenuItem 
                text="Reportes" 
                route='reportes'
                handler={navigateToPath}
            />
        </div>
    );
}

export default Menu