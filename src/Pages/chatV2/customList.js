import React , { useContext } from 'react'
import { Store } from '../../App';

const CustomList = ({channel}) => {

  const { userData } = useContext(Store);
    console.log(channel);
    
    return (
      <div className="row cus_row">
        <img src={channel.coverUrl} alt='' />
        <div>
          {channel?.members?.length > 2 ? (
            <p>{channel?.name}</p>
          ) : (
            <p>
              {/* {channel?.inviter.nickname ? channel?.inviter.nickname: "No Nick Name"} */}
              {channel?.members.map(item =>{
                if(item.userId != userData?.uid){
                  return(<p>{item.nickname}</p>)
                }
              })}

            </p>
          )}

          <p>{channel?.lastMessage?.message}</p>

          {channel?.unreadMessageCount > 0 && (
            <p>{channel?.unreadMessageCount}</p>
          )}
        </div>
      </div>
    );
  };

  export default CustomList