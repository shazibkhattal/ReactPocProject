//IntrinsicAttributes

import IFrame from "./IFrame";
import './MainScreen.css'
import { MouseEventHandler, useEffect, useState } from "react";
import {Box, Button, CircularProgress, InputAdornment, OutlinedInput, Typography } from  "@material-ui/core"

const IframeParent=()=>{

    const [toggle,setToggle]=useState<boolean>(false);
    const [inputValue,setInputValue]=useState<string>("")
    const [buttonProperty,setButtonProperty]=useState({
        'text':"Make Payment",
    })

    const ToggleElements:MouseEventHandler<HTMLButtonElement> | undefined=()=>{  
        setToggle(prevState=>!prevState)
    }

    function AfterTransaction(){
        setToggle(false)
        setTimeout(()=>{
            setButtonProperty( prevValues => {
                return { ...prevValues,text:"Make Payment"}
             })
        },3000)
    }
    useEffect(() => {
        window.addEventListener("message",function(e){
            if(e.origin!=='http://localhost:3001') return;
            console.log("Recived from APP2:"+e.data)
            if(e.data==="success")
            {   
                console.log("from succes")
                setInputValue("")
                setButtonProperty( prevValues => {
                    return { ...prevValues,text:"Payment Successful"}
                 })
                 AfterTransaction()  
            }
            else
            {
                setButtonProperty( prevValues => {
                    return { ...prevValues,text:"Payment Failed"}
                 })
                 AfterTransaction()  
            }
            
        })
    }, [])

  

    return(
        <div className=".main">
            <Typography variant="h6" component="h6" >Client-Side</Typography >
            {
                toggle===true?   
                    <IFrame
                        inputValue={inputValue}
                    /> 
                    :
                    <>
                        <OutlinedInput 
                            className="nextLine"
                            id="outlined-adornment-weight"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'weight',
                            }}
                        />
                        <br></br>
                        <Button  variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text}</Button>
                    </>
            }
        </div>
    )
}
export default IframeParent;