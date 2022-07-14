import { useState ,  useRef ,useContext, useEffect} from 'react'
import { Container } from '@mui/material'
import { Formik , ErrorMessage } from 'formik'
import { addUser } from '../../Forms/InitialValues'
import { addUserSchema } from '../../Forms/Validation'
import Switch from '@mui/material/Switch';
import { db } from '../../firebase'
import { Store } from '../../App'
import { useNavigate ,useParams  } from 'react-router'
import { doc, setDoc,getDoc } from "firebase/firestore"; 


const Edit = ()=>{
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const { userData } = useContext(Store)
    const [errorMessage, seterrorMessage] = useState('')
    const [disabledSubmit, setdisabledSubmit] = useState(false)
    const Navigate = useNavigate()
    let maxDate =new Date().toISOString().split("T")[0]
    const formRef = useRef() 
    let{ Id } = useParams();
    
    useEffect(()=>{
        getUserDetails()
    },[])
    
    const getUserDetails = async () => {
        const docRef = doc(db, "users", Id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let patchValue = docSnap.data();
          console.log(patchValue);
          for (let item in formRef.current.values) {
            formRef.current.setFieldValue(item, patchValue[item]);
          }
        } else {
          seterrorMessage("No such record found");
        }
      };

      const onSubmit = async (values) =>{
        setdisabledSubmit(true)
        values.createdById = userData?.uid
        try{
             await setDoc(doc(db, "users", formRef.current?.values.empId),values);
             formRef.current.resetForm()
             Navigate('/dashboard')
        }catch(err){
            seterrorMessage(err);
            setdisabledSubmit(false)
        }
      }

  return (
    <Container component="main" maxWidth="sm" className="for_center">
    <div className="box">
      <h1> Edit User </h1>
      <Formik
        innerRef={formRef}
        initialValues={addUser}
        validationSchema={addUserSchema}
        onSubmit={async (values) => onSubmit(values)}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {errorMessage &&  <div className="alert_box mt-1">{errorMessage}</div>}

            <div className="mt-1">
     
              <label>Name <span className="required_field">*</span></label>
              <input type="text" className="form-control" autoComplete='true' {...formik.getFieldProps("name")}/>
              <ErrorMessage name="name">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>Email address <span className="required_field">*</span></label>
              <input type="email" className="form-control" {...formik.getFieldProps("email")} disabled/>
              <ErrorMessage name="email">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>Dob <span className="required_field">*</span></label>
              <input type="date" className="form-control" {...formik.getFieldProps("dob")}  max={maxDate} />
              <ErrorMessage name="dob">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>At work </label>
              
              <Switch {...label}  {...formik.getFieldProps("atWork")} className="d-block" checked={formik.values.atWork} />
              <ErrorMessage name="atWork">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>Salary <span className="required_field">*</span></label>
              <input type="number" className="form-control" {...formik.getFieldProps("salary")}  />
              <ErrorMessage name="salary">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div> 

            <div className="mt-1">
              <label>Employee Id </label>
              <input type="text" className="form-control" {...formik.getFieldProps("empId")}  disabled />
            </div>

            <button className="common_btn mt-1" type="submit" disabled={disabledSubmit}> Submit</button>
          </form>
        )}
      </Formik>
    </div>
  </Container>
  )
}


export default Edit 