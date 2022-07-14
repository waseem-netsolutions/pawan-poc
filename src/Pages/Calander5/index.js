import React from "react";
import moment from "moment"; 

export default function index() {
        
  let options = [
    "Apple",
    "google",
    "iCal",
    "Microsoft365",
    "outlookcom",
    "MicrosoftTeams",
    "yahoo",
  ];
  let event = {
    title: "Monthly event on every 29 feb",
    description: "Monthly event on every 29 feb",
    location: "Portland, OR",
    startTime: '20230129T103000Z',
    endTime: '20230129T113000Z',
    recurring: {
      repeat: "MONTHLY",
      BYMONTHDAY:'29'
      // byDay :'05',
      // WKST:'SU'
      // BYDAY=TU,TH
      // byDay: '15',
      // weekStart:'Su'
    },
    UNTIL:"20230329T103000Z"
  };



// Daily - Start & End Date Timed Event Like 4-6 PM




  function formatTime(date) {
    var formattedDate = moment.utc(date).format("YYYYMMDDTHHmmssZ");
    return formattedDate.replace("+00:00", "Z");
  }

  function buildRecurringEvent() {

    if (!event.recurring) return '';

    if (typeof event.recurring === 'string') {
      return event.recurring;
    }

    //weekely
    var recur = "RRULE:FREQ=" + event.recurring.repeat;

    // Until 
    if(event.UNTIL){ recur =recur + ";UNTIL=" + (event.UNTIL)}
    if(event.recurring.weekStart){ recur =recur + ";WKST=" + (event.recurring.weekStart)}


    if(event.recurring.interval){ recur =recur + ";INTERVAL=" + (event.recurring.interval)}
    if (event.recurring.byDay) {       recur = recur + ";BYDAY=" + event.recurring.byDay;}


    if (event.recurring.count) {
      recur = recur + ";COUNT=" + event.recurring.count;
    }
    if (event.recurring.byMonth) {
      recur = recur + ";BYMONTH=" + event.recurring.byMonth;
    }
    if (event.recurring && event.recurring.BYMONTHDAY) {
      recur = recur + ";BYMONTHDAY="+ event.recurring.BYMONTHDAY;
    }
    console.log(recur.toUpperCase());
    return recur.toUpperCase();
  };




  function calculateDuration(startTime, endTime) {
    // snag parameters and format properly in UTC
    var end = moment.utc(endTime).format("DD/MM/YYYY HH:mm:ss");
    var start = moment.utc(startTime).format("DD/MM/YYYY HH:mm:ss");

    // calculate the difference in milliseconds between the start and end times
    var difference = (0, moment)(end, "DD/MM/YYYY HH:mm:ss").diff((0, moment)(start, "DD/MM/YYYY HH:mm:ss"));

    // convert difference from above to a proper momentJs duration object
    var duration = moment.duration(difference);

    return Math.floor(duration.asHours()) + moment.utc(difference).format(":mm");
  }


  function getRandomKey() {
    var n = Math.floor(Math.random() * 999999999999).toString();
    return new Date().getTime().toString() + "_" + n;
  }

  const addCalander = (item) =>{
    let calendarUrl = ''
    console.log(item);
     switch (item) {

        case "google":
          calendarUrl = "https://calendar.google.com/calendar/render";
          calendarUrl += "?action=TEMPLATE";
          calendarUrl += "&dates=" + formatTime(event.startTime);
          calendarUrl += "/" + formatTime(event.endTime);

          if (event.recurring) {
            calendarUrl += "&recur=" + buildRecurringEvent();
          }
        

          calendarUrl += "&allday=true";
    
          calendarUrl += "&location=" + encodeURIComponent(event.location);
          calendarUrl += "&text=" + encodeURIComponent(event.title);
          calendarUrl += "&details=" + encodeURIComponent(event.description);
        
          console.log(calendarUrl,'hwy');
          moveToPage(calendarUrl)

          break;
    
        case "yahoo":
          // yahoo doesn't utilize endTime so we need to calulate duration
          var duration = calculateDuration(event.startTime, event.endTime);
          calendarUrl = "https://calendar.yahoo.com/?v=60&view=d&type=20";
          calendarUrl += "&title=" + encodeURIComponent(event.title);
          calendarUrl += "&st=" + formatTime(event.startTime);
          calendarUrl += "&dur=" + duration;
          calendarUrl += "&desc=" + encodeURIComponent(event.description);
          calendarUrl += "&in_loc=" + encodeURIComponent(event.location);
          
          if (event.recurring) {
            calendarUrl += "&recur=" + buildRecurringEvent();
          }
    
          moveToPage(calendarUrl)

          break;
    
        case "outlookcom":
          calendarUrl = "https://outlook.live.com/owa/?rru=addevent";
          calendarUrl += "&startdt=" + '25150202T170000';
          calendarUrl += "&enddt=" + "25150202T180000";
          calendarUrl += "&subject=" + encodeURIComponent(event.title);
          calendarUrl += "&location=" + encodeURIComponent(event.location);
          calendarUrl += "&body=" + encodeURIComponent(event.description);
          calendarUrl += "&allday=false";
          calendarUrl += "&uid=" + getRandomKey();
          calendarUrl += "&path=/calendar/view/Month";
          if (event.recurring) {
            calendarUrl += "&recur=" + buildRecurringEvent();
          }
    console.log(calendarUrl);
          moveToPage(calendarUrl)

          break;
    
        default:
            calendarUrl = [
              "BEGIN:VCALENDAR",
               "VERSION:2.0",
               "BEGIN:VEVENT", 
               "URL:" + document.URL,
                "DTSTART:" + event.startTime, 
                "DTEND:" + event.endTime,
                 "SUMMARY:" + event.title,
                  "DESCRIPTION:" + event.description, 
                  "LOCATION:" + event.location];
       
                if (event.recurring ) {
                  calendarUrl = calendarUrl.concat([buildRecurringEvent()]);
                }
           
                calendarUrl = calendarUrl.concat(["END:VEVENT", "END:VCALENDAR"]);
                calendarUrl = calendarUrl.join("\n");
                console.log('i am in default',calendarUrl);
    
 
        calendarUrl = encodeURI("data:text/calendar;charset=utf8," + calendarUrl);
        window.open(calendarUrl)

      }

  }

    function moveToPage(url){
        window.open(url, "_blank");
    }

    


  return (
    <div className="mt-5 container">
      <ul>
        {options.map((item) => (
          <li onClick={()=>addCalander(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
