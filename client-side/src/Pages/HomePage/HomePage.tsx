//IntrinsicAttributes
import IFrame from "../../components/IFrame/IFrame";
import './HomePage.css'
import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, FormControlLabel, Switch, Typography } from "@material-ui/core"
import { TransactionEnum } from '../../Enum/TransactionEnum'
import { useTranslation } from "react-i18next";
import { namespaces } from "../../i18n/i18n.constants";
import { i18n } from '../../i18n/i18n';
import paymentImage from "../../Assets/images/payment.jpg"
import React from "react";
import FirebaseMessageListener from "../../Firebase/FirebaseMessageListener";
import SnackBarNotification from "../../components/SnackBar/SnackBarNotification"
import AmountInput from "../../components/Form/AmountInput";
import AfterTransaction from "../../UtilFunctions/Transactions/AfterTransaction";
import OnShowNotificationClicked from "../../UtilFunctions/Susbcription/ShowNotificationOnSusbcribe";
import Cashback from "../../components/Cashback/Cashback"
import Transactions from "../../components/Transactions/Transaction"

interface CanDoUseDispatch {
    getOnClick(): void;
}

const HomePage = () => {

    const [isSubscribe, setIsSubscribed] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<any>("")
    const [dark, setDark] = useState<boolean>(false)
    const [buttonProperty, setButtonProperty] = useState({
        'text': "Make Payment",
    })
    const [cashbackValue, setCashbackValue] = useState<any>("")
  
    const childRef = useRef<CanDoUseDispatch>(null);
    
    //To recieve data from App2 and set button properties
    useEffect(() => {
        const data = localStorage.getItem("isSubscribe")

        if (data) {
            setIsSubscribed(JSON.parse(data))
        }

        window.addEventListener("message", function (e) {
            if (e.origin !== 'http://localhost:3001') return;
            console.log("Recived from APP2:" + e.data)
            if (e.data === TransactionEnum.success) {
                console.log("from succes")
                setInputValue(null)
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Successful" }
                })
                childRef.current?.getOnClick()
                AfterTransaction(setToggle, setButtonProperty)
            }
            else {
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Failed" }
                })
                AfterTransaction(setToggle, setButtonProperty)
            }
        })

    }, []);

    useEffect(() => {
        localStorage.setItem("isSubscribe", JSON.stringify(isSubscribe))
    })

    //getting token client from Firebase.ts(PROMISE)
    //To get notification snack bar
    FirebaseMessageListener(setNotification, setOpen)

    //Translation
    const { t } = useTranslation(namespaces.pages.hello);
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
        console.log("Transaltor rendered")
    };

    //Payment Input

    const ToggleElements: MouseEventHandler<HTMLButtonElement> | undefined = () => {
        console.log("Toggle Element")
        setToggle(prevState => !prevState)
    }

    const getInputValue: any = useCallback(() => {
        return parseInt(inputValue) / 10;
    }, [inputValue])

    const themeStyles: any = useMemo(() => {
        return {
            backgroundColor: dark ? 'black' : 'white',
            color: dark ? 'white' : 'black'
        }
    }, [dark])

    return (
        <div style={themeStyles} className=".main">
 
            <FormControlLabel style={{ position: "fixed", top: "1%", left: "3%" }}
                control={<Switch size="small" color="default" checked={dark} onChange={() => setDark(prev => !prev)} />}
                label="Dark Theme"
            />
 
            <SnackBarNotification open={open} setOpen={setOpen} notification={notification} />
 
            <Button onClick={() => { OnShowNotificationClicked(setTokenFound, setNotification, setOpen, isSubscribe, setIsSubscribed) }} style={{ position: "fixed", top: "1%", right: "3%" }} variant="contained" color="secondary">
                Subscribe
            </Button>
 
            <Button
                style={{ position: "fixed", top: "1%", right: "12%",backgroundColor:'white'}} variant="outlined">
                <Transactions ref={childRef}></Transactions>
            </Button>
 
            <h1 style={{ color: "blue",top: "5%", }}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
 
            <Button onClick={changeLanguage("en")} style={{ backgroundColor: "white", margin: '5px' }}>English</Button>
 
            <Button onClick={changeLanguage("hi")} style={{ backgroundColor: "white", margin: '5px' }}>हिंदी</Button>
 
            <br></br>
 
            <img src={paymentImage} style={{ width: "30%", height: "30%" }} />
 
            <br></br>
            {
                toggle === true ?
                    <IFrame
                        inputValue={inputValue}
                    />
                    :
                    <>
                        <AmountInput inputValue={inputValue} setInputValue={setInputValue} />
                        <br></br>
                        <Button name="PaymentButton" variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text} </Button>
                        <Cashback getInputValue={getInputValue} />
                    </>
            }
        </div>
    )
}
export default HomePage;