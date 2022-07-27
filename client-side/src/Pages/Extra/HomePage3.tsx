//IntrinsicAttributes
import IFrame from "../../components/IFrame/IFrame";
import './HomePage.css'
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@material-ui/core"
import { TransactionEnum } from '../../Enum/TransactionEnum'
import { useTranslation } from "react-i18next";
import { namespaces } from "../../Services/i18n/i18n.constants";
import { i18n } from '../../Services/i18n/i18n';
import paymentImage from "../../Assets/images/payment.jpg"
import React from "react";
import FirebaseMessageListener from "../../Services/Firebase/FirebaseMessageListener";
import SnackBarNotification from "../../components/SnackBar/SnackBarNotification"
import AmountInput from "../../components/Form/AmountInput";
import AfterTransaction from "../../UtilFunctions/Transactions/AfterTransaction";
import OnShowNotificationClicked from "../../UtilFunctions/Susbcription/ShowNotificationOnSusbcribe";
import Cashback from "../../components/Cashback/Cashback"
const HomePage = () => {

    const [isSubscribe, setIsSubscribed] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("0")
    const [gstValue, setGstValue] = useState<string>("")
    const [buttonProperty, setButtonProperty] = useState({
        'text': "Make Payment",
    })
    const [cashbackValue, setCashbackValue] = useState<number>(0)
    
    const CashbackDiscount = useMemo(() => expensiveCalculation(inputValue), [inputValue]);
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
                setInputValue("")
                setButtonProperty(prevValues => {
                    return { ...prevValues, text: "Payment Successful" }
                })
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
    
    const getInputValue:any=()=>{
        return inputValue;
    }

    //const CallBack=GSTCalculator();
    const CallBack = useCallback(() => {
        console.log("In CallBack")
        var price: number = parseInt(inputValue) * 1;
        console.log(price)
        var tot_price = price + (price * 0.18);
        if (tot_price > 0) {
            // setGST(tot_price)
            console.log(tot_price)
            return tot_price.toString();
        }
        else
            return '0'
    }, [gstValue])
    
    return (
        <div className=".main">
            <SnackBarNotification open={open} setOpen={setOpen} notification={notification} />
            <Button onClick={() => {
                OnShowNotificationClicked(setTokenFound, setNotification, setOpen, isSubscribe, setIsSubscribed)
            }}
                style={{ position: "fixed", top: "30px", right: "45px" }} variant="contained" color="secondary">
                Subscribe
            </Button>
            <h1 style={{ color: "blue" }}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
            <Button onClick={changeLanguage("en")}>English</Button>
            <Button onClick={changeLanguage("hi")}>हिंदी</Button>
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
                        <Button variant="outlined" color="primary" id="sendMessageButton" 
                            onClick={CallBack}> Calculate Cashback
                        </Button>
                        <Button name="PaymentButton" variant="outlined" color="primary" id="sendMessageButton" onClick={ToggleElements}>{buttonProperty.text}</Button> 
                        <p style={{}}>Cashback Value: {CashbackDiscount}</p>
                        <Cashback getInputValue={getInputValue}/>
                    </>
            }
        </div>
    )      
}

const expensiveCalculation = (num: any) => {
    var i=0;
    while(i>1000000000)
        i++
    var value=0;
    console.log("Calculating Cashback Value...");

    value=Math.random()* (Math.random() * (num/10))
    return value;
};

export default HomePage;