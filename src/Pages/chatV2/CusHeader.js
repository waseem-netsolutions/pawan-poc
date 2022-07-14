import React, { useEffect , useState } from 'react'
import SendBird from 'sendbird'

export default function CusHeader({channel, setShowSettings}) {
  const [userActive, setuserActive] = useState(false)
    
    
    useEffect(()=>{
      channel?.memberCount && checkUserActive()
    },[channel])
    
    
    function checkUserActive(){
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
      <p className='m-0'> {channel?.inviter?.nickname}</p>
      <p className='m-0'> {userActive ? 'online':'offline'}
      <span>
        <button className='btn btn-primary' onClick={()=>{setShowSettings(true)}}>i</button>
      </span>
      </p>


    </div>
  )
}
