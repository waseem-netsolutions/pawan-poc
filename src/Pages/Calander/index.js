import DatePicker from "react-datepicker";
import React, { useState , useEffect } from 'react'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";





export default function Index() {
    const [dates, setdates] = useState([])
    const [selecteddate, setselecteddate] = useState(new Date())
    let datePickerDate = new Date(selecteddate)


    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    let totalDays = (month, year) => { return new Date(year, month, 0).getDate(); };
    let day = (day) => { return weekday[day.getUTCDay()]; };

    useEffect(()=>{
        console.log(selecteddate);
        createCalander(selecteddate)
    },[selecteddate])


    const json = [
    {
        startDate:'Tue May 24 2022 16:29:23 GMT+0530 (India Standard Time)',
        endDate:'Wen May 25 2022 16:29:23 GMT+0530 (India Standard Time)',
        title:'first'
    },
    {
        startDate:'Sun May 1 2022 16:29:23 GMT+0530 (India Standard Time)',
        endDate:'Mon May 2 2022 16:29:23 GMT+0530 (India Standard Time)',
        title:'Secound'
    },
    {
        startDate:'Mon Jul 25 2022 16:29:23 GMT+0530 (India Standard Time)',
        endDate:'Mon Jul 25 2022 16:29:23 GMT+0530 (India Standard Time)',
        title:'first'
    },
    {
        startDate:'Fri Jul 1 2022 16:29:23 GMT+0530 (India Standard Time)',
        endDate:'Sat Jul 2 2022 16:29:23 GMT+0530 (India Standard Time)',
        title:'Secound'
    }
]





    function createCalander(date) {
        let totalMonthDays = totalDays(moment(date).format("MM"), moment(date).format("YYYY"));
        let monthStartDays = moment(date).startOf('month').format('YYYY-MM-DD hh:mm')
        let calanderDay = day(new Date(monthStartDays));
        let dayData = [];
        for (let i = 0; i < totalMonthDays; i++) { dayData.push({ date: i + 1 }); }
        for (let item of weekday) {
            if (item === calanderDay) break
            else { dayData.unshift({ date: "", }) }
        }
        
       let finalArray =  dayData.map((day)=>{
           for(let item of json){
               let startDate = moment(item.startDate).format('DD')
               let endDate = moment(item.endDate).format('DD')
               if(day.date == startDate && moment(item.startDate).format('MM') == moment(date).format('MM')){
                   day.className = 'bg-danger text-light'
                   day.data = item
                }
               
            }
            return  day
        })
          

        
        console.log(finalArray);
        setdates([...finalArray]);
    }

  return (
    <div className='container mt-5'>
        <div className='row'>
            <div className=' col-4'>
        <button className='btn btn-primary' onClick={()=>{ setselecteddate(moment(selecteddate).subtract(1,'month')) }}>{`<`}</button>
        {moment(selecteddate).format('DD-MM-YYYY')}
        <button className='btn btn-primary' onClick={()=>{
            let add = moment(selecteddate).add(1,'M')
      
            setselecteddate(add)
            }}>{`>`}</button>


                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    className="c-form-control"
                                    selected={datePickerDate}
                                    onChange={(e)=> setselecteddate(e)}
                                    inline
                                />


            </div>
            <div className='col-8'>
            {
                                            dates &&
                                                <>
                                                    <div className="row calander_Head">
                                                        {weekday.map((item) => (
                                                            <div className="cus-width" key={item}> {item.slice(0, 1)}</div>
                                                        ))}
                                                    </div>
                                                    <div className="row calander_body">
                                                        {dates?.map((item, index) => (
                                                            <div className={`cus-width ${item?.className && item.className }`} key={index} > 
                                                            <p className="mb-0">{item.date}</p>
                                                            <p className="mb-0" > {item?.data?.title}</p>
                                                             </div>))}
                                                    </div>
                                                </>
                                              
                                        }
            </div>
        </div>
    </div>
  )
}
