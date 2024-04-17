
import React, { useEffect, useState } from 'react';
import './Farmusers.css'
import { Link } from 'react-router-dom';
import { blockUser, deleteuser, getUserList, unblockUser } from '../../../Services/AdminApi';



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





  
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if (isConfirmed) {
      try {
        await deleteuser(id);
        fetchItems();
      } catch (error) {
        console.error(error);
      }
    }
  };



  const handleBlockUser = async (userId) => {
    try {
      await blockUser(userId);

      fetchItems();
    } catch (error) {
      console.error('Error blocking user:', error.message);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await unblockUser(userId);

      fetchItems();
    } catch (error) {
      console.error('Error unblocking user:', error.message);
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
                    <Link to={`/admin/feed/${user._id}`} className='btn btn-sm btn-primary' >
                      View
                    </Link>
                    <button className='btn btn-sm btn-danger ms-2'  onClick={() => handleDelete(user._id)} >
                      Delete
                    </button>

                    <button onClick={() => handleBlockUser(user._id)} disabled={user.isBlocked} className='btn btn-sm btn-danger ms-2'>
                      Block
                    </button>
                    <button onClick={() => handleUnblockUser(user._id)} disabled={!user.isBlocked} className='btn btn-sm btn-primary ms-2'>
                      Unblock
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
