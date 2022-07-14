import * as Yup from "yup";
import Pattern from "./Pattern";


  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').matches(Pattern.EMAIL,"Email is not valid"),
    password:Yup.string().required('Enter a password').matches(Pattern.PASSWORD,'Password should be of 6 letters, one Capital letter, alphanumeric a-z 0-9, and one special character'),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required').matches(Pattern.EMAIL,"Email is not valid"),
    password:Yup.string().required('Enter a password')
  });

  const addUserSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Enter a name').matches(Pattern.NAME,"Name is not valid"),
    email: Yup.string().email('Invalid email').required('Email is Required').matches(Pattern.EMAIL,"Email is not valid"),
    salary:Yup.number().min(0,'salary not be in minus').required('Enter a salery'),
    dob:Yup.string().required('Enter a Dob')
  });

  const AddlocationsSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Enter a name').matches(Pattern.NAME,"Name is not valid"),
    speciality: Yup.string().required('speciality is required'),
    address:Yup.string().required('fullAddress is required'),

  });
   
  
  export {
    signupSchema,
    loginSchema,
    addUserSchema,
    AddlocationsSchema

  }