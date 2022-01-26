import React, { CSSProperties} from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { AlertProps } from './AlertController';

export type AlertMessageProps = AlertProps & {
    visible: boolean;
}

export const AlertMessage = ({visible, color, message}: AlertMessageProps) => {
    return (
        <div style={style}>
            <Slide direction="up" in={visible}>
                {<Alert severity={color}>{message}</Alert>}
            </Slide>
        </div>
    )
}

const style: CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "50px",

    background: "linear-gradient(to top, white, transparent 100%)",
    width: "400px",
};