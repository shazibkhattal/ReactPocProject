import { MouseEventHandler, ReactEventHandler, useEffect, useRef, useState } from "react";
import IFrame from "./IFrame";
import {Box, CircularProgress, Typography } from  "@material-ui/core"

const IframeParent=()=>{

    const [iFrameVisible,setIFrameVisible]=useState<boolean>(false);
    const [buttonVisible,setButtonVisible]=useState<boolean>(true);
    const [IFrameContent,setIFrameContent]=useState<string>("");

    //var sendMessageButton:HTMLButtonElement=document.querySelector("sendMessageButton") as HTMLButtonElement
    
    useEffect(() => {
        window.addEventListener("message",function(e){
            if(e.origin!=='http://localhost:3001') return;
            var dataPassedByChild = JSON.parse(e.data);
            e.data()
            console.log("Recived from APP2:"+dataPassedByChild.buttonColor)
        })
    }, [])
    
    const sendMessage:MouseEventHandler<HTMLButtonElement> | undefined=()=>{  

        setIFrameVisible(prevState=>!prevState)
        setButtonVisible(prevState=>!prevState)
        setTimeout(()=>{
            const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
            input !== null && input.tagName === 'IFRAME'
            let frame:HTMLElement|any = document.getElementById('pFrame');
            if (isIFrame(frame) && frame.contentWindow) {
                 console.log("Hello from APP1")
                 frame.contentWindow.postMessage("Hello from APP1", 'http://localhost:3001/');
             }
        },500)


        // setTimeout(()=>{
        //     setIFrameVisible(prevState=>!prevState)
        //     setButtonVisible(prevState=>!prevState)
        // },9000)
        
        // const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
        // input !== null && input.tagName === 'IFRAME'
        // let frame:HTMLElement|any = document.getElementById('pFrame');
        // frame.style.visibility="visible"
        //  if (isIFrame(frame) && frame.contentWindow) {
        //     console.log("Hello from APP1")
        //     frame.contentWindow.postMessage("Hello from APP1", 'http://localhost:3001/');
        //  }
    }


    return(
        <div className=".main">
            {

            }
            

            <Typography variant="h6" component="h6" >Client-Side</Typography >
            {
                buttonVisible &&(
                    <button id="sendMessageButton" onClick={sendMessage}>Send Message</button>
                )
            }
            {
                iFrameVisible===true?
                    <IFrame 
                    /> 
                    :
                    null
            }
        </div>
    )
}
export default IframeParent;