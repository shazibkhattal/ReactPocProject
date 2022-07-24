import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";

const SnackBarNotification=({notification,open,setOpen}:
    {
        open:boolean,
        setOpen:React.Dispatch<React.SetStateAction<boolean>>,
        notification:{title: string;body: string;}
    })=>{
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    return(
        <Snackbar style={{ right: "0px" }} open={open} autoHideDuration={6000} onClose={handleClose} >
                < Alert elevation={4}
                    variant="filled" onClose={()=>{setOpen(false);}} severity="success">
                    <strong >{notification.title}:</strong><p>{notification.body}</p>
                </Alert>
            </Snackbar>
    );
}
export default React.memo(SnackBarNotification);
//React.memo only render if any of props recieved changes