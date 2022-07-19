import firebase from 'firebase/compat/app';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: 11758813354 // troque pelo seu sender id 
  });

  // use other service worker
  // navigator.serviceWorker
  //   .register('/my-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);

    return token;
  } 
  catch (error) {
    console.error(error);
  }
}