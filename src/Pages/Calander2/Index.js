import React from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function Index() {

    
    const myEventsList = [
        {
            startDate:'Tue May 24 2022 16:29:23 GMT+0530 (India Standard Time)',
            endDate:'Wen May 25 2022 16:29:23 GMT+0530 (India Standard Time)',
            title:'first'
        },
        {
            startDate:'Sun May 1 2022 16:29:23 GMT+0530 (India Standard Time)',
            endDate:'Mon May 2 2022 16:29:23 GMT+0530 (India Standard Time)',
            title:'Secound'
        }
    ]
    


  return (
    <div>
          <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
    </div>
  )
}
