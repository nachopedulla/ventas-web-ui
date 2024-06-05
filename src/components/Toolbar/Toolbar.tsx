import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import './Toolbar.css';
import { useUser } from '../../context/UserContext';
import { FaRegUser } from '@react-icons/all-files/fa/FaRegUser';
import { IoIosSettings } from '@react-icons/all-files/io/IoIosSettings';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Toolbar = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const user = useUser();
    const navigate = useNavigate();

    return (
        <div className="toolbar">
            <div className='title'>
                <h3>[Nombre de la aplicacion]</h3>
            </div>
            <IconButton id='user-button' onClick={handleClick}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: '#c1203d' }}><FaRegUser size={15} /></Avatar>
            </IconButton>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuItem className='label-menu-item'>Hola, {user.get().name}!</MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <IoIosSettings />
                    </ListItemIcon>
                    Configuración
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        user.logout();
                        navigate('/login');
                    }}>
                    <ListItemIcon>
                        <IoIosLogOut />
                    </ListItemIcon>
                    Salir
                </MenuItem>
            </Menu>
        </div>
    )
};

export default Toolbar;