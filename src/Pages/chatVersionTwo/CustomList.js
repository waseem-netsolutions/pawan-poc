import React , { useContext } from 'react'
import { Store } from '../../App';

const CustomList = ({channel , office , module}) => {
    const { userData } = useContext(Store);
    const channels = channel?.channel
    let officeName = ''

    if(channels && channels.data){
        officeName = JSON.parse(channels.data).officeBranch        
    }
    if(officeName != module+office){
        return null 
    }

    
    return (
      <div className="row cus_row">
        <img src={channels.coverUrl} alt='' />
        <div>
          {channels?.members?.length > 2 ? (
            <p>{channels?.name}</p>
          ) : (
            <p>
              {/* {channels?.inviter.nickname ? channels?.inviter.nickname: "No Nick Name"} */}
              {channels?.members.map(item =>{
                if(item.userId != userData?.uid){
                  return(<p>{item.nickname}</p>)
                }
              })}

            </p>
          )}

          <p>{channels?.lastMessage?.message}</p>

          {channels?.unreadMessageCount > 0 && (
            <p>{channels?.unreadMessageCount}</p>
          )}
        </div>
      </div>
    );
  };

  export default CustomList