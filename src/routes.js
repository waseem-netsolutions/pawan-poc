import {  lazy, useContext } from "react";
import {  Routes, Route } from "react-router-dom";
import { Store } from "./App";
const HomeLayout = lazy(() => import("./Layout/Home"));
const DashboardLayout = lazy(() => import("./Layout/Dashboard"));
const Home = lazy(() => import("./Pages/Home"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Signup = lazy(() => import("./Pages/Signup/Signup"));
const Pagenotfound = lazy(() => import("./Pages/Pagenotfound"));

// Users 
const Adduser = lazy(() => import("./Pages/Users/Add"));
const Edituser = lazy(() => import("./Pages/Users/Edit"));


const Map = lazy(() => import("./Pages/Map/index"));
const AddLoc = lazy(() => import("./Pages/Map/Addloc"));
const GroupCall = lazy(() => import("./Pages/GroupCall"));
const Calander = lazy(() => import("./Pages/Calander5"));
const Chat = lazy(() => import("./Pages/Chat"));
const ChatV2 = lazy(() => import("./Pages/chatV2"));
const ChatVersionTwo = lazy(() => import("./Pages/chatVersionTwo"));

// import Chat from './Pages/Chat/'






export default function RoutesLinks() {
const {userData} = useContext(Store)
let userId = userData?.uid
  
  return (
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          {userId && (
            <>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route  path="add" element={<Adduser />} />
                <Route  path="edit/:Id" element={<Edituser />} />
                <Route  path="map" element={<Map />} />
                <Route  path="map/add" element={<AddLoc />} />
                <Route  path="groupCall" element={<GroupCall />} />
                <Route  path="calander" element={<Calander />} />
                <Route  path="oneToone" element={<Chat />} />
                <Route  path="ChatV2" element={<ChatV2 />} />
                <Route  path="ChatVersionTwo" element={<ChatVersionTwo />} />

                
                





              </Route>
         
            </>
          )}
           <Route path="*" element={<Pagenotfound />} />
        </Routes>
  );
}
