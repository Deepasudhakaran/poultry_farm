
import React, { useEffect, useState } from 'react';
import { deleteAdminMortality, getAdminMortalityReport } from '../../../Services/AdminApi';


const Amortality = () => {

  
  const [musers, setMusers] = useState([]);


  const fetchMortalityData = async () => {
    try {
      const response = await getAdminMortalityReport();
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

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if (isConfirmed) {
      try {
        await deleteAdminMortality(id);
        fetchMortalityData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      
      <div className='container'>
        <h3>Mortality Report</h3><br />
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
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
  

  );
}

export default Amortality;
