import './App.css';
import Login from './Pages/Login';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { Admincontext } from './Context/Admincontext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import Allappointments from './Pages/Admin/Allappointments';
import Adddoctor from './Pages/Admin/Adddoctor';
import Doctorlist from './Pages/Admin/Doctorlist';
import { Doctorcontext } from './Context/Doctorcontext';
import Doctordashboard from './Pages/Doctor/Doctordashboard';
import Doctorappointment from './Pages/Doctor/Doctorappointment';
import Doctorprofile from './Pages/Doctor/Doctorprofile';

function App() {

  const{adtoken,setadtoken}=useContext(Admincontext);

  const{doctoken,setdoctoken}=useContext(Doctorcontext);

  return adtoken || doctoken ?(
    <div className="App">

      <ToastContainer/>
      <Navbar/>
      
      <div className='sidu'>
        <Sidebar/>

      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<Allappointments/>}/>
        <Route path='/add-doctor' element={<Adddoctor/>}/>
        <Route path='/doctor-list' element={<Doctorlist/>}/>

        <Route path="/doctor-dashboard" element={<Doctordashboard/>}/>
        <Route path="/doctor-profile" element={<Doctorprofile/>}/>
        <Route path="/doctor-appointments" element={<Doctorappointment/>}/>
        
      </Routes>
      </div>

    </div>
  ):
  (
    <div className="App">

      <Login/>
      <ToastContainer/>

    </div>
  );
}

export default App;
