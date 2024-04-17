
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../../Services/AdminApi';
import { setAdminDetails } from '../../../Features/setAdmin';
import './AdminLogin.css';


const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});


const Adminlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await adminLogin(values);
        if (data.status) {
          dispatch(setAdminDetails(data.admin));
          navigate('/admin/');
          localStorage.setItem('adminToken', data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error.message);
        toast.error('Error logging in');
      }
    },
  });
  return (

    <div className='login-page'>
      <div className='login'>
      <div className='adminform '>
        <h2>Login</h2><br />
        <form onSubmit={formik.handleSubmit}>
          <label>Email</label>
              <input
                type='email'
                name='email'
                placeholder='enter the email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}

              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='********'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
          <button className='btn btn-success w-100 rounded-0'>Login</button>
        </form>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Adminlogin;
