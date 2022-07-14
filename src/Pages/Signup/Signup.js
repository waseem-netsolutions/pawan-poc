import Container from "@mui/material/Container";
import { Formik,ErrorMessage } from "formik";
import { signUpValues } from "../../Forms/InitialValues";
import { signupSchema } from "../../Forms/Validation";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {createUserWithEmailAndPassword} from "@firebase/auth"

 const SignUp =()=> {
  const [errorMessage, seterrorMessage] = useState('')
  const [passwordType, setpasswordType] = useState('password')
  let navigate = useNavigate();
  const changePasswordType = () =>{setpasswordType(passwordType === 'password' ? 'text' : 'password')}

  return (
    <Container component="main" maxWidth="sm" className="for_center">
      <div className="box">
        <h1> Signup </h1>
     
        <Formik
          initialValues={signUpValues}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            try {
               await createUserWithEmailAndPassword(auth,values.email,values.password)
               navigate('/dashboard')
            }
            catch(err) {
              seterrorMessage(err.message);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              {errorMessage &&  <div className="alert_box mt-1">{errorMessage}</div>}
       

              <div className="mt-1">
                <label>Email address <span className="required_field">*</span></label>
                <input type="email" className="form-control" {...formik.getFieldProps("email")} placeholder='Email'/>
                <ErrorMessage name="email">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
              </div>

              <div className="mt-1 eye_change">
                <label>Password <span className="required_field">*</span> </label>
                <input type={passwordType} className="form-control" {...formik.getFieldProps("password")} placeholder='Password' />
                <span onClick={changePasswordType} className='eye'>
                {passwordType === 'password' ?  <VisibilityIcon/> : <VisibilityOffIcon /> }
                </span>
                <ErrorMessage name="password">{msg => <div className="error_message">{msg}</div>}</ErrorMessage>
              </div>

              <button role="button" className="common_btn mt-1" type="submit"> Submit</button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}


export default SignUp