import React from 'react'

export default function TopHeader({channel,userData}) {
  return (
    <div>
          {
        channel?.memberCount === 2  ?
        channel.members.map(item =>{
            if(item?.userId !== userData.uid){
                return (
                    <p key={item?.userId}> {item?.nickname}</p>
                )
            }
        })
        :
        <p>{channel?.name}</p>
    }
    <span>{channel?.connectionStatus}</span>
    </div>
  )
}
