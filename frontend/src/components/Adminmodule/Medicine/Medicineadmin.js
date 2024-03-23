
import React, { useEffect, useState } from 'react';
import { deleteAdminMedicine, getAdminMedicineReport } from '../../../Services/AdminApi';



const Medicineadmin = () => {


  
  const [mdusers, setMdusers] = useState([]);

  const fetchMedicineData = async () => {
    try {
      const response = await getAdminMedicineReport();
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

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if (isConfirmed) {
      try {
        await deleteAdminMedicine(id);
        fetchMedicineData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  return (
    <div>
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
                <td>
                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDelete(user._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medicineadmin;
