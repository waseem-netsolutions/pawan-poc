import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
// import 'firebase/compat/auth'

  const app = initializeApp({
    apiKey: "AIzaSyAw-lMZ0UDhFsF8jmjb4dNWl4GrpbwAIoM",
    authDomain: "reactfb-c7c34.firebaseapp.com",
    projectId: "reactfb-c7c34",
    storageBucket: "reactfb-c7c34.appspot.com",
    messagingSenderId: "358638997284",
    appId: "1:358638997284:web:27986fbacc3889d90dadb1",
    measurementId: "G-VE4RLVW4MR"
  });
  export const auth = getAuth(app)
  export const db = getFirestore(app)
  
  export default app


  