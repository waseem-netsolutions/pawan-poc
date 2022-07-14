import React , {useEffect ,useState, useContext }from 'react'
import SendBird from 'sendbird'
import { Store } from '../../App'
import TopHeader from './TopHeader';
import SideBarView from './SideBarView';
import moment from 'moment'


export default function Index() {
  const { userData } = useContext(Store);
  const [userList,setUserList] = useState([])
  const [channel,setChannel] = useState({})
  const [openChannel,setopenChannel] = useState({})

  const [messageList,setmessageList] = useState({})
  const [message,setmessage] = useState('')




    const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A"
    let sb = new SendBird({appId: APP_ID, localCacheEnabled: true });

    useEffect(() => {
        createConnection()
        // OpenChannel()
    }, [])
    


    useEffect(()=>{
        if(channel && channel?.url){
            sb.GroupChannel.getChannel(channel.url, function(GroupChannel, error) {
                // setopenChannel(previousMessageQuery)
                // GroupChannel.join(function(response, error) {
                //     console.log('response, error',response, error);
                // })
      console.log(GroupChannel.isPublic , GroupChannel);
                let previousMessageQuery = GroupChannel.createPreviousMessageListQuery();

                previousMessageQuery.load(10, false, (messageList, error) => {
                    if(!error){
                        setmessageList(messageList)
                    }
                  });
            });

      
            
        }
  
    },[channel.url])
    
    const createConnection =() =>{
        sb.connect(userData.uid, function(user, error) {
            if (user) {
                channelList()
            }else{
                console.log('someThing went wrong');
            }
            
        });
    }

    // const OpenChannel = () =>{
    //     sb.OpenChannel.createChannel(function(openChannel, error) {
    //         if (openChannel) {
    //             console.log(openChannel);
    //             // Handle error.
    //         }
        
    //     });
    // }


    // const channelList = () =>{
    //      let listQuery = sb.createApplicationUserListQuery();
    //     listQuery.next(function(Users, error) {
    //         if(Users){setUserList(Users)}
    //         console.log(Users)
    //     });

    // }

    const channelList = () =>{
         let GroupChannelList =  sb.GroupChannel.createMyGroupChannelListQuery();
         GroupChannelList.next((list, error) => {
            console.log('list',list);
            list && setUserList(list) 
          });

    }

    const printDate = (upcoming,previous,index) =>{        
        if(dateFormat(messageList[0]?.createdAt) === dateFormat(messageList.at(-1)?.createdAt) && index === 0)  return dateFormat(upcoming.createdAt)
        else if(dateFormat(upcoming.createdAt) === dateFormat(previous?.createdAt))  return '' 
        else return dateFormat(upcoming.createdAt)
    }

    const dateFormat = (date) =>{
        return  moment(date).format('DD-MM-YYYY')
    }

    const sendMessage = () =>{
        if(channel && message )
        var params = new sb.UserMessageParams();
        params.message = message;


        channel.sendUserMessage(params, (message, error) => {
            console.log(message, error);
            if (error) {
                // Handle error.
            }
        
            // A reply to a specific message in the form of a text message is successfully sent.
            // ...
        });

    }
  return (
    <div className='container mt-5'>
        <div className='row'>
            {console.log(channel)}
            <div className='w-100 d-flex'>
                <div className='col-3 border d-flex top_header'>
                    <img className='cus_img_profile' src="https://file-us-1.sendbird.com/397d6dde31d049c8a026cef8eb579854.jpg" alt='profileimage' />
                    <p> {userData.email}</p>
                </div>
                <div className='col-9 border'>
                    <TopHeader channel={channel}  userData={userData} />
                </div>

                

            </div>
            <div className='col-3 chat_side_bar'>
                <ul>
                    {
                       userList.map(user =>
                        <li key={user.userId} className={user?.url === channel?.url ? 'active' : ''}>
                            <SideBarView  user={user} setChannel={setChannel} userData={userData} />
                        </li>

                        ) 
                    }
                </ul>
            </div>
            <div className='col-9 border msg_list p-0'>
            <ul>
                    {
                        messageList.length > 0 &&
                        messageList?.map((msg,index) =>

                            <li className='msg_ul'>
                                <span className='text-center'>
                                {printDate(messageList[index], messageList[index - 1],index)}
                                
                                </span>
                                <div  className={msg?._sender?.userId === userData.uid ? 'sent' : 'receiver'}>
                                {msg?.message}
                                </div>
                            </li>
                        )
                        
                    }
            </ul>
            <div className='msg-input d-flex'>
                <input className='form-control' value={message} onChange={(e)=>setmessage(e.target.value)} />
                <button className='btn btn-primary' onClick={sendMessage} >send</button>

            </div>
            </div>
        </div>
    </div>
  )
}
