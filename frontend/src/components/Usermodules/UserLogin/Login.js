import React from 'react';
import './Login.css'
import {  Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { userLogin } from '../../../Services/UserApi';



const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});



const Login = () => {

  const navigate = useNavigate();
 
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (userData) => {
      try {
          const data = await userLogin(userData)
          console.log(userData, '111111');
          if (data.status) {
              navigate('/');
              localStorage.setItem('userToken', data.token);
              toast.success(data.message);
          } else {
              toast.error(data.message);
          }

      } catch (error) {
          console.log('Error logging in:', error.message);
          toast.error('Error logging in');
      }
  },
  });
 

  return (
    <div className='login-page '>
        <div className='login'>
            <div className='form'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Login</h2><br/>

        <label>Email</label>
        <input 
         type='email'
         name='email'
         placeholder='enter the email'
         onChange={formik.handleChange}
          onBlur={formik.handleBlur}
         required/>
         {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

        <label>Password</label>
        <input 
        type='password'
        name='password'
        placeholder='enter the password'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required/>
        {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
       
        <button>Login</button>
        <p className='ptag'>Don't have an account? <Link to='/register'>Register</Link></p>
      </form>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
