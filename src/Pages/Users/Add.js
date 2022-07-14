import { useState ,  useRef ,useContext} from 'react'
import { Container } from '@mui/material'
import { Formik , ErrorMessage } from 'formik'
import { addUser } from '../../Forms/InitialValues'
import { addUserSchema } from '../../Forms/Validation'
import Switch from '@mui/material/Switch';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase'
import { Store } from '../../App'
import { useNavigate } from 'react-router'

const Add=() => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const { userData } = useContext(Store)
    const [errorMessage, seterrorMessage] = useState('')
    const [disabledSubmit, setdisabledSubmit] = useState(false)
    const Navigate = useNavigate()
    let maxDate = new Date().toISOString().split("T")[0]
    const formRef = useRef() 

    const createId =(name) =>{
        formRef.current.setFieldValue('empId',Math.random().toString(36).replace('0.',name.slice(0,3)));
    }

    const onSubmit = async (values) => {
      setdisabledSubmit(true);
      values.createdById = userData.uid;
      try {
        await setDoc(doc(db, "users", formRef.current?.values.empId), values);
        formRef.current.resetForm();
        Navigate("/dashboard");
      } catch (err) {
        seterrorMessage(err);
        setdisabledSubmit(false);
      }
    };

  return (
    <Container component="main" maxWidth="sm" className="for_center">
    <div className="box">
      <h1> Add User </h1>
      <Formik
        innerRef={formRef}
        initialValues={addUser}
        validationSchema={addUserSchema}
        onSubmit={ (values) => onSubmit(values) }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {errorMessage &&  <div className="alert_box mt-1">{errorMessage}</div>}

            <div className="mt-1">
     
              <label>Name <span className="required_field">*</span></label>
              <input type="text" className="form-control"name='name' onBlur={formik.handleBlur} value={formik.values.name}
              autoComplete='true'
              onChange={e=>{
                   formik.handleChange(e);
                   e.target.value?.length > 2 && createId(e.target.value)
              }}

              
              />
              <ErrorMessage name="name">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>Email address <span className="required_field">*</span></label>
              <input type="email" className="form-control" {...formik.getFieldProps("email")}/>
              <ErrorMessage name="email">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>Dob <span className="required_field">*</span></label>
              <input type="date" className="form-control" {...formik.getFieldProps("dob")}  max={maxDate} />
              <ErrorMessage name="dob">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
            </div>

            <div className="mt-1">
              <label>At work </label>
              <Switch {...label} checked={formik.values.atWork} {...formik.getFieldProps("atWork")} className="d-block"  />
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


export default Add
