import React from 'react'
import Homepage from '../../components/Usermodules/Userhome/Homepage'
import Navbar from '../../components/Usermodules/UserNavbar/Navbar'
import Footer from '../../components/Usermodules/Footer/Footer'

const UserHomePage = () => {
    return (
        <div>
            <Navbar/>
            <Homepage/>
            <Footer/>
        </div>
    )
}

export default UserHomePage
