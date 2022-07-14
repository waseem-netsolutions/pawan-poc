import React ,{useEffect} from 'react'
import {
    Channel as SBConversation,
    ChannelList as SBChannelList,
    ChannelSettings as SBChannelSettings,
    withSendBird
  } from "sendbird-uikit";
  import { useState } from 'react';
import produce from 'immer';
import CustomList from './CustomList';
  
 const  CustomizeApp =({userData,stores,module,office})=> {
     let sb = stores?.sdkStore?.sdk


    const [showSettings, setShowSettings] = useState(false);
    const [currentChannelUrl, setCurrentChannelUrl] = useState("");
    const [queries, setQueries] = useState({
        channelListQuery: {
          customTypesFilter :[module],
          
        }
      })


      useEffect(() => {
          setQueries(produce(queries => {queries.channelListQuery.customTypesFilter = [module]} ))


      }, [module])
      
      const handleOnBeforeCreateChannel = (selectedUsers) => {
          const channelParams = new sb.GroupChannelParams();
          channelParams.addUserIds(selectedUsers);
          channelParams.name = `${module} Group`;
          channelParams.overUrl = null;
          channelParams.coverImage = null;
          channelParams.customType = module;
          channelParams.data = JSON.stringify({
              "officeBranch":module+office
          });
          return channelParams;
        }

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
         
                  setCurrentChannelUrl(channel.url);
                }
            }}
            renderChannelPreview={(channel)=>(<CustomList channel={channel} office={office} module={module}/>)} 

            queries={queries}
            onBeforeCreateChannel={handleOnBeforeCreateChannel}

          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
          {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
              <SBChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick={() => {
                  setShowSettings(false);
                }}
              />
          </div>
        )}
      </div>
    </div>
  )
}


export default withSendBird(CustomizeApp)