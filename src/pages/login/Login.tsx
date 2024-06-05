import { Box, Button, FormControl, TextField } from "@mui/material";
import { useUser } from "../../context/UserContext"
import './Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNotValidEmail, isNotValidPassword } from "../../utils/RequestUtils";

interface LoginRequest {
    username: string,
    password: string
}

const Login = () => {

    const user = useUser();
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const [loginRequest, setLoginRequest] = useState<LoginRequest>({ username: '', password: '' })

    function changeHandler<K extends keyof LoginRequest>(key: K, event: any) {
        let auxRequest = { ...loginRequest };
        auxRequest[key] = event.target.value;
        setLoginRequest(auxRequest);
    }

    function submit() {
        setSubmitted(true);

        if (isNotValidPassword(loginRequest.password) || isNotValidEmail(loginRequest.username)) {
            return;
        }

        try {
            user.login(loginRequest.username, loginRequest.password);
            navigate("/ventas");
        } catch (err: any) {
            /* TODO: TOAST */
        }
    }

    return (
        <div className="login-form">
            <h3 className="login-title">[Nombre de la aplicacion]</h3>
            <TextField
                className="login-textfield"
                required
                type="text"
                label='Email'
                error={submitted && isNotValidEmail(loginRequest.username)}
                onChange={(event) => changeHandler('username', event)}
            />
            <TextField
                className="login-textfield"
                required
                type="password"
                label='Contraseña'
                error={submitted && isNotValidPassword(loginRequest.password)}
                onChange={(event) => changeHandler('password', event)}
            />
            <div className="login-button">
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={submit}
                >
                    Login
                </Button>
            </div>
        </div>
    )

}

export default Login;