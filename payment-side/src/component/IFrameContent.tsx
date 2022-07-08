import { useEffect, useState } from "react";

const IframeChildContent=()=>{
    
    window.addEventListener('load',()=>{
        window.postMessage("IframeContentLoaded","http://localhost:3000")
    });
    
    const [recievedMessage,setRecievedMessage]=useState<string>("");

    
    useEffect(()=>{
        window.addEventListener("message",function(e){
            if(e.origin!=='http://localhost:3000') return;
            console.log(e)
            setRecievedMessage(e.data)
        })
        window.parent.postMessage("~Hello from APP-2~", "http://localhost:3000");
    },[recievedMessage])

    return(
    <div>
        <h1>{recievedMessage}</h1>
    </div>
    )
}
export default IframeChildContent;