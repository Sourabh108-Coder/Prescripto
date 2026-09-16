import React, { use, useContext, useState } from 'react'
import { Admincontext } from '../../Context/Admincontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Adddoctor = () => {

    const[docimg,setdocimg]=useState(false);

    const[name,setname]=useState("");

    const[email,setemail]=useState("");

    const[password,setpassword]=useState("");

    const[experience,setexperience]=useState("1 Year");

    const[fee,setfee]=useState("");

    const[about,setabout]=useState("");

    const[speciality,setspeciality]=useState("Physician");

    const[degree,setdegree]=useState("");

    const[address1,setaddress1]=useState("");

    const[address2,setaddress2]=useState("");

    const{backendUrl,adtoken}=useContext(Admincontext);

    const onsubmithandler=async(event)=>
    {
        event.preventDefault();

        console.log("hello yaar kuch toh kro??")

        try
        {
            if(!docimg)
            {
              toast.error("Image Not Selected");
            }

            const formdata=new FormData();

            formdata.append('image',docimg);
            formdata.append('name',name);
            formdata.append('email',email);
            formdata.append('password',password);
            formdata.append('experience',experience);
            formdata.append('fee',Number(fee));
            formdata.append('about',about);
            formdata.append('speciality',speciality);
            formdata.append('degree',degree);
            formdata.append('address',JSON.stringify({line1:address1,line2:address2}));
            

            // formdata.forEach((value,key) => {
            //     console.log(`${key}:${value}`);
            // });

            const res= await axios.post(backendUrl+"/api/v1/prescripto/adddoctor",formdata,{headers:{adtoken}});

            if(res.data.success)
            {
                toast.success("Doctor Added Successfully");

                setdocimg(false);
                setname("");
                setpassword("");
                setemail("");
                setaddress1("");
                setaddress2("");
                setdegree("");
                setabout("");
                setfee("");
            }
            else
            {
                toast.error(res.data.message);
                
            }

        }

        catch(error)
        {
            toast.error("Error in Adding");
            console.log("Hello this is the error"+error);
        }
    }




  return (
    <div className='add-doc'>
       <form onSubmit={onsubmithandler}>
        <h1 className='hi-doc'>Add Doctor</h1>

        <div className='doc-upload'>
            <label for='doc-img'>
                <img src={docimg?(URL.createObjectURL(docimg)):('https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg')} className='uploading'/>
            </label>

            <input type='file' id='doc-img' hidden onChange={(e)=> setdocimg(e.target.files[0])}/>

            <h3>Upload Doctor <br/>Picture</h3>
        </div>

        <div className='formy'>
          <div className='form-left'>
            <div>
               <label for="inp1"><b>Doctor Name</b></label>
               <input type="text" id="inp1" required placeholder='Enter Name' onChange={(e)=>setname(e.target.value)} value={name} name="name" className='input-field'/>
            </div>
            <br/>

            <div>
               <label for="inp2"><b>Doctor Email</b></label>
               <input type="email" id="inp2" required placeholder='Enter Email' onChange={(e)=>setemail(e.target.value)} value={email} name="email" className='input-field'/>
            </div>
            <br/>

            <div>
               <label for="inp3"><b>Doctor Password</b></label>
               <input type="password" id="inp3" required placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} value={password} name="password" className='input-field'/>
            </div>
            <br/>

            <div>

                <label for="inp4"><b>Experience</b></label>
                <br/>
                <select id="inp4" className="custom-select" name="experience" onChange={(e)=>setexperience(e.target.value)} value={experience}>
                    <option value="1Year">1 Year</option>
                    <option value="2Years">2 Years</option>
                    <option value="3Years">3 Years</option>
                    <option value="4Years">4 Years</option>
                    <option value="5Years">5 Years</option>
                    <option value="6Years">6 Years</option>
                    <option value="7Years">7 Years</option>
                    <option value="8Years">8 Years</option>
                    <option value="9Years">9 Years</option>
                    <option value="10Years">10 Years</option>
                </select>
            </div>
            <br/>

                <div>
                   <label for="inp5"><b>Fees</b></label>
                   <br/>
                   <input type="number" id="inp5" required placeholder='Enter Fees' onChange={(e)=>setfee(e.target.value)} value={fee} name="fee" className='input-field'/>
               </div>
          </div>

            <div>
                <div>

                <label for="inp6"><b>Speciality</b></label>
                <br/>
                <select id="inp6" className="custom-select" onChange={(e)=>setspeciality(e.target.value)} value={speciality} name='speciality'>
                    <option value="Physician">Physician</option>
                    <option value="Gymecologist">Gymecologist</option>
                    <option value="Dermetologist">Dermetologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <br/>

              <div>
                   <label for="inp7"><b>Education</b></label>
                   <br/>
                   <input type="text" id="inp7" required placeholder='Enter Education' onChange={(e)=>setdegree(e.target.value)} value={degree} name="degree" className='input-field1'/>
               </div>

               <div>
                <p><b>Address</b></p>
                <input type='text' required placeholder='Enter First Address' name='address1' className='input-field1' onChange={(e)=>setaddress1(e.target.value)} value={address1}/>
                <input type='text' required placeholder='Enter Last Address' name='address2'  className='input-field1' onChange={(e)=>setaddress2(e.target.value)} value={address2}/>
               </div>

            </div>
        </div>
        <br/>

              <div className='tesu'>
                   <label for="inp8"><b>About Doctor</b></label>
                   <br/>
                   <textarea placeholder='Write About Doctor' id='inp8' required rows={5} name='about' className='input-field' onChange={(e)=>setabout(e.target.value)} value={about}/>
               </div>

               <button type="submit" className='submit-btn2'>Add Doctor</button>

       </form>
    </div>
  )
}

export default Adddoctor
