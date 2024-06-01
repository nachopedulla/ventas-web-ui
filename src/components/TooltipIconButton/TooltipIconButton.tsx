import { IconButton, Tooltip } from "@mui/material"
import React from "react"

const TooltipIconButton = ({title, icon, handler} : {title:string, icon: React.ReactNode, handler: Function}) => (
    <Tooltip title={title}>
        <IconButton onClick={() => handler()}>
            {icon}
        </IconButton> 
    </Tooltip>
);

export default TooltipIconButton