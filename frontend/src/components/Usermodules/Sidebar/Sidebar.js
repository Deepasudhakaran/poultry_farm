import React from 'react';
import './Sidebar.css'
import { Link, useParams } from 'react-router-dom';

const Sidebar = (userid) => {

 
  return (
    <div>
      <input type='checkbox' id='check' />
      <label for="check">
        <i class="fa-solid fa-user" id='btn'></i>
        <i class="fa-solid fa-xmark" id='cancel'></i>
      </label>
      <div className='sidebar'>
        <header>
          <img src='https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png' alt='' />
          <h5 style={{ fontSize: "30px", position: "relative", top: "-50px", letterSpacing: "3px" }}>MY PROFILE</h5>
        </header>
        <ul>
          <li><Link to='/profile' ><i class="fa-solid fa-house-crack"></i>Farm Details</Link></li>
          <li><Link to={`/feed/${userid}`}  ><i class="fa-solid fa-wheat-awn" ></i>Feed Management</Link></li>
          <li><Link to='/medicine' ><i class="fa-solid fa-tablets" ></i>Medicine Management</Link></li>
          <li><Link to='/egg' ><i class="fa-solid fa-egg" ></i>Egg Management</Link></li>
          <li><Link to='/mortality' ><i class="fa-solid fa-skull-crossbones"></i>Mortality Tracking</Link></li>
          <li><Link to='/contact'><i class="fa-solid fa-handshake-angle" ></i>Help and Support</Link></li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
