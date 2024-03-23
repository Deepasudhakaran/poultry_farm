import React, { useEffect, useState } from 'react';
import './Medicine.css'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { deleteMedicine, getMedicineReport, medicineReport, updateMedicine } from '../../../Services/UserApi';


const validationSchema = Yup.object().shape({
  date: Yup.date().required('date is required'),
  selectedmedicine: Yup.string().required('selected value is required'),
});

const Medicinereport = () => {

  const [mdusers, setMdusers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMedicineData = async () => {
    try {
      const response = await getMedicineReport();
      if (response && response.medicines) {
        const medicines = response.medicines || [];
        setMdusers(medicines);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };



  useEffect(() => {
    fetchMedicineData();
  }, []);

  const formik = useFormik({
    initialValues: {
      date: '',
      selectedmedicine: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (editingId) {
          await updateMedicine(editingId, values);
          setEditingId(null); 
          toast.success('Medicine report updated successfully');
        } else {
          await medicineReport(values);
          toast.success('Medicine report created successful');
        }
        fetchMedicineData(); 
      } catch (error) {
        console.error('Error creating/updating report:', error.message);
        toast.error('Error creating/updating report');
      }
    },
  });

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if (isConfirmed) {
      try {
        await deleteMedicine(id);
        fetchMedicineData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => {
    const selectedMedicine = mdusers.find(user => user._id === id);
    if (selectedMedicine) {
      formik.setValues({
        date: selectedMedicine.date,
        selectedmedicine: selectedMedicine.selectedmedicine,
      });
      setEditingId(id);
    }
  };
  return (
    <div>
      <div className='container'>
        <div className='farm'>
          <h2>Medicine Report</h2>
          <form onSubmit={formik.handleSubmit}>

            <label>Date</label>
            <input type='date'
              name='date'
              style={{ width: "20%" }}
              className={` ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date && (
              <div className="invalid-feedback">{formik.errors.date}</div>
            )}
            <br />

            <label>Medicine Name :</label>
            <select
              name='selectedmedicine'
              value={formik.values.selectedmedicine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value=''>Select medicine</option>
              <option value="Antibiotic A">Antibiotic A</option>
              <option value="Wormer B">Wormer B</option>
              <option value="Coccidiostat C">Coccidiostat C</option>
              <option value="Growth Promoter D">Growth Promoter D</option>
              <option value="Iodine Solution">Iodine Solution</option>
            </select>
            {formik.touched.selectedmedicine && formik.errors.selectedmedicine && (
              <div className='error'>{formik.errors.selectedmedicine}</div>
            )}<br /><br />

            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>


      <div className='container'>
        <h3>Medicine Report</h3><br />
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Medicine Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mdusers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.date}</td>
                <td>{user.selectedmedicine}</td>
                <td><Link className='btn btn-sm btn-primary' onClick={() => handleEdit(user._id)}>Edit</Link>
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Medicinereport;
