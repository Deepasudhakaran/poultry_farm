import React from 'react';
import About from '../../components/Usermodules/About/About';
import Navbar from '../../components/Usermodules/UserNavbar/Navbar';
import Footer from '../../components/Usermodules/Footer/Footer';

const UserAbout = () => {
  return (
    <div>
      <Navbar/>
      <About/>
      <Footer/>
    </div>
  );
}

export default UserAbout;
