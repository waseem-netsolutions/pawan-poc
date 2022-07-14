import React , {useState}from 'react'
import AddToCalendar from 'react-add-to-calendar-recurring';
// import './mystyle.css'
 
export default function Index() {

    // const [first, setfirst] = useState(false) 
    const [event, setevent] = useState({
      title: "Miraxis Physician",
      description: "This is the sample event provided as an example only",
      
      location: "Portland, OR",
      startTime: '20220527T001500Z',
      endTime: '20220610T014500Z',
      recurring: {
        repeat: "Weekly",
        byDay: "TU,WE",
        interval: 1 /* Default is 1 */,
        weekStart: "SU" /* Week start default is Sunday */,
        count: 10 /* Weekly for 10 occurrences */
      },
    })

      let items = [
        { outlook: 'Outlook' },
        { outlookcom: 'Outlook.com' },
        { apple: 'Apple Calendar' },
        { yahoo: 'Yahoo' },
        { google: 'Google' },
     ];
     console.log('reload');

  return (
    <div className='container'>
        {/* <button onClick={()=>setfirst(e=> !e )}>update</button> */}
        Index
        <AddToCalendar 
        listItems={items} 
        event={event}
        optionsOpen={true}
           displayItemIcons={false}
        />
            
    </div>
  )
}
