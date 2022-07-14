// import React from 'react'
// import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
// import { useState } from "react";

// export default function Addloc() {
//   let {
//     placePredictions,
//     getPlacePredictions,
//     isPlacePredictionsLoading,
//   } = useGoogle({
//     apiKey: 'AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s',
//   });
//   const [value, setValue] = useState("");


//   return (
//     <div>
//         <input

//         style={{ color: "black" }}
//         value={value}
//         placeholder="Debounce 500 ms"
//         onChange={(evt) => {
//           getPlacePredictions({ input: evt.target.value });
//           setValue(evt.target.value);
//         }}
//         loading={isPlacePredictionsLoading}
//       />

// {!isPlacePredictionsLoading && (
//           placePredictions.map((item,index)=>{
//             return(
//               <p
//               key={index}
//                onClick={()=>{
//                 setValue(item.description)
//                 getPlacePredictions({ input: '' });

//               }}>{item?.description}</p>
//             )
//           }
//             )
//         )}
//     </div>
//   )
// }



import React , {useRef,useState,useContext,useEffect} from 'react'
import { Container } from '@mui/material'
import { Formik,ErrorMessage } from "formik";
import { Addlocations } from "../../Forms/InitialValues";
import Autocomplete from "react-google-autocomplete";
import { Store } from '../../App';
import { db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router'
import { AddlocationsSchema } from '../../Forms/Validation'



const Speciality = ['Medicine', 'Surgeon', 'Ortho','ANT']


const Addlocation = (props) => {
  const [disabledSubmit, setdisabledSubmit] = useState(false)
  const { userData } = useContext(Store)
  const [errorMessage, seterrorMessage] = useState('')
  const formRef = useRef() 
  const Navigate = useNavigate()





  const onSubmit = async  (values) =>{
    console.log(values)
    if(!values?.location.lat || !values?.location.long ){
      seterrorMessage('Select location from Drop-down list');
      return
    }
    setdisabledSubmit(true);
    values.createdById = userData?.uid;
    try {
      await setDoc(doc(db, "locations",values.docId), values);
      formRef.current.resetForm();
      Navigate("/dashboard/map");
    } catch (err) {
      seterrorMessage(err);
      setdisabledSubmit(false);
    }
  }

  const createId =(name) =>{
    formRef.current.setFieldValue('docId',Math.random().toString(36).replace('0.',name.slice(0,3)));
}

  return (
    <Container component="main" maxWidth="sm" className="for_center">
    <div className="box">
        <Formik
        initialValues={Addlocations}
        innerRef={formRef}
        validationSchema={AddlocationsSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {errorMessage &&  <div className="alert_box mt-1">{errorMessage}</div>}

            <div className="mt-1">
              <label>Name <span className="required_field">*</span></label>
              <input type="text" className="form-control"name='name' onBlur={formik.handleBlur} value={formik.values.name}
              autoComplete="off"
              onChange={e=>{
                   formik.handleChange(e);
                   e.target.value?.length > 2 && createId(e.target.value)
              }}

              
              />
              <ErrorMessage name="name">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>
    
            <div className="mt-1">
              <label>Speciality <span className="required_field">*</span></label>
              <select className="form-control"  {...formik.getFieldProps("speciality")}>
                
              <option value='' >Select</option>
              { Speciality.map((item,index) => <option value={item} key={index}>{item}</option>)}
              </select>
              <ErrorMessage name="speciality">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>
    
                <div className='mt-1'>
                <label>Location <span className="required_field">*</span></label>

                <Autocomplete
                    className="form-control"
                    name="address"
                    {...formik.getFieldProps("address")}
                    placeholder="Location"
                    value={formik.values.address}
                    apiKey={Autocomplete_key}

                    autoComplete="off"

                    onPlaceSelected={(place) =>{
                      place &&
                      formik.setFieldValue('address',place.formatted_address)
                      formik.setFieldValue('location.lat',place.geometry?.location.lat())
                      formik.setFieldValue('location.long',place.geometry?.location.lng())
                    }}



                    options={{
                      strictBounds: false,
                      types: ['hospital', 'pharmacy', ]

                    }}
                    />
              <ErrorMessage name="address">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>

                  </div>
     
    
            <button role="button" className="common_btn mt-1" type="submit" disabled={disabledSubmit} > Submit</button>
          </form>
        )}
      </Formik>
      </div>
    </Container>
  )
}

export default  Addlocation


const Autocomplete_key = `AIzaSyC0y2S4-iE2rHkYdyAsglz_qirv0UtpF1s`
