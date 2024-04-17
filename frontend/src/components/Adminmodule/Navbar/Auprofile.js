import React from 'react';
import './Auprofile.css'


import { Link, useParams } from 'react-router-dom';
const Auprofile = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="report-nav">
        <ul>
        <li>
        <Link to="/admin/" >home</Link>
         </li>
        <li>
        <Link to={`/admin/viewprofile/${id}`} >Profile</Link>
         </li>
          <li>
          <Link to={`/admin/medicine/${id}`} >Medicine</Link>
          </li>
          <li>
          <Link to= {`/admin/mortality/${id}`} >Mortality </Link>
          </li>
          <li>
          <Link to={`/admin/feed/${id}`} >Feed</Link>
          </li>
          <li>
          <Link to={`/admin/egg/${id}`} >Egg </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Auprofile;
