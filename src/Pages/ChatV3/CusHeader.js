import React, { useEffect , useState } from 'react'
import SendBird from 'sendbird'

export default function CusHeader({props}) {
  const [userActive, setuserActive] = useState(false)
    let channel = props
    
    useEffect(()=>{
      channel?.memberCount && checkUserActive()
    },[channel])
    
    
    function checkUserActive(){
      console.log('msg come');
      var sb = SendBird.getInstance();
      var listQuery = sb.createApplicationUserListQuery();
      listQuery.userIdsFilter = [channel?.inviter?.userId];
  
      listQuery.next(function(users) {
      if (users && (users[0]?.connectionStatus === sb.User.ONLINE)) {
        setuserActive(true);
      }else{
        setuserActive(false);
      }
  });
      
    }

  return (
    <div className='cus_header_chat'>
      <p>
      {channel?.inviter?.nickname}
      </p>
      <p>

      {userActive ? 'online':'offline'}
      </p>

    </div>
  )
}
