import React from "react";

const SubscriptionHandler=(
        isSubscribe:boolean,
        setNotification: React.Dispatch<React.SetStateAction<{
            title: string;
            body: string;
        }>>,
        setOpen:React.Dispatch<React.SetStateAction<boolean>>,
        setIsSubscribed:React.Dispatch<React.SetStateAction<boolean>>
    )=>{
    console.log("Subscription Handler Called")
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