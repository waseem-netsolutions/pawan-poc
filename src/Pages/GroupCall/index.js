import React, { useEffect, useContext, useState } from "react";
import SendBirdCall from "sendbird-calls";
import { Store } from "../../App";

import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';

import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';


const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A";
const Index = () => {
  const { userData } = useContext(Store);
  const [room, setroom] = useState('')
  const [joinRoomInput, setjoinRoomInput] = useState('')
  const [participantVideos, setparticipantVideos] = useState([])
  const [muteMicrophone,setmuteMicrophone] =useState(false) 
  const [VideoAvaliable,setVideoAvaliable] =useState(false) 
//   Join 
  const [roomStatus,setroomStatus] =useState('') 





  useEffect(() => {

    let details = { userId: userData.uid, accessToken: undefined };
    SendBirdCall.init(APP_ID);
    SendBirdCall.authenticate(
      details,
      (result) => result && SendBirdCall.connectWebSocket()
    );

  }, []);


  const createRoom = () => {
    const roomParams = { roomType: SendBirdCall.RoomType.SMALL_ROOM_FOR_VIDEO };
    SendBirdCall.createRoom(roomParams)
      .then((room) => {
        setroomStatus('CREATE')
        setroom(room)
        roomListner(room)
      })
      .catch((e) => {
        // Failed to create a room.
      });
  };





  const roomListner = room => {
    const enterParams = { videoEnabled: VideoAvaliable,  audioEnabled: muteMicrophone}
    room.enter(enterParams).then(() => {
      // My View Setup 
      const localMediaView = document.getElementById('local_video_element_id');
      room.localParticipant.setMediaView(localMediaView);
      
      // Called when a remote participant has entered the room.
      room.on('remoteParticipantStreamStarted', (remoteParticipant) => {
        participantVideos.push(remoteParticipant)
        setparticipantVideos([...participantVideos])
        let remoteMediaview = document.getElementById(remoteParticipant.participantId)
        remoteMediaview.autoplay = true;
        remoteParticipant.setMediaView(remoteMediaview);
    });


    
      // new User Left   

      room.on('remoteParticipantExited', (participant) => {

        if(participantVideos.length > 0 && participant){
            let newArray = participantVideos.filter(e => e.participantId !== participant.participantId)
            setparticipantVideos([...newArray])
        }  
      });

      
    })



}

  

    

    const joinRoom = () =>{
      if (!joinRoomInput) return 
      SendBirdCall.fetchRoomById(joinRoomInput)
    .then(room => {      
      setroom(room)
      setroomStatus('JOIN')
      roomListner(room)
    })
    .catch(e => {
        // Handle error
    });
    }


    const toggleMicrophone = () => {
        let Microphone = !muteMicrophone;
        setmuteMicrophone(Microphone);
        
        if (Microphone) {
            room.localParticipant.unmuteMicrophone();
        } else {
            room.localParticipant.muteMicrophone();
        }
      };
      
      const toggleVideo = () => {
        let video = !VideoAvaliable;
        console.log(video);
        setVideoAvaliable(video);
        if (video) {
            room.localParticipant.startVideo();
        } else {
            room.localParticipant.stopVideo();
        }
      };
      
      const exitCall = () => {
        room.exit();
        setroom('')
        setparticipantVideos([])
        setjoinRoomInput('')
        setroomStatus('')
      };
      

  const videoWorkaround = (id,mute) => {
    let mutedParam = mute ? 'muted' : '' ;
    return (
      <div dangerouslySetInnerHTML={{
        __html: `
        <video
        ${mutedParam}
        width="300"
         height="300" 
        autoplay
        playsinline      
        id="${id}"
          />`
        }}
        />
    );
  };



  return (
    <div className='container'>
      <div>index</div>
      <div className='row'>
        <div className='card col-4'>
          <div className='card-body'>
            { room?.roomId &&
            <React.Fragment>
              <p>Join Room</p>
              <p>{room?.roomId}</p>
            </React.Fragment>
            }
            {
                roomStatus !== 'JOIN' &&
            <button className='btn btn-primary mt-2' onClick={createRoom}>Create Room</button>
            }
          </div>
        </div>

            {
              roomStatus !== 'CREATE' &&
            <div className='card col-4'>
                <div className='card-body'>
                    <input className='form-control' value={joinRoomInput} onChange={e => setjoinRoomInput(e.target.value)}/>
                    <button className='btn btn-primary mt-2' onClick={joinRoom} disabled={!joinRoomInput}>Join Room</button>
                </div>
            </div>
            }

{
    roomStatus  &&
        <div className='card col-4'>
          <div className='card-body'>
          <div>
          <button className="btn btn-danger m-2" onClick={toggleMicrophone}> { muteMicrophone ?  <MicNoneIcon /> : <MicOffIcon />}</button>
          <button className="btn btn-danger m-2" onClick={toggleVideo}> { VideoAvaliable ? <VideocamIcon /> : <VideocamOffIcon />}</button>
          <button className="btn m-1 btn-danger" onClick={exitCall} >Exit room</button>
        </div>
          </div>
        </div>
}
      </div>


      <div>
   
        <div className="row">
      {room &&
      <div className='col-md-4 custom_video_tab'>
        {videoWorkaround('local_video_element_id',true)}
      </div>
      }
      {
          participantVideos.length > 0 && 
          participantVideos.map(participant =>
            <div key={participant.participantId} className='col-md-4 custom_video_tab'>
            {videoWorkaround(participant.participantId,false)}
          </div>
          )
        }
        </div>


      </div>
    </div>
  );
};

export default Index;
