import React from 'react';
import './Auprofile.css'


import { Link } from 'react-router-dom';
const Auprofile = () => {
  return (
    <div>
      <div className="report-nav">
        <ul>
        <li>
        <Link to="/admin/" >home</Link>
         </li>
        <li>
        <Link to="/admin/viewprofile" >Profile</Link>
         </li>
          <li>
          <Link to="/admin/medicine" >Medicine</Link>
          </li>
          <li>
          <Link to="/admin/mortality" >Mortality </Link>
          </li>
          <li>
          <Link to="/admin/feed" >Feed</Link>
          </li>
          <li>
          <Link to="/admin/egg" >Egg </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Auprofile;
