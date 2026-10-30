
import './App.css';
import Login from './Pages/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';

import { Admincontext } from './Context/Admincontext';
import { Doctorcontext } from './Context/Doctorcontext';

import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

import { Routes, Route, Navigate } from 'react-router-dom';

// Admin Pages
import Dashboard from './Pages/Admin/Dashboard';
import Allappointments from './Pages/Admin/Allappointments';
import Adddoctor from './Pages/Admin/Adddoctor';
import Doctorlist from './Pages/Admin/Doctorlist';

// Doctor Pages
import Doctordashboard from './Pages/Doctor/Doctordashboard';
import Doctorappointment from './Pages/Doctor/Doctorappointment';
import Doctorprofile from './Pages/Doctor/Doctorprofile';

function App() {

  const { adtoken } = useContext(Admincontext);
  const { doctoken } = useContext(Doctorcontext);

  // Check login status
  const isAdmin = Boolean(adtoken);
  const isDoctor = Boolean(doctoken);

  // Decide default dashboard
  const defaultDashboard = isAdmin
    ? "/admin-dashboard"
    : "/doctor-dashboard";

  return isAdmin || isDoctor ? (

    <div className="App">

      <ToastContainer />

      <Navbar />

      <div className='sidu'>

        <Sidebar />

        <Routes>

          {/* Default Route - Redirect according to login role */}
          <Route
            path="/"
            element={
              <Navigate to={defaultDashboard} replace />
            }
          />

          {/* ADMIN ROUTES */}
          {isAdmin && (
            <>
              <Route
                path="/admin-dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/all-appointments"
                element={<Allappointments />}
              />

              <Route
                path="/add-doctor"
                element={<Adddoctor />}
              />

              <Route
                path="/doctor-list"
                element={<Doctorlist />}
              />
            </>
          )}

          {/* DOCTOR ROUTES */}
          {isDoctor && (
            <>
              <Route
                path="/doctor-dashboard"
                element={<Doctordashboard />}
              />

              <Route
                path="/doctor-profile"
                element={<Doctorprofile />}
              />

              <Route
                path="/doctor-appointments"
                element={<Doctorappointment />}
              />
            </>
          )}

          {/* Invalid or unauthorized routes */}
          <Route
            path="*"
            element={
              <Navigate to={defaultDashboard} replace />
            }
          />

        </Routes>

      </div>

    </div>

  ) : (

    <div className="App">

      <Login />

      <ToastContainer />

    </div>

  );

}

export default App;
