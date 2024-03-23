import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import UserRegisterPage from '../Pages/User/UserRegisterPage';
import UserLogin from '../Pages/User/UserLogin';
import UserHomePage from '../Pages/User/UserHomePage';
import UserAbout from '../Pages/User/UserAbout';
import UserContact from '../Pages/User/UserContact';
import UserMedicine from '../Pages/User/UserMedicine';
import UserEggReport from '../Pages/User/UserEggReport';
import UserFeedReport from '../Pages/User/UserFeedReport';
import UserProfile from '../Pages/User/UserProfile';
import UserMortalityReport from '../Pages/User/UserMortalityReport';
import UserEditProfile from '../Pages/User/UserEditProfile';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/setUser';

const UserRouter = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <Routes>
        <Route path='/register' element={<UserRegisterPage />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/' element={<UserHomePage />} />
        <Route path='/about' element={<UserAbout />} />
        <Route path='/contact' element={<UserContact />} />
        <Route path='/medicine' element={ user.value ?<UserMedicine /> : <Navigate to={'/login'}/>} />
        <Route path='/egg' element={ user.value ?<UserEggReport /> : <Navigate to={'/login'}/>} />
        <Route path='/feed/:userid' element={ user.value ? <UserFeedReport /> : <Navigate to={'/login'}/>} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/mortality' element={ user.value ? <UserMortalityReport /> : <Navigate to={'/login'}/>} />
        <Route path='/editprofile' element={<UserEditProfile />} />

      </Routes>
    </div>
  );
}

export default UserRouter;
