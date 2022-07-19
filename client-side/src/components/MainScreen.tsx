//IntrinsicAttributes
import React from 'react'
import IFrame from "./IFrame";
import './MainScreen.css'
import { MouseEventHandler, useEffect, useState } from "react";
import {Box, Button, CircularProgress, IconButton, InputAdornment, OutlinedInput, Typography } from  "@material-ui/core"

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {TransactionEnum} from '../Enum/TransactionEnum'

import { useTranslation } from "react-i18next";
import { namespaces } from "../i18n/i18n.constants";
import { i18n } from '../i18n/i18n';

import imageFile from "../images/payment.jpg";

import { askForPermissioToReceiveNotifications } from "../Firebase/pushNotification";
import firebase from 'firebase/compat';

const IframeParent=()=>{
  
  const { t } = useTranslation(namespaces.pages.hello);
    
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  
    const styles = {
     root: {
         color: 'blue'
       },
    };

    const [toggle,setToggle]=useState<boolean>(false);
    const [inputValue,setInputValue]=useState<string>("")
    const [buttonProperty,setButtonProperty]=useState({
        'text':"Make Payment",
    })

    const ToggleElements:MouseEventHandler<HTMLButtonElement> | undefined=()=>{  
        setToggle(prevState=>!prevState)
    }
    // useEffect(()=>{
    //     const messaging=Firebase.messaging();
    // },[])

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
            if(e.data===TransactionEnum.success)
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
    }, []);

    return(
        <div className=".main">
        <Button style={{  position: "fixed",top: "25px",right: "25px"}} variant="contained" color="secondary">
            Subscribe
        </Button>
        <h1 style={{color:"blue"}}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
        <Button onClick={changeLanguage("en")}>English</Button>
        <Button onClick={changeLanguage("hi")}>हिंदी</Button>
        <br></br>
        <img src={imageFile} alt="image" style={{width:"30%",height:"30%"}}/>
        <br></br>
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
                            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        />
                        <br></br>
                        <Button  variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text}</Button>
                    </>
            }
        </div>
    )
}
export default IframeParent;