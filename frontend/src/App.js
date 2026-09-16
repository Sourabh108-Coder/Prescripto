import './App.css';
import{Route, Routes} from "react-router-dom";
import Home from './Pages/Home';
import Doctors from './Pages/Doctors';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Login from './Pages/Login';
import Myprofile from './Pages/Myprofile';
import Myappointments from './Pages/Myappointments';
import Appointments from './Pages/Appointments';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PredictPage from './Pages/PredictPage';
import FloatingPredictButton from './components/FloatingPredictButton ';

function App() {
  return (
    <div className="app">

      <ToastContainer/>

      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctor' element={<Doctors/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/my-profile' element={<Myprofile/>}/>
        <Route path='/doctor/:speciality' element={<Doctors/>}/>
        <Route path='/my-appointments' element={<Myappointments/>}/>
        <Route path='/appointments/:docId' element={<Appointments/>}/>
        <Route path='/predict' element={<PredictPage/>}/>
      </Routes>

      <FloatingPredictButton/>

      <Footer/>

      <div className='last-des'>
        <div className='hr'></div>
        <p className='foot-last-para'><b>Copyright 2024@ Prescripto - All Right Reserved.</b></p>
      </div>
      
    </div>
  );
}

export default App;
