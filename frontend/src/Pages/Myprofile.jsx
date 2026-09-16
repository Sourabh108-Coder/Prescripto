import React, { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Myprofile = () => {

  /*const[userdata,setuserdata]=useState({
    name:"Edward Vincent",
    image:"https://tse3.mm.bing.net/th?id=OIP.QnKqhd0aH6c7Wz9-4uONrgHaJS&pid=Api&P=0&h=180",
    email:"crazyEdward492@gmail.com",
    phone:"+1 123 456 789",
    address:{
      line1:"57th Cross , Richard",
      line2:"Circle, Church Road, London",
    },
    gender:"Male",
    dob:"2000-01-20",
  })*/ 

  const{userdata,setuserdata,token,backendUrl,getuserprofile}=useContext(AppContext);  

  const[isedit,setisedit]=useState(false);

  const [image,setimage]=useState(false);

  const updateuserprofiledata=async()=>
  {
    try
    {

      const formdata=new FormData();

      formdata.append('name',userdata.name);
      formdata.append('phone',userdata.phone);
      formdata.append('address',JSON.stringify(userdata.address));
      formdata.append('gender',userdata.gender);
      formdata.append('dob',userdata.dob);

      image && formdata.append('image',image);

      console.log(token);

      const res=await axios.post(backendUrl+"/api/v1/prescripto/updateprofile",formdata,{headers:{token}});

      if(res.data.success)
      {
        toast.success("Updated Successfully");
         await getuserprofile();
         setisedit(false);
         setimage(false);
      }

      else
      {
        toast.error(res.data.message);
      }
    }

    catch(error)
    {
      toast.error("Error in Updation");
      console.log("Updating  "+error.message);
    }
  }

  return userdata &&(
   
    <div className="profile-container">
      <div className='col'>

        {
          isedit?
          (
            <label for="image">
              <div>
                <img src={image?(URL.createObjectURL(image)):(userdata.image)} className='profile-img'/>
                {/* <img src={image?(''):('https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg')} className='upload-pic'/> */}
              </div>
              <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' hidden/>
            </label>

          )
          :(<img src={userdata.image} className='profile-img'/>)
        }
      

      {
        isedit?(<input type="text" id="inp1"  value={userdata.name} required placeholder='Enter your Full Name' onChange={e=>setuserdata(prev=>({...prev,name:e.target.value}))} name="name" className='input-field1'/>):(<h1 className='user-name'>{userdata.name}</h1>)
      }

      {isedit?(""):(<div className='hi'></div>)}
      </div>

      <div className='du-ba'>

      <div className='all-info'>
        <h3>CONTACT INFO</h3>
        <div className='gridy'>
          <p><b>Email Id:</b></p>
          <p>{userdata.email}</p>

          <p><b>Phone:</b></p>
          {
             isedit?(<input type="phone" id="inp1"  value={userdata.phone} required placeholder='Enter your Telephone' onChange={e=>setuserdata(prev=>({...prev,phone:e.target.value}))} name="phone" className='input-field3'/>):(<p>{userdata.phone}</p>)
          }

          <p><b>Address:</b></p>
          {
             isedit?(
             <p>
              <input type="text" id="inp1"  value={userdata.address.line1} required placeholder='Enter your address1' onChange={(e)=>setuserdata(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} name="address.line1" className='input-field2'/>
              <br/>
              <input type="text" id="inp1"  value={userdata.address.line2} required placeholder='Enter your address2' onChange={(e)=>setuserdata(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} name="address.line2" className='input-field2'/>
            </p>):
            (<p>{userdata.address.line1}<br/>{userdata.address.line2}</p>)
          }
        </div>
      </div>

      <div className='all-info'>
        <b>BASIC INFORMATION</b>

        <div className='base'>
          <p><b>Gender</b></p>

          {
            isedit?(<select className="styled-select"onChange={e=>setuserdata(prev=>({...prev,gender:e.target.value}))} value={userdata.gender}><option value="Male">Male</option><option value="Female">Female</option></select>):(<p>{userdata.gender}</p>)
         }

         <p><b>Birthday:</b></p>
         {
        isedit?(<input type="date" id="inp1"  value={userdata.dob} required placeholder='Enter your Birthday' onChange={e=>setuserdata(prev=>({...prev,dob:e.target.value}))} name="dob" className='input-field4'/>):(<p>{userdata.dob}</p>)
        }

        </div>
      </div>

      <div>
        {
          isedit?(<button className="styled-button" onClick={updateuserprofiledata}>Save Information</button>):(<button className="styled-button1" onClick={()=>setisedit(true)}>Edit</button>)
        }
      </div>
      </div>
    </div>
  )
}

export default Myprofile
