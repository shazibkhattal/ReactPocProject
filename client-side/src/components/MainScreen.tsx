//IntrinsicAttributes
import IFrame from "./IFrame";
import './MainScreen.css'
import { MouseEventHandler, useEffect, useState } from "react";
import { Button, InputAdornment, OutlinedInput, Snackbar } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import { TransactionEnum } from '../Enum/TransactionEnum'
import { useTranslation } from "react-i18next";
import { namespaces } from "../i18n/i18n.constants";
import { i18n } from '../i18n/i18n';
import imageFile from "../images/payment.jpg";
import { fetchToken, onMessageListener } from '../Firebase/Firebase';
import React from "react";
import  FirebaseMessageListener  from "../Firebase/FirebaseMessageListener";
const IframeParent = () => {

    const [isSubscribe,setIsSubscribed]=useState(false);
     //FCM Token for client
     const [open, setOpen] = React.useState(false);
     const [notification, setNotification] = useState({ title: '', body: '' });
     const [isTokenFound, setTokenFound] = useState(false);


    //To recieve data from App2 and set button properties
     useEffect(() => {
        const data=localStorage.getItem("isSubscribe")
        
        if(data){
            setIsSubscribed(JSON.parse(data))
        }
        window.addEventListener("message", function (e) {
            if (e.origin !== 'http://localhost:3001') return;
            console.log("Recived from APP2:" + e.data)
            if (e.data === TransactionEnum.success) {
                console.log("from succes")
                setInputValue("")
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Successful" }
                })
                AfterTransaction()
            }
            else {
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Failed" }
                })
                AfterTransaction()
            }
        })
    }, []);

    //getting token client from Firebase.ts(PROMISE)
     //To open snack bar

    FirebaseMessageListener(setNotification,setOpen)

    //To close snack bar
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const SubscriptionHandler=()=>{
        if(!isSubscribe){
            setNotification({ title: "Notification", body:"You have suscribed to notification" });
            setOpen(true);
            setIsSubscribed(true); 
            localStorage.setItem("isSubscribe",JSON.stringify(isSubscribe))
        }
        else{
            setNotification({ title: "Notification", body: "You have already suscribed to notification" })
            setOpen(true);
            setIsSubscribed(true); 
        }
    }
    
    //Subscribe button clicked
    const onShowNotificationClicked = () => {
        if(Notification.permission == 'granted'){
            fetchToken(setTokenFound).then(()=>{
                SubscriptionHandler()
            })
        }
        else if( Notification.permission == 'default'){
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                        fetchToken(setTokenFound).then(()=>{
                            SubscriptionHandler()
                        })
                }
                else{
                    setNotification({ title: "Notification", body: "You have blocked notification" })
                    setOpen(true);
                }
            });
        }
        else{
            console.log("blocked")
            alert("Please allow notification permission in browser")
        }
    }

    //Translation
    const { t } = useTranslation(namespaces.pages.hello);
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
    };

    //Payment Input
    const [toggle, setToggle] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("")
    const [buttonProperty, setButtonProperty] = useState({
        'text': "Make Payment",
    })

    const ToggleElements: MouseEventHandler<HTMLButtonElement> | undefined = () => {
        setToggle(prevState => !prevState)
    }

    function AfterTransaction() {
        setToggle(false)
        setTimeout(() => {
            setButtonProperty(prevValues => {
                return { ...prevValues, text: "Make Payment" }
            })
        }, 3000)
    }

    return (
        <div className=".main">
            <Snackbar style={{ right: "0px" }} open={open} autoHideDuration={6000} onClose={handleClose} >
                < Alert elevation={4}
                    variant="filled" onClose={()=>{setOpen(false);}} severity="success">
                    <strong >{notification.title}:</strong><p>{notification.body}</p>
                </Alert>
            </Snackbar>

            <Button onClick={onShowNotificationClicked}
                style={{ position: "fixed", top: "30px", right: "45px" }} variant="contained" color="secondary">
                Subscribe
            </Button>
            <h1 style={{ color: "blue" }}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
            <Button onClick={changeLanguage("en")}>English</Button>
            <Button onClick={changeLanguage("hi")}>हिंदी</Button>
            <br></br>
            <img src={imageFile} alt="image" style={{ width: "30%", height: "30%" }} />
            <br></br>
            {
                toggle === true ?
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
                        <Button variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text}</Button>
                    </>
            }
        </div>
    )
}
export default IframeParent;