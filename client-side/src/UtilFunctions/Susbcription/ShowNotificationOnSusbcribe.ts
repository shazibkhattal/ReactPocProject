
import { fetchToken, onMessageListener } from '../../Services/Firebase/Firebase';
import SubscriptionHandler from './SubscriptionHandler';
const OnShowNotificationClicked = (
   
    setTokenFound: React.Dispatch<React.SetStateAction<boolean>>,
    setNotification: React.Dispatch<React.SetStateAction<{
        title: string;
        body: string;
    }>>,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    isSubscribe:boolean,
    setIsSubscribed:React.Dispatch<React.SetStateAction<boolean>>,
    
    ) => {
        
    console.log("OnShowNotificationClicked rendered")
    if(Notification.permission === 'granted'){
        fetchToken(setTokenFound).then(()=>{
            SubscriptionHandler(isSubscribe,setNotification,setOpen,setIsSubscribed)
        })
    }
    else if( Notification.permission === 'default'){
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                    fetchToken(setTokenFound).then(()=>{
                        SubscriptionHandler(isSubscribe,setNotification,setOpen,setIsSubscribed)
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
export default OnShowNotificationClicked;