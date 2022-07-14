// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAw-lMZ0UDhFsF8jmjb4dNWl4GrpbwAIoM",
    authDomain: "reactfb-c7c34.firebaseapp.com",
    projectId: "reactfb-c7c34",
    storageBucket: "reactfb-c7c34.appspot.com",
    messagingSenderId: "358638997284",
    appId: "1:358638997284:web:27986fbacc3889d90dadb1",
    measurementId: "G-VE4RLVW4MR"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message  public ', payload);

// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,
// //   };

// //   self.registration.showNotification(notificationTitle,
// //     notificationOptions);
// });