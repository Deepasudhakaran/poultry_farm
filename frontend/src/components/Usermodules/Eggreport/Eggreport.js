import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { deleteEgg, eggReport, getEggReport, updateEgg } from '../../../Services/UserApi';


const validationSchema = Yup.object().shape({
  total: Yup.number().required('total is required'),
  broken: Yup.number().required('broken is required'),
  date: Yup.date().required('date is required'),
  selectedName: Yup.string().required('selected value is required'),
});
const Eggreport = ({ userId }) => {
  const [eusers, setEusers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchEggData = async () => {
    try {
      const response = await getEggReport( userId );
      if (response && response.eggs) {
        const eggs = response.eggs || [];
        setEusers(eggs);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };
  
  useEffect(() => {
    fetchEggData();
  }, [userId]);

  const formik = useFormik({
    initialValues: {
      date: '',
      selectedName: '',
      total: '',
      broken: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if(editingId) {
          await updateEgg(editingId, values);
          setEditingId(null);
          toast.success('egg report updated successfully');
        } else {
          await eggReport( userId,values);
        console.log('egg report created successfully');
        toast.success('egg report created successful');
        } 
        fetchEggData();  
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
        await deleteEgg(id);
        fetchEggData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => {
    const selectedEgg = eusers.find(user => user._id === id);
    if (selectedEgg) {
      formik.setValues({
        date: selectedEgg.date,
        selectedName: selectedEgg.selectedName,
        total: selectedEgg.total,
        broken: selectedEgg.broken,
      });
      setEditingId(id);
    }
  };
  return (
    <div>
      <div>
      <div className='container'>
          <div className='farm'>
            <h2>Egg Report</h2>
            <form onSubmit={formik.handleSubmit}>
              <label>Date :</label>
              <input type='date'
                style={{ width: "20%" }}
                name='date'
                className={` ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
              {formik.touched.date && formik.errors.date && (
                <div className="invalid-feedback">{formik.errors.date}</div>
              )}

              <label>Flock Name :</label>
              <select
                name='selectedName'
              value={formik.values.selectedName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              >
                <option value=''>Select Flock Name</option>
                <option value="Chicken">Chicken</option>
                <option value="Goose">Goose</option>
                <option value="Turkey">Turkey</option>
              </select>
              {formik.touched.selectedName && formik.errors.selectedName && (
              <div className='error'>{formik.errors.selectedName}</div>
            )}<br/>

              <label>Total Eggs :</label>
              <input type='number'
                name='total'
                className={` ${formik.touched.total && formik.errors.total ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.total}
              />
              {formik.touched.total && formik.errors.total && (
                <div className="invalid-feedback">{formik.errors.total}</div>
              )}

              <label>Broken :</label>
              <input type='number'
                name='broken'
                className={` ${formik.touched.broken && formik.errors.broken ? 'is-invalid' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.broken}
              />
              {formik.touched.broken && formik.errors.broken && (
                <div className="invalid-feedback">{formik.errors.broken}</div>
              )}


              <button type="submit">submit</button>
            </form>
          </div>

        </div>

        <div className='container'>
          <h3>Egg Report</h3><br />
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Flock Name</th>
                <th>Total Eggs</th>
                <th>Broken</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eusers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.date}</td>
                  <td>{user.selectedName}</td>
                  <td>{user.total}</td>
                  <td>{user.broken}</td>
                  <td>
                    <Link className='btn btn-sm btn-primary' onClick={() => handleEdit(user._id)}>Edit</Link>
                    <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Eggreport



