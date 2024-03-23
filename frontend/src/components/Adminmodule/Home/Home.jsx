import React, { useEffect } from 'react';
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../../Features/setAdmin';
import { userHeader } from '../../../Services/UserApi';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userHeader()
    .then((res) => {
      dispatch(setAdminDetails(res.data))
    })
    .catch((error) =>{
      console.error('eror fetching admin data :', error);
    })
  }, [dispatch])
  const handleLogout = () =>{
    dispatch(setAdminDetails(""));
    navigate('/admin/login')
  }

  return (
    <div>
      <div className="admin-nav">
        <ul>
          {/* <li>
          <Link to="/admin/dashboard" >Home</Link>
          </li> */}
          <li>
          <Link to="/admin/" >Users</Link>
          </li>
          <li>
          <Link to="/admin/adduser" >Register</Link>
          </li>
          <li>
          <Link to="/admin/notification" >Notification</Link>
          </li>
          <li>
            <button  className="logout-company" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
