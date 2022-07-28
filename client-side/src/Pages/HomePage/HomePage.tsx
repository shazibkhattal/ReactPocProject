import IFrame from "../../components/IFrame/IFrame";
import './HomePage.css'
import { MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, FormControlLabel, Switch } from "@material-ui/core"
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
import Transactions from "../../components/Transactions/Transaction"
import {useDispatch, useSelector} from "react-redux"
import { bindActionCreators } from "redux";
import {actionCreators} from "../../Redux/"
import {State} from "../../Redux/Reducers/index"
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'
import TransactionStyles from "./EmotionStyles/TransactionStyles"
import {UseDispatchTransaction} from "../../Interface/HomePage/UseDispatchTransaction"
import {colors} from "../../Assets/Colors/Colors"

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
    const childRef = useRef<UseDispatchTransaction>(null);
    const dispatch=useDispatch()
    const {Subscribe}=bindActionCreators(actionCreators,dispatch)

    const stateIsSubscribe=useSelector((state:State)=>state.subscribe)
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
                console.log("from success")
                setInputValue("")
                Subscribe(true)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            backgroundColor: dark ? colors.black : colors.white,
            color: dark ? colors.white : colors.black,
            height:'100vh'
        }
    }, [dark])

    console.log("redux value"+stateIsSubscribe)
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

            <div
                css={[TransactionStyles.placement,TransactionStyles.design]} >
                <Transactions ref={childRef}></Transactions>
            </div>
 
            <h1 style={{ color: "blue",top: "5%", }}>{t("welcome", { ns: namespaces.pages.hello })}</h1>
 
            <Button onClick={changeLanguage("en")} style={{ backgroundColor: "white", margin: '5px' }}>English</Button>
 
            <Button onClick={changeLanguage("hi")} style={{ backgroundColor: "white", margin: '5px' }}>हिंदी</Button>
 
            <br></br>
 
            <img src={paymentImage} alt="Not Available" style={{ width: "30%", height: "45%" }} />
 
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