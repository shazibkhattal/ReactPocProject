//IntrinsicAttributes
import IFrame from "../../components/IFrame/IFrame";
import './HomePage.css'
import { MouseEventHandler, useEffect, useState } from "react";
import { Button, InputAdornment, OutlinedInput, Snackbar } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import { TransactionEnum } from '../../Enum/TransactionEnum'
import { useTranslation } from "react-i18next";
import { namespaces } from "../../Services/i18n/i18n.constants";
import { i18n } from '../../Services/i18n/i18n';
//import imageFile from '../../Assets/payment.png';
import { fetchToken, onMessageListener } from '../../Services/Firebase/Firebase';
import React from "react";
import  FirebaseMessageListener  from "../../Services/Firebase/FirebaseMessageListener";
import SnackBarNotification from "../../components/SnackBar/SnackBarNotification"
import AmountInput from "../../components/Form/AmountInput";
import SubscriptionHandler from "../../UtilFunctions/Susbcription/SubscriptionHandler";
import AfterTransaction from "../../UtilFunctions/Transactions/AfterTransaction";
import OnShowNotificationClicked from "../../UtilFunctions/Susbcription/ShowNotificationOnSusbcribe";
const HomePage = () => {

     const [isSubscribe,setIsSubscribed]=useState(false);
     const [open, setOpen] = React.useState(false);
     const [notification, setNotification] = useState({ title: '', body: '' });
     const [isTokenFound, setTokenFound] = useState(false);
     const [toggle, setToggle] = useState<boolean>(false);
     const [inputValue, setInputValue] = useState<string>("")
     const [buttonProperty, setButtonProperty] = useState({
         'text': "Make Payment",
     })

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
                AfterTransaction(setToggle,setButtonProperty)
            }
            else {
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Failed" }
                })
                AfterTransaction(setToggle,setButtonProperty)
            }
        })
    }, []);

    useEffect(()=>{
        localStorage.setItem("isSubscribe",JSON.stringify(isSubscribe))
    })
    //getting token client from Firebase.ts(PROMISE)
     //To open snack bar

    FirebaseMessageListener(setNotification,setOpen)

    // const SubscriptionHandler=()=>{
    //     if(!isSubscribe){
    //         setNotification({ title: "Notification", body:"You have suscribed to notification" });
    //         setOpen(true);
    //         setIsSubscribed(true); 
    //     }
    //     else{
    //         setNotification({ title: "Notification", body: "You have already suscribed to notification" })
    //         setOpen(true);
    //         setIsSubscribed(true); 
    //     }
    // }
    
    //Subscribe button clicked
    

    // const onShowNotificationClicked = () => {
    //     if(Notification.permission == 'granted'){
    //         fetchToken(setTokenFound).then(()=>{
    //             SubscriptionHandler(isSubscribe,setNotification,setOpen,setIsSubscribed)
    //         })
    //     }
    //     else if( Notification.permission == 'default'){
    //         Notification.requestPermission(function (permission) {
    //             if (permission === "granted") {
    //                     fetchToken(setTokenFound).then(()=>{
    //                         SubscriptionHandler(isSubscribe,setNotification,setOpen,setIsSubscribed)
    //                     })
    //             }
    //             else{
    //                 setNotification({ title: "Notification", body: "You have blocked notification" })
    //                 setOpen(true);
    //             }
    //         });
    //     }
    //     else{
    //         console.log("blocked")
    //         alert("Please allow notification permission in browser")
    //     }
    // }

    //Translation
    const { t } = useTranslation(namespaces.pages.hello);
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
    };

    //Payment Input
    
    const ToggleElements: MouseEventHandler<HTMLButtonElement> | undefined = () => {
        setToggle(prevState => !prevState)
    }

    // function AfterTransaction() {
    //     setToggle(false)
    //     setTimeout(() => {
    //         setButtonProperty(prevValues => {
    //             return { ...prevValues, text: "Make Payment" }
    //         })
    //     }, 3000)
    // }

    return (
        <div className=".main">
            <SnackBarNotification open={open}  setOpen={setOpen} notification={notification}/>
            <Button onClick={()=>{
                OnShowNotificationClicked(setTokenFound,setNotification,setOpen,isSubscribe,setIsSubscribed)
                }}
                style={{ position: "fixed", top: "30px", right: "45px" }} variant="contained" color="secondary">
                Subscribe
            </Button>
            <h1 style={{ color: "blue" }}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
            <Button onClick={changeLanguage("en")}>English</Button>
            <Button onClick={changeLanguage("hi")}>हिंदी</Button>
            <br></br>
            <img src={"./payment.jpg"} alt="image" style={{ width: "30%", height: "30%" }} />
            <br></br>
            {
                toggle === true ?
                    <IFrame
                        inputValue={inputValue}
                    />
                    :
                    <>
                    <AmountInput inputValue={inputValue} setInputValue={setInputValue}/>
                    <br></br>
                    <Button variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text}</Button>
                    </>
            }
        </div>
    )
}
export default HomePage;