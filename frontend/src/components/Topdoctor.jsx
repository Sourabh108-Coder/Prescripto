import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Topdoctor = () => {

    const navigate=useNavigate();
    const{doctors}=useContext(AppContext);

  return (
    <div className='top-doc'>
      <h1 className='top_name'>Top Doctors To Book</h1>
      {/* <p className='top_para'>Simply Browse through our extensive list of trusted Doctors.</p> */}

      <div className='map-doc'>
        {
            doctors.slice(0,12).map((item,index)=>(
                <div className='disp-doc' onClick={()=>navigate(`/appointments/${item._id}`)}>
                    <img src={item.image} className='top-doc-img'/>

                    <div className='top-doc-desp'>
                        <p className={item.available?'dot':'dotu'}></p><p className={item.available?'tetu':'tetu2'}>  {item.available?'Available':'Not Available'}</p>
                    </div>

                    <p className='para para1'><b>{item.name}</b></p>
                    <p className='para'><b>{item.speciality}</b></p>
                </div>
            ))
        }
      </div>
      <button  className="more-btn" onClick={()=>{navigate("/doctor")}}>More</button>
    </div>
  )
}

export default Topdoctor
