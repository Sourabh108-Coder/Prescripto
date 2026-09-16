import React, { useContext } from 'react'
import { Admincontext } from '../Context/Admincontext'
import { NavLink } from 'react-router-dom';
import { MdLeaderboard } from "react-icons/md";
import { MdPointOfSale } from "react-icons/md";
import { MdAddModerator } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { Doctorcontext } from '../Context/Doctorcontext';
import { FaPeriscope } from "react-icons/fa";

const Sidebar = () => {

    const{adtoken}=useContext(Admincontext);

    const{doctoken}=useContext(Doctorcontext);

  return (
    <div className='side-bar'>
      {
        adtoken && 
        <ul className="sidebar-list">
            <NavLink to={"/admin-dashboard"} className="sidebar-item">
                <div className="sidebar-icon">{<MdLeaderboard />}</div>
                <p>Dashboard</p>
            </NavLink>

            <NavLink to={"/all-appointments"} className="sidebar-item">
                <div className="sidebar-icon">{<MdPointOfSale />}</div>
                <p>Appointments</p>
            </NavLink>

            <NavLink to={"/add-doctor"} className="sidebar-item">
                <div className="sidebar-icon">{<MdAddModerator/>}</div>
                <p>Add-Doctor</p>
            </NavLink>

            <NavLink to={"/doctor-list"} className="sidebar-item">
                <div className="sidebar-icon">{<FaListCheck/>}</div>
                <p>Doctor-List</p>
            </NavLink>
        </ul>
      }

      {/* ************************************************************************** */}

      {
        doctoken && 
        <ul className="sidebar-list">
            <NavLink to={"/doctor-dashboard"} className="sidebar-item">
                <div className="sidebar-icon">{<MdLeaderboard />}</div>
                <p>Dashboard</p>
            </NavLink>

            <NavLink to={"/doctor-appointments"} className="sidebar-item">
                <div className="sidebar-icon">{<MdPointOfSale />}</div>
                <p>Appointments</p>
            </NavLink>

            <NavLink to={"/doctor-profile"} className="sidebar-item">
                <div className="sidebar-icon">{<FaPeriscope/>}</div>
                <p>Doctor-Profile</p>
            </NavLink>
        </ul>
      }

    </div>
  )
}

export default Sidebar
