// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging,getToken,onMessage  } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT8PBTiO6FO7yTE9Odismh7CKGMQsWK8U",
  authDomain: "reactpoc-a4961.firebaseapp.com",
  projectId: "reactpoc-a4961",
  storageBucket: "reactpoc-a4961.appspot.com",
  messagingSenderId: "666200299034",
  appId: "1:666200299034:web:525c43200905f4d837e3a3",
  measurementId: "G-VCKKX121EG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export async function getFCMToken(){
  return getToken(messaging, { vapidKey: "BPZlvN0dGJslUPCatVGAYE8Wlgw_wxIUSKh66NSozQ4u5LOpHw4t9PsP8IZoRKQgR_Ds_OT5chEAJMOj7OvRdmM"})
    .then((currentToken) =>{
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other necessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    })
  }
  
  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

  