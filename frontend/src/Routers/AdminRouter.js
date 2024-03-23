import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminMedicine from '../Pages/Admin/AdminMedicine';
import AdminEgg from '../Pages/Admin/AdminEgg';
import AdminUserlist from '../Pages/Admin/AdminUserlist';
import AdminMortality from '../Pages/Admin/AdminMortality';
// import AdminHome from '../Pages/Admin/AdminHome';
import AdminFeed from '../Pages/Admin/AdminFeed';
import AdminLogin from '../Pages/Admin/AdminLogin';
import UserProfiles from '../Pages/Admin/UserProfiles';
import AddUser from '../Pages/Admin/AddUser';
import AdminNotification from '../Pages/Admin/AdminNotification';

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<AdminHome />} /> */}
        <Route path='/medicine' element={<AdminMedicine />} />
        <Route path='/egg' element={<AdminEgg />} />
        <Route path='/' element={<AdminUserlist />} />
        <Route path='/mortality' element={<AdminMortality />} />
        <Route path='/viewprofile' element={<UserProfiles />} />
        <Route path='/feed' element={<AdminFeed />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/notification' element={<AdminNotification/>}/>
      </Routes >
    </div>
  );
}

export default AdminRouter;
