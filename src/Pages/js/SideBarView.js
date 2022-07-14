import React from 'react'

export default function SideBarView({user , setChannel , userData}) {

    const threeDot = (data) =>{
        if(data?.length > 25) return '...'
        else return ''
        }
  return (



    <div className='d-flex' onClick={()=>setChannel({...user})}>
    <img src={user.coverUrl} alt='cover_image' className='cus_img_profile' />
        <div className='w-100'>
        {
        user?.memberCount === 2  ?
        user.members.map(item =>{
            if(item?.userId !== userData.uid){
                return (
                    <p key={item?.userId}> {item?.nickname}</p>
                )
            }
        })
        :
        <p>{user?.name}</p>
    }
    <div className='display_center'>
    <p>{`${user?.lastMessage?.message.slice(0,25)}${threeDot(user?.lastMessage?.message)}`}</p>
    
    {
        user.unreadMessageCount > 0 ?
        <span className='unread_msg'>{user?.unreadMessageCount}</span>
        : null
    }

    </div>
        </div>
   



</div>
  )
}
