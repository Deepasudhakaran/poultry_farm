
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminProfile } from '../../../Services/AdminApi';

const Viewprofile = () => {

  const [profileData, setProfileData] = useState([]);

  const fetchProfileData = async () => {
    try {
      const response = await getAdminProfile();
      if (response && response.profiles) {
        const profiles = response.profiles || [];
        setProfileData(profiles);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>

      <div className='pf-card'>
        {profileData.map((user) => (
          <div key={user._id}>
            <div className="row about-list">
              <h2>FARM DETAILS</h2>
              <div className="col-md-6">
                {/* General Information */}
                <h4> General Information</h4><br />
                <div className="media">
                  <label>Farm Name</label>
                  <p>{user.farmname}</p>
                </div>
                <div className="media">
                  <label>Owner Name</label>
                  <p>{user.ownername}</p>
                </div>
                <div className="media">
                  <label>Email id</label>
                  <p>{user.email}</p>
                </div>
                <div className="media">
                  <label>Farm id</label>
                  <p>{user.farmid}</p>
                </div>
                <div className="media">
                  <label>Phone</label>
                  <p>{user.phoneno}</p>
                </div>
                <div className="media">
                  <label>Address</label>
                  <p>{user.address}</p>
                </div><br />
                {/* Farm Infrastructure */}
                <h4>Farm Infrastructure</h4><br />
                <div className="media">
                  <label>Number of Chicken Houses</label>
                  <p>{user.houseno}</p>
                </div>
                <div className="media">
                  <label>Capacity of Each House</label>
                  <p>{user.capacity}</p>
                </div>
                <div className="media">
                  <label>Type of Chicken</label>
                  <p>
                    {[
                      user.isBroiler && 'Broiler',
                      user.isLayer && 'Layer',
                      user.isBreeder && 'Breeder',
                    ]
                      .filter(Boolean) // Filter out falsy values (undefined, null, false)
                      .join(', ')}
                  </p>
                </div><br />
                {/* Stock Information */}
                <h4>Stock Information</h4><br />
                <div className="media">
                  <label>Total Number of Birds</label>
                  <p>{user.birdno}</p>
                </div>
                <div className="media">
                  <label>Broiler</label>
                  <p>{user.broilerno}</p>
                </div>
                <div className="media">
                  <label>Layer</label>
                  <p>{user.layerno}</p>
                </div>
                <div className="media">
                  <label>Breeder</label>
                  <p>{user.breederno}</p>
                </div>
              </div><br /><br />
            </div>
          </div>
        ))}
        <Link to={'/editprofile'} className='ebut'> Edit profile </Link><br /><br />
      </div>
    </div>
  );
}

export default Viewprofile;
