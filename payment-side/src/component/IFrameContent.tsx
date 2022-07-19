import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TransactionEnum } from "../Enum/TransactionEnum";
import animation from "../Animation/click-blue.json"
import Lottie from "react-lottie";
import './IFrameContent.css'
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
    const defaultOptions = {
        loop: true,
        autoplay: true,
        // here is where we will declare lottie animation
        // "animation" is what we imported before animationData: animation,
        animationData: animation,
        rendererSettings: {
           preserveAspectRatio: "xMidYMid slice",
        },
     };
  
    return (
        <div id="iframe-body">
            <h1 id="heading" style={{margin:'15px',color:"blue"}}>Amount to be paid:<span style={{color:"#0093af",fontFamily:"Georgia"}}>₹{recievedMessage}</span></h1>
            <Lottie options={defaultOptions} height={300} width={300} />
            <Button className="margin" variant="outlined" color="primary" style={{margin:'5px'}} onClick={()=>{onClickOfButton(TransactionEnum.success)}}>
                Success
            </Button>
            <Button className="margin" variant="outlined" color="secondary" style={{margin:'5px'}} onClick={()=>{onClickOfButton(TransactionEnum.failure)}}>
                Failure
            </Button>
        </div>
    )
}

export default IframeChildContent;