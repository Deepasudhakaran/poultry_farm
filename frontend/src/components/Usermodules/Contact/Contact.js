import React from 'react';
import './Contact.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Createusermessage } from '../../../Services/UserApi';


const validationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  message: Yup.string().required('message is required'),
});

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const postData = {
          name: values.name,
          message: values.message,

        };
        const response = await Createusermessage(postData);
        console.log('message created successfully:', response);
        toast.success('create successful');
      } catch (error) {
        console.error('Error create:', error.message);
        toast.error('Error creating message');
      }
    },
  });
  return (
    <div>
      <div className='con'>
        <section id="contact">
          <h1 class="section-header">Contact</h1>
          <div class="contact-wrapper">
            <form class="form-horizontal" onSubmit={formik.handleSubmit} >
              <input
                type="text"
                placeholder="name"
                name="name"
                className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback">{formik.errors.name}</div>
              )}
              <br />

              <textarea
                name="message"
                id="message"
                rows="10"
                className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
                placeholder="MESSAGE"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.inclusions && formik.errors.inclusions && (
                <div className="invalid-feedback">{formik.errors.inclusions}</div>
              )}
              <br />
              <button class="btn btn-primary send-button" id="submit" type="submit" value="SEND">
                <div class="alt-send-button">
                  <i class="fa fa-paper-plane"></i><span class="send-text">SEND</span>
                </div>
              </button>
            </form>
            <div class="direct-contact-container">

              <ul class="contact-list">
                <li class="list-item"><i class="fa fa-map-marker fa-2x"><span class="contact-text place">Malappuram, kerala</span></i></li>
                <li class="list-item"><i class="fa fa-phone fa-2x"><span class="contact-text phone">(212) 555-2368</span></i></li>
                <li class="list-item"><i class="fa fa-envelope fa-2x"><span class="contact-text gmail"><a href="mailto:#" title="Send me an email">hitmeup@gmail.com</a></span></i></li>
              </ul>
              <hr />
              <ul class="social-media-list">
                <li><a href="/" target="_blank" class="contact-icon">
                  <i class="fa-brands fa-github" aria-hidden="true"></i></a>
                </li>
                <li><a href="/" target="_blank" class="contact-icon">
                  <i class="fa-brands fa-facebook" aria-hidden="true"></i></a>
                </li>
                <li><a href="/" target="_blank" class="contact-icon">
                  <i class="fa-brands fa-twitter" aria-hidden="true"></i></a>
                </li>
                <li><a href="/" target="_blank" class="contact-icon">
                  <i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                </li>
              </ul>
              <hr style={{ color: "black" }} />
              <div class="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
            </div>
          </div>
        </section>
      </div><br /><br />
      <ToastContainer />
    </div>
  );
}

export default Contact;
