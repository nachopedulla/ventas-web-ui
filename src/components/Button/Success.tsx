import { Button } from "@mui/material";


const SuccessIconButton = (
    {text, icon, handler} : {text: string, icon: React.ReactNode, handler: Function}) => (
    <Button 
        style={{marginTop: '30px'}}
        size='small'
        color='success'
        endIcon={icon}
        onClick={() => handler()}
    >
        {text}
    </Button>
)

export default SuccessIconButton;