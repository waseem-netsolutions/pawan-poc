import React , {useContext,useState,useEffect} from 'react'
import { Store } from '../../App';
import "sendbird-uikit/dist/index.css";
import {  ChannelList , SendBirdProvider , Channel , ChannelSettings} from 'sendbird-uikit';
import CustomList from './customList';
import CusHeader from './CusHeader';
import SendBird from 'sendbird'
import { CreateChannelProvider } from '@sendbird/uikit-react/CreateChannel/context';

// import CustomUserPagination  from './customUserPagination';

export default function Index() {
    const { userData } = useContext(Store);
    const [channel,setChannel] = useState('')
    const [showSettings, setShowSettings] = useState(false);
    const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A"
    var dataNew = {
      "key2":`${userData?.uid}-${userData?.email}checkTwo`,
      "key1": `${Math.random()}`,
      "other@3213": `${Math.random()}`,
  }
    
    
    
    useEffect(() => {
      connect()
    }, [])
    

    
    async function connect (){
    let sb = await new SendBird({appId: APP_ID, localCacheEnabled: true })
    sb.connect(userData?.uid, function(user, error) {

      if (user) {
        sb.currentUser?.updateMetaData(dataNew,true, function(metadata, error) {
          if (error) {
              // Handle error.
          }
          console.log('metadata',metadata,error);
      
         
      });
      }else{
          console.log('someThing went wrong');
      }
      
  });
 


  }
  



    const updateChannel = (channel) => { (channel && channel?.url) && setChannel(channel)}

    
  return (
    <div className='container App'>
        <SendBirdProvider 
        appId={APP_ID} 
        userId={userData?.uid} 
        nickname={userData?.email}

        // userListQuery={CustomUserPagination}
        >

        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
             <ChannelList
              renderChannelPreview={CustomList} 
              onChannelSelect={updateChannel}
              
              />
              </div>

          <div className="sendbird-app__conversation-wrap">
             <Channel 
                channelUrl={channel?.url}
                replyType="QUOTE_REPLY"
                useReaction={true}
               onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
              renderChatHeader={ ()=><CusHeader channel={channel} setShowSettings={setShowSettings} />}

             
             />
              </div>
              {/* <div className="sendbird-app__conversation--search-open sendbird-app__conversation-wrap">
              <MessageSearch  channelUrl={channel?.url}
                renderSearchItem={<div>hi every one</div>}
                />
          </div> */}

              {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
              <ChannelSettings
                channelUrl={channel?.url ?? null}
                onCloseClick={() => {
                  setShowSettings(false);
                }}
              />
            </div>
        )}
              </div>

            </SendBirdProvider>

       
    </div>
  )
}
