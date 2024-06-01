import { Button } from '@mui/material';
import './Modal.css';

const Modal = (
    { show, cancel, confirm, children }: { show: boolean, cancel: Function, confirm: Function, children: React.ReactNode }
) => show ? (
    <div className="sidedrawer">
        <div className="modal">
            { children }
            <div className='confirmation-buttons'>
                <Button
                    onClick={() => confirm()}
                >
                    Confirmar
                </Button>
                <Button
                    onClick={() => cancel()}
                    color='error'
                >
                    Cancelar
                </Button>
            </div>
        </div>
    </div>
) : null;

export default Modal;