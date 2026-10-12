import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Admincontext } from "../Context/Admincontext";
import { Doctorcontext } from "../Context/Doctorcontext";

import {
  MdLeaderboard,
  MdPointOfSale,
  MdAddModerator,
} from "react-icons/md";

import {
  FaListCheck,
  FaHeartPulse,
} from "react-icons/fa6";

import { FaPeriscope } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";


const Sidebar = () => {
  const { adtoken } = useContext(Admincontext);
  const { doctoken } = useContext(Doctorcontext);

  const adminLinks = [
    { to: "/admin-dashboard", label: "Dashboard", icon: <MdLeaderboard /> },
    { to: "/all-appointments", label: "Appointments", icon: <MdPointOfSale /> },
    { to: "/add-doctor", label: "Add Doctor", icon: <MdAddModerator /> },
    { to: "/doctor-list", label: "Doctor List", icon: <FaListCheck /> },
  ];

  const doctorLinks = [
    { to: "/doctor-dashboard", label: "Dashboard", icon: <MdLeaderboard /> },
    { to: "/doctor-appointments", label: "Appointments", icon: <MdPointOfSale /> },
    { to: "/doctor-profile", label: "My Profile", icon: <FaPeriscope /> },
  ];

  const links = adtoken ? adminLinks : doctoken ? doctorLinks : [];

  if (!links.length) return null;

  return (
    <aside className="side-bar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <FaHeartPulse />
        </div>

        <div className="sidebar-brand-text">
          <h2>{adtoken ? "Admin Panel" : "Doctor Panel"}</h2>
        </div>
      </div>

      <div className="sidebar-section-label">MAIN MENU</div>

      <nav className="sidebar-list" aria-label="Main navigation">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `sidebar-item${isActive ? " active" : ""}`
            }
          >
            <span className="sidebar-icon">{icon}</span>
            <span className="sidebar-item-text">{label}</span>
            <FiChevronRight className="sidebar-arrow" />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-status-dot" />
        <span>{adtoken ? "Administrator" : "Healthcare Professional"}</span>
      </div>
    </aside>
  );
};

export default Sidebar;