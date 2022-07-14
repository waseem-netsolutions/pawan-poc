import React, { useEffect } from "react";
import { App as SendBirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import { useContext , useState } from "react";
import { Store } from '../../App'
import SendBirdCall from "sendbird-calls";
import Users from "./DummyUsers";
import callStatesModel from "./callModel";

import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';



export default function Index() {
  const { userData } = useContext(Store);
  const [callingState , setcallingState] = useState({
    status: "NOTHING",
    call: "",
    displayPickup: false,
    displayEnd: false,
    displayCall: true,
    listenerId: `${userData.uid}${Math.random()}`,
    errorMsg: '',
    isMuted: true,
    videoHidden: true,
    otherUser:''
  }) 

  const [room ,setroom] = useState({})

  const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A"

  useEffect(()=>{
SendBirdCall.init(APP_ID);
      authenticate()
          .then(() => connect())
          .then(() => addIncomingListener())
          .catch(err => {
            console.log('err use' , err)
          });
    },[]) 

    // connect WebSocket for video and audio 
    const connect = () => {
      return new Promise((resolve, reject) => {
        SendBirdCall.connectWebSocket()
            .then(() => {
              resolve("Connected");
            })
            .catch(() => {
              reject("Websocket Failed");
            });
      });
    }
 
    // Authenticate
   const authenticate = () => {
      return new Promise((resolve, reject) => {
        SendBirdCall.authenticate({
          userId: userData.uid,
          accessToken: undefined
        }, (result, error) => {
          !!error ? reject(error) : resolve(result);
        });
      });
    }

    const addIncomingListener =()=> {
      console.log("Initizalized & ready...");
      SendBirdCall.addListener(callingState.listenerId, {
        onRinging: (call) => {
          callingState.status = 'RINGING'
          setcallingState({...callingState});
          setroom(call)
          call.onEstablished = (call) =>{
            callingState.status = 'ESTABLISHED'
            setcallingState({...callingState});
          };
          call.onConnected = (call) => {
            setroom(call)
            callingState.status = 'CONNECTED'
            setcallingState({...callingState});
          };
          call.onEnded = (call) =>{
          setroom({})
          callingState.status = 'NOTHING'
          setcallingState({...callingState});

          }}
      });
    }

     
    function addDialOutListener(call) {
      setroom(call)
      callingState.status = 'CONNECTING'
        setcallingState({...callingState});


      call.onEstablished = (call) => {
        setroom(call)
        callingState.status = 'ESTABLISHED'
          setcallingState({...callingState});
        
      };
      call.onConnected = (call) => {
        setroom(call)
        callingState.status = 'CONNECTED'
        setcallingState({...callingState});
      };
      call.onEnded = (call) =>{
      setroom({})
      callingState.status = 'NOTHING'
      setcallingState({...callingState});

      }
    }

    
    
    const isVideoCall =() => {
      if (callingState.videoHidden === true) { return true;}
      return false;
    }

    
  const muteCall = () =>{
    callingState.isMuted =  !callingState.isMuted
    let audioUpdate = !callingState.isMuted
    setcallingState({...callingState})

    if(audioUpdate){
      room.muteMicrophone()
    }else{
      room.unmuteMicrophone()
    }

  }



  const toggleVideo =() =>{

      callingState.videoHidden =  !callingState.videoHidden
      let videoUpdate = !callingState.videoHidden
      setcallingState({...callingState})
      if(videoUpdate) {
        room.stopVideo();
      } else {
        console.log(room.startVideo());
        room.startVideo();
      }
    
  }

  const beforeCallSetup = (type) =>{
    if(type === 'Audio'){
      callingState.isMuted =  !callingState.isMuted
      setcallingState({...callingState})  
    }else{
      callingState.videoHidden =  !callingState.videoHidden
      setcallingState({...callingState})

    }

  }

  const handleChange = e =>{
    callingState.otherUser = e.target.value
    setcallingState({...callingState})
  }

  const rejectCall = () =>{ 
    room.end();
    setroom({})
    clearState()
  }
  
  const clearState =()=>{
    callingState.isMuted =  false
    callingState.videoHidden =  false
    callingState.status =  "NOTHING"

    setcallingState({...callingState})
    window.location.reload();


  }


  const makeCall =() =>{
    callingState.status = 'CONNECTING'
    setcallingState({...callingState})

    let callOption = getCallOptions();
    const dialParams = {
      userId: callingState.otherUser,
      isVideoCall: isVideoCall(),
      callOption
    };
    try {
      const call = SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          callingState.errorMsg =  error.toString()
          setcallingState(callingState)
        } else {
          callingState.errorMsg =  ''
          setcallingState(callingState)
          addDialOutListener(call);
        }
      });
    } catch (e) {
      setcallingState({errorMsg: e.message})
    }
  
}


const screenShare = async () =>{
  try {
    await room.startScreenShare();
    room.onScreenShareStopped = () => {
        // add your process for screen share stop.
    };
} catch (e) {
    // add your process for start screen share fail.
}}

const screenShareStop = () =>{
  room.stopScreenShare();
}

const getCallOptions = ()=> {
  let callOption = {
    remoteMediaView: document.getElementById('remote_element_id'),
    audioEnabled: callingState.isMuted,
  }
  if(isVideoCall()){
    callOption.localMediaView = document.getElementById('local_video_element_id');
    callOption.videoEnabled = callingState.videoHidden;
    callOption.audioEnabled = callingState.isMuted;
  }
  console.log('callOption',callOption)
  return callOption;
}



  const SelectOption = () =>{
    return(
   <div className="mb-5">
     <p>select a person for call</p>
        <select onChange={handleChange} value={callingState.otherUser} className="form-control">
      <option>select</option>
      {Users?.map((user, index) => {
        if (user._id != userData?.uid) {
          return (
            <option key={index} value={user._id}> {user.name}</option>
          )}})}
    </select>
   </div>
    )
  }

  const videoWorkaround = (id,mute) => {
    let mutedParam = mute  ? 'muted' : '' ;
    return (
      <div dangerouslySetInnerHTML={{
        __html: `
        <video
        ${mutedParam}
        width="500"
         height="500" 
        autoplay
        playsinline      
        id="${id}"
          />`
        }}
        />
    );
  };

  
  const Alert = () =>{
    return(
      <div className="alert alert-success" role="alert">
        {console.log(room)}
        <div>{room?._caller?.nickname} is Calling</div>
          <button className="btn m-1 btn-success" onClick={acceptCall}>Accept</button>
          <button className="btn m-1 btn-danger" onClick={rejectCall} >Reject</button>
      </div>
    )
  }


  const  acceptCall =() => {
    let callOption = getCallOptions();
    room.accept({callOption});
  }

  const videoView = () =>{
    if(callingState.status == 'CONNECTING' || callingState.status == 'CONNECTED' && callingState.videoHidden){
      return 'd-block'
    }
    return 'd-none'
  }

  const videoRemote = () =>{
    if(callingState.status == 'CONNECTING' || callingState.status == 'CONNECTED' ){
      return 'd-block'
    }
    return 'd-none'
  }


  return (
    <div className="container">
    

     { callingState.status == 'CONNECTED' &&
     <div>
     <button className="btn btn-primary m-2" onClick={screenShare}> screen share </button>
      <button className="btn btn-primary m-2" onClick={screenShareStop}> screenShareStop share </button>
     </div>
      }


            <SelectOption />
         <div className="row">
        <div   className={`col-6 ${videoRemote()} `}>
            {videoWorkaround('remote_element_id', false)}
        </div>
        <div className={`col-6 ${videoView()} `}>
            { videoWorkaround('local_video_element_id',true)}
        </div>
      </div>

      {
        (callingState.status == 'CONNECTING' || callingState.status == 'CONNECTED')  && 
        <div>
          after
          <button className="btn btn-danger m-2" onClick={muteCall}> { callingState.isMuted ?  <MicNoneIcon /> : <MicOffIcon />}</button>
          <button className="btn btn-danger m-2" onClick={toggleVideo}> { callingState.videoHidden ? <VideocamIcon /> : <VideocamOffIcon />}</button>
          <button className="btn m-1 btn-danger" onClick={rejectCall} > call end</button>
        </div>
      
      }
    

    {/* Before call */}
    {
      (callingState.status == 'NOTHING') && callingState.otherUser &&
      <div>
          Before

        <button className="btn btn-danger m-2" onClick={()=>beforeCallSetup('Audio')}> { callingState.isMuted ?  <MicNoneIcon /> : <MicOffIcon />}</button>
        <button className="btn btn-danger m-2" onClick={()=>beforeCallSetup('Video')} > { callingState.videoHidden ? <VideocamIcon /> : <VideocamOffIcon />}</button>
      </div>
    }
    {/* Before call */}



    { callingState.otherUser && <button className="btn btn-danger" onClick={makeCall}>Call</button>}
      { callingState.status === 'RINGING' && <Alert />}
    </div>
  )
}
