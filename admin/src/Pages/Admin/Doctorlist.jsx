import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../Context/Admincontext'

const Doctorlist = () => {

  const{doctors,getalldoctors,adtoken,changeavailability}=useContext(Admincontext);

  useEffect(()=>
  {
    if(adtoken)
    {
      getalldoctors();
    }
  },[adtoken,])


  return (
    <div className='doc-fet'>

      <h1 className='all-doc'>ALL Doctors</h1>

    <div>
      <div className='doc-data'>
        {
          doctors.map((item,index)=>(

            <div key={index}  className="card">
              <img src={item.image} className='doc-img'/>

              <div className="card-content">
                <h3>{item.name}</h3>
                <h4>{item.speciality}</h4>

                <div className='check'>
                  <input type='checkbox' checked={item.available} onChange={()=>changeavailability(item._id)}/>
                  <p><b>Available</b></p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Doctorlist
