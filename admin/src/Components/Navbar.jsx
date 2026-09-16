import React, { useContext } from 'react'
import { Admincontext } from '../Context/Admincontext'
import {useNavigate} from 'react-router-dom'
import { Doctorcontext } from '../Context/Doctorcontext';

const Navbar = () => {

    const{adtoken,setadtoken}=useContext(Admincontext);

    const{doctoken,setdoctoken}=useContext(Doctorcontext);

    const navigate=useNavigate();

    const logout=()=>
    {
        navigate("/");
        
        adtoken && setadtoken("");

        adtoken && localStorage.removeItem("adtoken");

        doctoken && setdoctoken("");

        doctoken && localStorage.removeItem("doctoken");
    }

  return (
    <div className='Nav-bar'>

       <div className='head' >
          <img src='https://ph-test-11.slatic.net/shop/587a074da59362d0c6e821cf20fa16c2.jpeg' className='logo'/>
          <h1 className='head-heading1'>Prescripto</h1>
          <h4 className='ad-doce'>{adtoken?'Admin':'Doctor'}</h4>
        </div>

      <button onClick={logout} className='nav-but'>Log Out</button>
    </div>
  )
}

export default Navbar
