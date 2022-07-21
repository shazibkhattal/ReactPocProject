import React,{ useEffect, useState } from 'react';
import './IFrame.css'
const IFrame =({inputValue}:{inputValue:string})=>{

const [load,setLoad]=useState<boolean>(false)

// function afterIFrameLoaded(){
//     setLoad(prevState=>!prevState)
// }

useEffect(()=>{
   if(load)
    { 
        const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
        input !== null && input.tagName === 'IFRAME'
        let frame:HTMLElement|any = document.getElementById('pFrame');
        if (isIFrame(frame) && frame.contentWindow) {
             console.log("Hello from APP1")
             frame.contentWindow.postMessage(inputValue, 'http://localhost:3001/');
             console.log("called")
        }
       // setLoad(prevState=>!prevState)
    }
},[load]);

return(
<>
    <iframe
        id="pFrame"
        src="http://localhost:3001/IFrameContent"
        width="500"
        height="500"     
        className='main'
        loading="lazy"
        onLoad={async()=>{
            setLoad(prevState=>!prevState)
        }}
        scrolling="no"
    />
</>
)
}
export default IFrame;