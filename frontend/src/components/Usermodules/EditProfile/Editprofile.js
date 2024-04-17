import React from 'react';
import './Editprofile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { userProfile } from '../../../Services/UserApi';
import { useParams } from 'react-router-dom';


const validationSchema = Yup.object().shape({
  farmname: Yup.string().required('farmname is required'),
  ownername: Yup.string().required('ownername is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  farmid: Yup.number().required('farmid is required'),
  address: Yup.string().required('address is required'),
  phoneno: Yup.number().required('phoneno is required'),
  houseno: Yup.number().required('housenois required'),
  capacity: Yup.number().required('capacity is required'),
  birdno: Yup.number().required(' birdno is required'),
  broilerno: Yup.number().required('broilerno is required'),
  breederno: Yup.number().required('breederno is required'),
  layerno: Yup.number().required('layerno is required'),
});


const Editprofile = () => {

  const userId = useParams().userid;


  const formik = useFormik({
    initialValues: {
      farmname: '',
      ownername: '',
      email: '',
      farmid: '',
      address: '',
      phoneno: '',
      houseno: '',
      capacity: '',
      isBroiler: false,
      isLayer: false,
      isBreeder: false,
      birdno: '',
      broilerno: '',
      breederno: '',
      layerno: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ( values) => {
      try {
        await userProfile(userId, values);
        console.log('Profile updated successfully');
        toast.success('Profile updated successfully');

      } catch (error) {
        console.error('Error craeting report:', error.message);
        toast.error('Error creating report');
      }
    },
  });





  return (

    <div>
      <div className='pf-card'>
        <form onSubmit={formik.handleSubmit}>
          <h2>Farm Details</h2><br /><br />
          <i>  <legend>General Informations</legend></i>

          <div class="row">
            <div class="col">
              <label>Farm Name :</label>
              <input
                type="text"
                name="farmname"
                className='form-control'
                value={formik.values.farmname}
                placeholder="enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.farmname && formik.errors.farmname && (
                <div className="error-message">{formik.errors.farmname}</div>
              )}


            </div>
            <div class="col">
              <label>Owner Name :</label>
              <input type="text"
                placeholder="Owner name"
                name='ownername'
                className={`form-control${formik.touched.ownername && formik.errors.ownername ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ownername}
              />
              {formik.touched.ownername && formik.errors.ownername && (
                <div className="invalid-feedback">{formik.errors.ownername}</div>
              )}

            </div>
          </div><br />

          <div class="row">
            <div class="col">
              <label>Farm Email :</label>
              <input type="text"
                placeholder="Farm email"
                name='email'
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}

            </div>
            <div class="col">
              <label>Farm Id :</label>
              <input type="text"
                placeholder="Farm id"
                name='farmid'
                className={`form-control ${formik.touched.farmid && formik.errors.farmid ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.farmid}
              />
              {formik.touched.farmid && formik.errors.farmid && (
                <div className="invalid-feedback">{formik.errors.farmid}</div>
              )}
            </div>
          </div><br />

          < div class="row">
            <div class="col">
              <label>Address :</label>
              <textarea
                class="form-control"
                rows="3"
                cols="10"
                name="address"
                className='form-control'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                placeholder='Enter the address'
                required
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <div className="invalid-feedback">{formik.errors.address}</div>
              )}
            </div>
            <div class="col">
              <label >Phone Number :</label>
              <input
                type="text"
                name="phoneno"
                className='form-control'
                value={formik.values.phone}
                placeholder="enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneno && formik.errors.phoneno && (
                <div className="error-message">{formik.errors.phoneno}</div>
              )}
              <br /><br />

            </div>
          </div><br /><br />
          <i><legend>Farm Infrastructure: </legend></i><br />

          <div class="row">
            <div class="col">
              <label>Number of Chicken Houses :</label>
              <input type='number'
                name='houseno'
                className={`form-control ${formik.touched.houseno && formik.errors.houseno ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.houseno}
              />
              {formik.touched.houseno && formik.errors.houseno && (
                <div className="invalid-feedback">{formik.errors.houseno}</div>
              )}

            </div>
            <div class="col">
              <label>Capacity of Each House :</label>
              <input
                type='number'
                name='capacity'
                className={`form-control ${formik.touched.capacity && formik.errors.capacity ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.capacity}
              />
              {formik.touched.capacity && formik.errors.capacity && (
                <div className="invalid-feedback">{formik.errors.capacity}</div>
              )}

            </div>
          </div><br />

          <label>Type of Chicken:</label>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="isBroiler"
              className="form-check-input"
              checked={formik.values.isBroiler}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="isBroiler">
              Broiler
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="isLayer"
              className="form-check-input"
              checked={formik.values.isLayer}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="isLayer">
              Layer
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              name="isBreeder"
              className="form-check-input"
              checked={formik.values.isBreeder}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="isBreeder">
              Breeder
            </label>
          </div>
          <br /><br />
          <i><legend>Stock Information :</legend> </i> <br /><br />

          <div class="row">
            <div class="col">
              <label>Total Number Of Birds :</label>
              <input
                type='number'
                placeholder="Number of Birds"
                name='birdno'
                className={`form-control ${formik.touched.birdno && formik.errors.birdno ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birdno}
              />
              {formik.touched.birdno && formik.errors.birdno && (
                <div className="invalid-feedback">{formik.errors.birdno}</div>
              )}
            </div>

            <div class="col">
              <label>Broilers :</label>
              <input
                type='number'
                name='broilerno'
                className={`form-control ${formik.touched.broilerno && formik.errors.broilerno ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.broilerno}
              />
              {formik.touched.broilerno && formik.errors.broilerno&& (
                <div className="invalid-feedback">{formik.errors.broilerno}</div>
              )}

            </div>
          </div><br />

          <div class="row">
            <div class="col">
              <label>Layers :</label>
              <input
                type='number'
                name='layerno'
                className={`form-control ${formik.touched.layerno && formik.errors.layerno ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.layerno}
              />
              {formik.touched.layerno && formik.errors.layerno && (
                <div className="invalid-feedback">{formik.errors.layerno}</div>
              )}

            </div>

            <div class="col">
              <label>Breeders :</label>
              <input
                type='number'
                name='breederno'
                className={`form-control ${formik.touched.breederno && formik.errors.breederno ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breederno}
              />
              {formik.touched.breederno && formik.errors.breederno && (
                <div className="invalid-feedback">{formik.errors.breederno}</div>
              )}

            </div>
          </div><br /><br />
          <button type="submit" className='sedit'>Submit</button>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Editprofile;
