import  React, {useEffect}  from 'react'
import SendBird from 'sendbird'

export default function Index() {

  const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A"

    useEffect(()=>{
        var sb = new SendBird({appId: APP_ID, localCacheEnabled: true });   // The `localCacheEnabled` is optional.

        sb.connect('9898989898', function(user, error) {
            console.log(user, error);
            if (error) {
                // Handle error.
                console.log('in if');
            }else{
                console.log('in else');
            }
        
            // The user is connected to Sendbird server.
        });

    },[])


  return (
    <div>index</div>
  )
}
