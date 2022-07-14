import React, { useContext, useState , useMemo} from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { Store } from "../../App";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";
import ChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import CustomList from "./CustomList";
// import CusHeader from "./CusHeader";
// import CusHeader from "./cusHeader";
import CusHeader from "./CusHeader";
import customUserQuery from "./customUserQuery";
import App from "@sendbird/uikit-react/App";



import "@sendbird/uikit-react/dist/index.css";








export default function Index() {
  const { userData } = useContext(Store);
  const [activeUrl, setUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A";

  const updateUrl = (url) => {
    setUrl(url);
  };

 




  return (
    <div className="App">
      
      <SendbirdProvider appId={APP_ID} userId={userData?.uid}    userListQuery={customUserQuery ? customUserQuery  : customUserQuery } >
        <div className="sendbird-app__wrap">
          <div className="sendbird-app__channellist-wrap">
            <ChannelList
              renderChannelPreview={(props)=><CustomList props={props}  />}
              onChannelSelect={updateUrl}
            />
          </div>

          <div className="sendbird-app__conversation-wrap">
            <Channel
              channelUrl={activeUrl.url ?? null}
              replyType="QUOTE_REPLY"
              useReaction={true}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
   
              renderChannelHeader={ ()=><CusHeader props={activeUrl} />}

            />
            {/* <OpenChannelHeader   channelUrl={activeUrl.url ?? null}  /> */}
          </div>
          {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
              <ChannelSettings
                channelUrl={activeUrl.url ?? null}
                onCloseClick={() => {
                  setShowSettings(false);
                }}
              />
            </div>
          )}
        </div>
      </SendbirdProvider>
    </div>
  );
}
