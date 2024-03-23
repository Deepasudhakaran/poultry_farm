import React, { useEffect, useState } from 'react';
import './Atable.css';
import { deleteAdminEgg, getAdminEggReport } from '../../../Services/AdminApi';


const Egg = () => {
  
  const [eusers, setEusers] = useState([]);

  const fetchEggData = async () => {
    try {
      const response = await getAdminEggReport();
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
  }, []);

  
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if(isConfirmed) {
      try{
        await deleteAdminEgg(id);
        fetchEggData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      
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
                  <td>{user.edate}</td>
                  <td>{user.selectedName}</td>
                  <td>{user.enumber}</td>
                  <td>{user.broken}</td>
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

export default Egg;
