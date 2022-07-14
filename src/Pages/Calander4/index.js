import React from 'react'
import { atcb_init } from 'add-to-calendar-button'


const MyComponent = () => {
    React.useEffect(atcb_init, [])
    return (
      <div className='atcb' style={{display: 'none'}}>
        {JSON.stringify({
            name: "Some event Pawan bhatt",
            startDate: "2022-05-25",
            endDate: "2022-06-06",
            options: ['Apple', 'Google', 'iCal', 'Microsoft365', 'Outlook.com', 'MicrosoftTeams', 'Yahoo'],
            trigger: "click",
            description:"A nice description does not hurt",
            iCalFileName: "Reminder-Event",
            repeat: "weekly",
            byDay: "Th",
       
          })}
      </div>
    );
}

export default  MyComponent