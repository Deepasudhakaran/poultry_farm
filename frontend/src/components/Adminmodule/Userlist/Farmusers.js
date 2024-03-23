
import React, { useEffect, useState } from 'react';
import './Farmusers.css'
import { Link } from 'react-router-dom';
import { getUserList } from '../../../Services/AdminApi';



const Farmusers = () => {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchItems();


  }, []);

  const fetchItems = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const response = await getUserList(userToken);
        if (response && response.users) {
          const users = response.users || [];
          setUserList(users)
        } else {
          console.error('user list not available: ', response);
        }
      } else {
        console.error('admin Token not found in local storage');
      }
    } catch (error) {
      console.error('Error fetching user list :', error.message);
    }
  };

  return (
    <div style={{ marginTop: '170px' }}>
      <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-90'>
        <h3>users Report</h3><br />
        <div className='w-100 rounded bg-white border shadow p-4'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Number</th>
                <th>User Name</th>
                <th>Email Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user._id} >
                  <td>{index + 1}</td>
                  <td>{user.username}{' '}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={'/admin/viewprofile'} className='btn btn-sm btn-primary' >
                      View
                    </Link>
                    <button className='btn btn-sm btn-danger ms-2' >
                      pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Farmusers;
