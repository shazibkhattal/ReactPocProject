import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { SetStateAction } from 'react';
require('dotenv').config()
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT8PBTiO6FO7yTE9Odismh7CKGMQsWK8U",
  authDomain: "reactpoc-a4961.firebaseapp.com",
  projectId: "reactpoc-a4961",
  storageBucket: "reactpoc-a4961.appspot.com",
  messagingSenderId: "666200299034",
  appId: "1:666200299034:web:525c43200905f4d837e3a3",
  measurementId: "G-VCKKX121EG"
};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = async (setTokenFound: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
  try {
    console.log(process.env.REACT_APP_VAPID_KEY)
    const currentToken = await getToken(messaging, { vapidKey:"BAnHM-ESPrqiK8_c_R5h_ZdEP53CZTRwBMtvkRfurNXCb6vPuImnKWG2K6QTBY2-AtbmAhwCCsnqYayp7Up8xX0"});
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