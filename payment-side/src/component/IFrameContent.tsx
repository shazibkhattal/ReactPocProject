import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const IframeChildContent = () => {
    
    window.addEventListener('load', () => {
        window.postMessage("IframeContentLoaded", "http://localhost:3000")
    });

    const [recievedMessage, setRecievedMessage] = useState<string>("");

    useEffect(() => {
        window.addEventListener("message", function (e) {
            if (e.origin !== 'http://localhost:3000') return;
            console.log(e)
            setRecievedMessage(e.data)
        })
    }, [recievedMessage])

    function onClickOfButton(action:string) {
        window.parent.postMessage(action, "http://localhost:3000");
    }

    return (
        <div>
            <Typography variant="h6" component="h6"  style={{margin:'15px'}}>Amount to be paid:₹{recievedMessage}</Typography >

            <Button className="margin" variant="outlined" color="primary" style={{margin:'5px'}} onClick={()=>{onClickOfButton("success")}}>
                Success
            </Button>
            <Button className="margin" variant="outlined" color="secondary" style={{margin:'5px'}} onClick={()=>{onClickOfButton("failure")}}>
                Failure
            </Button>
        </div>
    )
}

export default IframeChildContent;