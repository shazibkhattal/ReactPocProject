import { onMessageListener } from './Firebase';
const FirebaseMessageListener = (
    setNotification: React.Dispatch<React.SetStateAction<{ title: string; body: string; }>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
) =>{
    onMessageListener().then((payload: any) => {
        console.log("Payload from firebase" + payload)
        setNotification({ title: payload.notification.title, body: payload.notification.body })
        setOpen(true);
        console.log(payload);
    }).catch(err => console.log('failed: ', err));
}
export default FirebaseMessageListener;