import React, { useEffect } from 'react';
import './Navbar.css'
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserDetails } from '../../../Features/setUser';
import { userHeader } from '../../../Services/UserApi';






const Navbar = () => {
// const navigate = useNavigate();

const user = useSelector(selectUser);
const dispatch = useDispatch();

useEffect(() => {
  userHeader()
  .then((res) => {
    dispatch(setUserDetails(res.data))
  })
  .catch((error) =>{
    console.error('error fetching admin data :', error);
  });
}, [dispatch]);

  const handleLogout = ()=>{
   dispatch(setUserDetails(""));
  };
  // state = { clicked :false};
  // handleClick = () =>{
  //   this.setstate({ clicked : !this.state.clicked})
  // }
  return (
    <div>
      <div className='topnav1'>
        <div className='logo'>
        <h2 > <img  style={{height:"60px" }} src="https://tse3.mm.bing.net/th?id=OIP.YNyakKBi_TJBM7awYhET_AHaHh&pid=Api&P=0&h=180" alt='' />Poultry Care </h2>
         
        </div>

{/* 
        <div className='menu-icons' onClick={this.handleClick}>
        <i className={this.state.clicked ? "fa-solid fa-bars" : "fa-solid fa-xmark" }></i>
        
          </div> */}


      <div className='cd'>
        <ul className='nav-menu'>
          <li> <Link className="nav-link" to='/ '> HOME</Link></li>
          <li><Link className="nav-link" to='/About'> ABOUT</Link></li>
          <li> <Link className="nav-link" to='/contact'> CONTACT</Link></li>
          <li>{user.value ? (
              <div>
                <button onClick={handleLogout} className="nav-link">Logout</button>
              </div>
            ) : (
              <Link to="/login"  className="nav-link">LOGIN</Link>
            )}</li>
            </ul>
            </div>
            <Sidebar/>
      </div>
    </div>
  );
}

export default Navbar;
