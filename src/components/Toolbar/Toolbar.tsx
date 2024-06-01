import { Button } from '@mui/material';
import './Toolbar.css';

const Toolbar = () => (
    <div className="toolbar">
        <div className='title'>
            <h3>[Nombre de la aplicacion]</h3>
        </div>
        <Button
            variant='text'
        >
            [Usuario]
        </Button>
    </div>
);

export default Toolbar;