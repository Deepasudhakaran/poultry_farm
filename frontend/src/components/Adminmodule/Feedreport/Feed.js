
import React, { useEffect, useState } from 'react';
import { deleteAdminFeed, getAdminFeedReport } from '../../../Services/AdminApi';
import { useParams } from 'react-router-dom';



const Feed = () => {

  const [fusers, setFusers] = useState([]);

  const { id } = useParams();
 
  const fetchFeedData = async (id) => {
    try {
      const response = await getAdminFeedReport(id);
      if (response && response.feeds) {
        const feeds = response.feeds || [];
        setFusers(feeds);
      } else {
        console.error('feed list not available', response);
      }
    } catch (error) {
      console.error('Error fetching feed reports:', error.message);
    }
  };
  
  useEffect(() => {
    fetchFeedData(id);
  }, [id]);
  
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item? ');
    if(isConfirmed) {
      try{
        await deleteAdminFeed(id);
        fetchFeedData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className='container'>
        <h3> Feed Report</h3><br />
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>No</th>
              <th>Feed Name</th>
              <th>Consume</th>
              <th>Receive</th>
              <th>Posting date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {fusers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.selectedvalue}</td>
                <td>{user.consume}</td>
                <td>{user.receive}</td>
                <td>{user.fdate}</td>
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

export default Feed;




