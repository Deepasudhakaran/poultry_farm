import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Feed.css';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { deleteFeed, feedReport, getFeedReport, updateFeed,  } from '../../../Services/UserApi';
import { ToastContainer, toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  consume: Yup.number().required('consume is required'),
  receive: Yup.number().required('receive is required'),
  date: Yup.date().required('date is required'),
  selectedvalue: Yup.string().required('selected value is required'),
});

const Feedmanage = () => {
  
  const [fusers, setFusers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const userId = useParams().userid;

  const fetchFeedData = async (userId) => {
    try {
      const response = await getFeedReport(userId);
      if (response && response.post) {
        const feeds = response.post || [];
        setFusers(feeds);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };

  useEffect(() => {

    fetchFeedData(userId);

  }, [userId]);
  const formik = useFormik({
    initialValues: {
      consume: 0,
      receive: 0,
      date: '',
      selectedvalue: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if(editingId){
          await updateFeed(editingId, values);
          setEditingId(null);
          toast.success('feed report created successful');
        }else {
          await feedReport(userId, values);
          console.log('feed report created successfully');
          toast.success('feed report created successful');
        }
       fetchFeedData(userId);
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
        await deleteFeed(id);
        fetchFeedData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => {
    const selectedFeed = fusers.find(user => user._id === id);
    if (selectedFeed) {
      formik.setValues({
        date: selectedFeed.date,
        consume: selectedFeed.consume,
        receive: selectedFeed.receive,
        selectedvalue: selectedFeed.selectedvalue,
      });
      setEditingId(id);
    }

  }
  return (
    <div>
       <div className='container'>
                <div className='farm'>
                    <h2>Feed Report</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <label>Feed Name :</label>
                        <select
                            name='selectedvalue'
                            value={formik.values.selectedvalue}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value=''>Select Feed</option>
                            <option value='wheat'>Wheat</option>
                            <option value='Soybean meal'>Soybean meal</option>
                            <option value='Sorghum'>Sorghum</option>
                            <option value='Fish meal'>Fish meal</option>
                        </select>
                        {formik.touched.selectedvalue && formik.errors.selectedvalue && (
                            <div className='error'>{formik.errors.selectedvalue}</div>
                        )}<br />

                        <label>consume :</label>
                        <input type='number'
                            name='consume'
                            className={` ${formik.touched.consume && formik.errors.consume ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.consume}
                        />
                        {formik.touched.consume && formik.errors.consume && (
                            <div className="invalid-feedback">{formik.errors.consume}</div>
                        )}

                        <label>received :</label>
                        <input type='number'
                            name='receive'
                            className={` ${formik.touched.receive && formik.errors.receive ? 'is-invalid' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.receive}
                        />
                        {formik.touched.receive && formik.errors.receive && (
                            <div className="invalid-feedback">{formik.errors.receive}</div>
                        )}<br />

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

                        <button type='submit'>submit</button>
                    </form>
                </div>
                
            </div>
      <div className='container'>
      
        <h3> Feed Report</h3><br />
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Feed Name</th>
              <th>Consume</th>
              <th>Receive</th>
              <th>Posting date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {fusers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.selectedvalue}</td>
                <td>{user.consume}</td>
                <td>{user.receive}</td>
                <td>{user.fdate}</td>
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

export default Feedmanage;






