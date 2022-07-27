import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { bindActionCreators } from "redux";
import {actionCreators} from "../../Redux/"
import {State} from "../../Redux/Reducers/index"

function SubscriptionHandler(
        isSubscribe:boolean,
        setNotification: React.Dispatch<React.SetStateAction<{
            title: string;
            body: string;
        }>>,
        setOpen:React.Dispatch<React.SetStateAction<boolean>>,
        setIsSubscribed:React.Dispatch<React.SetStateAction<boolean>>
    ){
    
    if(!isSubscribe){
        setNotification({ title: "Notification", body:"You have suscribed to notification" });
        setOpen(true);
        setIsSubscribed(true); 
    }
    else{
        setNotification({ title: "Notification", body: "You have already suscribed to notification" })
        setOpen(true);
        setIsSubscribed(true); 
    }
}
export default SubscriptionHandler;