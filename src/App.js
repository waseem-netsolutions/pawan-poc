import Routes from "./routes";
import "./App.css";
import { createContext, useState, useEffect , Suspense } from "react";
import { auth } from "./firebase";
import { BrowserRouter } from "react-router-dom";
// import { getMessaging, getToken } from "firebase/messaging";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
 
import app from "./firebase";


export const Store = createContext();
const App = () => {
  const [welcomeText, setwelcomeText] = useState(true);
  const [userData, setuserData] = useState();
  const [isTokenFound, setTokenFound] = useState(false);
  
  useEffect( () => {
    
    
    auth.onAuthStateChanged((user) => {
      console.log(user);
      // setuserData(()=> user ? user : '')
    });
  }, []);
  
  
  useEffect(() => {
    const messaging = getMessaging(app);
    getTokens(messaging);

  
    onMessageListener(messaging).then(payload => {
      console.log('payload apps',payload);
      
    }).catch(err => console.log('failed: ', err));

   
  },[])


  const onMessageListener = (messaging) =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

  const getTokens = (messaging) => {
     getToken(messaging, {vapidKey: 'BARxGBqwhfyvqQwRyJX639Uo4KTSmGaAJfsxlVrBnFZ5eh-ArR-rZ0tKGBk8yNDDZw9bSGzNvWJ39n-pwpwh2Gc'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        console.log(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        console.log(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }


  let states = {
    welcomeText,
    setwelcomeText,
    userData,
    setuserData,
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Store.Provider value={states}>
        {/* <Routes  /> */}
        {isTokenFound &&
        <div>
          Notification permission enabled 👍🏻 
        </div> 
}
{!isTokenFound && 
<>
Need notification permission ❗️ 
</>
}
      </Store.Provider>
    </BrowserRouter>
    </ Suspense >
  );
};

export default App;
