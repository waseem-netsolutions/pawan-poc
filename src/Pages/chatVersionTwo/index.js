import React  from 'react'
import { Store } from '../../App';
import "sendbird-uikit/dist/index.css";
import {  SendBirdProvider } from 'sendbird-uikit';
import CustomizeApp from './CustomizeApp';
import { useContext , useState } from 'react';


export default function Index() {

    const { userData } = useContext(Store);
    const APP_ID = "812BDBE5-3FE7-45AA-B86E-308FF8CA921A"
    const [chatModule, setchatModule] = useState('INTERNAL')
    const [offices, setoffices] = useState('office-one')


  return (
      <div className='container mt-5 mb-5'>
          <div className='row'>
        <button onClick={()=>setchatModule('INTERNAL')} className={`btn m-2 ${chatModule === 'INTERNAL' ? 'btn-primary':''}`}>Internal</button>
        <button onClick={()=>setchatModule('EXTERNAL')} className={`btn m-2 ${chatModule === 'EXTERNAL' ? 'btn-primary':''}`}>External</button>
        </div>   

        <div className='mb-5'>
            <select className='form-control' value={offices} onChange={e =>setoffices(e.target.value)}>
                <option value={'office-one'}>office-one</option>
                <option value={'office-two'}>office-two</option>                
            </select>
        </div>   

            <SendBirdProvider  
            appId={APP_ID} 
            userId={userData?.uid} 
            nickname={userData?.email}
            >
            <CustomizeApp 
            userData={userData}
            module={chatModule}
            office={offices}
            />
        </SendBirdProvider>
        </div>
  )
}
