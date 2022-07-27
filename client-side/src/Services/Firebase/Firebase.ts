import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { SetStateAction } from 'react';
require('dotenv').config()
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId:  process.env.REACT_APP_APPID,
  measurementId:  process.env.REACT_APP_MEASURMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = async (setTokenFound: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
  try {
    //console.log(process.env.REACT_APP_VAPID_KEY)
    const currentToken = await getToken(messaging, { vapidKey:process.env.REACT_APP_VAPID_KEY});
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});