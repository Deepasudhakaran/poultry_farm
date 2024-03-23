import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Mortality.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { deleteMortality, getMortalityReport, mortalityReport, updateMortality } from '../../../Services/UserApi';


const validationSchema = Yup.object().shape({
  date: Yup.date().required('date is required'),
  selectedvalue: Yup.string().required('selected value is required'),
  mortality: Yup.number().required('total is required').min(0, 'start 0'),

});

const Mortality = () => {

  const [musers, setMusers] = useState([]);
  const [editingId, setEditingId] = useState(null);


  const fetchMortalityData = async () => {
    try {
      const response = await getMortalityReport();
      if (response && response.mortalities) {
        const mortalities = response.mortalities || [];
        setMusers(mortalities);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };



  useEffect(() => {
    fetchMortalityData();
  }, []);



  const formik = useFormik({
    initialValues: {
      date: '',
      selectedvalue: '',
      mortality: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (editingId) {
          await updateMortality(editingId, values);
          setEditingId(null);
          toast.success('mortality report updated successfully');
        } else {
          await mortalityReport(values);
          console.log('mortality report created successfully');
          toast.success('mortality report created successful');
        }
        fetchMortalityData();
      } catch (error) {
        console.error('Error craeting report:', error.message);
        toast.error('Error creating report');
      }
    },
  });


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if (isConfirmed) {
      try {
        await deleteMortality(id);
        fetchMortalityData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => {
    const selectedMortality = musers.find(user => user._id === id);
    if (selectedMortality) {
      formik.setValues({
        date: selectedMortality.date,
        selectedvalue: selectedMortality.selectedvalue,
        mortality: selectedMortality.mortality,
      });
      setEditingId(id);
    }
  }
  return (
    <div>
      <div className='container'>
        <div className='farm'>
          <h2>Mortality Report</h2>
          <form onSubmit={formik.handleSubmit}>
            <label>Date</label>
            <input type='date'
              name='date'
              className={` ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="invalid-feedback">{formik.errors.date}</div>
            )}
            <br />

            <label>Flock Name :</label>
            <select
              name='selectedvalue'
              value={formik.values.selectedvalue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=''>Select Flock Name</option>
              <option value=" Broiler">Broiler</option>
              <option value=" Layer"> Layer</option>
              <option value="Breeder">Breeder</option>
            </select>
            {formik.touched.selectedvalue && formik.errors.selectedvalue && (
              <div className='error'>{formik.errors.selectedvalue}</div>
            )}<br />

            <label>Total Mortality :</label>
            <input type='number'
              name='mortality'
              className={` ${formik.touched.mortality && formik.errors.mortality ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mortality} />
            {formik.touched.mortality && formik.errors.mortality && (
              <div className="invalid-feedback">{formik.errors.mortality}</div>
            )}
            <br /><br />

            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>

      <div className='container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Flock Name</th>
              <th>Total Mortality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {musers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.date}</td>
                <td>{user.selectedvalue}</td>
                <td>{user.mortality}</td>
                <td>
                  <Link className='btn btn-sm btn-primary' onClick={() => handleEdit(user._id)}>
                    Edit
                  </Link>
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Mortality;
