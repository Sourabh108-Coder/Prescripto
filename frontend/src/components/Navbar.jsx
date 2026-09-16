import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoPersonAdd } from "react-icons/io5";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate=useNavigate();

    const[showmenu,setshowmenu]=useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const{token,settoken}=useContext(AppContext);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

    const logout=()=>
    {
      settoken(false);
      localStorage.removeItem('token');
      toast.success("Log-Out Successfully");
    }

  return (
    <div className='Nav-bar'>

        <div className='head' onClick={()=>navigate("/")}>
          <img src='https://ph-test-11.slatic.net/shop/587a074da59362d0c6e821cf20fa16c2.jpeg' className='logo'/>
          <h1 className='head-heading1'>Prescripto</h1>
        </div>

      <ul className='head-options'>
        <NavLink to="/" className="no-underline">
            <li><b>Home</b></li>
            <hr/>
        </NavLink>

        <NavLink to="/doctor" className="no-underline">
            <li><b>All-Doctors</b></li>
            <hr/>
        </NavLink>

        <NavLink  to="/about" className="no-underline">
            <li><b>About</b></li>
            <hr/>
        </NavLink>

        <NavLink to="/contact" className="no-underline">
            <li><b>Contact</b></li>
            <hr/>
        </NavLink>

      </ul>

      <div>
        {
            token ?
            (<div className='react-icons-img'>
               <div> <IoPersonAdd  className='pro-img'/></div>
                <div><FaArrowAltCircleDown className='arr-img' onClick={toggleDropdown}/></div>

                <ul className={`profile-dropdown ${isOpen ? 'show' : ''}`}>
                    <li onClick={()=>navigate("/my-profile")}>My-Profile</li>
                    <li onClick={()=>navigate("/my-appointments")}>My-Appointments</li>
                    <li onClick={logout}>Logout</li>
                </ul>
                
             </div>):
             
            (<button className='nav-but' onClick={()=>{navigate("/login")}}><b>Create Account</b></button>)    
        }
      </div>

    </div>

    
  )
}

export default Navbar
