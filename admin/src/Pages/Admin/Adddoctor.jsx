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
  <div className="add-doctor-page">
    <form className="add-doctor-form" onSubmit={onsubmithandler}>

      {/* Page Header */}
      <div className="doctor-page-header">
        <div className="doctor-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 8v8M8 12h8" strokeLinecap="round" />
            <rect x="3" y="3" width="18" height="18" rx="5" />
          </svg>
        </div>
        <div>
          <h1>Add New Doctor</h1>
          <p>Complete the information below to add a doctor to your team.</p>
        </div>
      </div>

      {/* Profile Image */}
      <div className="doctor-profile-card">
        <div className="doctor-profile-upload">
          <label htmlFor="doc-img" className="doctor-image-label">
            <img
              src={
                docimg
                  ? URL.createObjectURL(docimg)
                  : "https://static.vecteezy.com/system/resources/previews/020/213/738/non_2x/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
              }
              className="doctor-profile-image"
              alt="Doctor profile preview"
            />
            <span className="doctor-upload-badge">+</span>
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setdocimg(e.target.files[0])}
          />
        </div>

        <div className="doctor-profile-text">
          <h3>Doctor Profile Photo</h3>
          <p>Upload a professional photo for the doctor's profile.</p>
          <label htmlFor="doc-img" className="doctor-upload-link">
            Choose an image
          </label>
        </div>
      </div>

      {/* Personal Information */}
      <section className="doctor-form-section">
        <div className="doctor-section-heading">
          <span className="doctor-section-number">01</span>
          <div>
            <h2>Personal Information</h2>
            <p>Basic details and account credentials</p>
          </div>
        </div>

        <div className="doctor-fields-grid">
          <div className="doctor-field">
            <label htmlFor="inp1">Doctor Name <span>*</span></label>
            <input
              type="text"
              id="inp1"
              required
              placeholder="Enter full name"
              onChange={(e) => setname(e.target.value)}
              value={name}
              name="name"
            />
          </div>

          <div className="doctor-field">
            <label htmlFor="inp2">Email Address <span>*</span></label>
            <input
              type="email"
              id="inp2"
              required
              placeholder="doctor@example.com"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              name="email"
            />
          </div>

          <div className="doctor-field">
            <label htmlFor="inp3">Password <span>*</span></label>
            <input
              type="password"
              id="inp3"
              required
              placeholder="Create a password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>

          <div className="doctor-field">
            <label htmlFor="inp4">Experience</label>
            <select
              id="inp4"
              name="experience"
              onChange={(e) => setexperience(e.target.value)}
              value={experience}
            >
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
        </div>
      </section>

      {/* Professional Information */}
      <section className="doctor-form-section">
        <div className="doctor-section-heading">
          <span className="doctor-section-number">02</span>
          <div>
            <h2>Professional Information</h2>
            <p>Specialization, qualifications and consultation fees</p>
          </div>
        </div>

        <div className="doctor-fields-grid">
          <div className="doctor-field">
            <label htmlFor="inp6">Speciality</label>
            <select
              id="inp6"
              name="speciality"
              onChange={(e) => setspeciality(e.target.value)}
              value={speciality}
            >
              <option value="Physician">Physician</option>
              <option value="Gymecologist">Gymecologist</option>
              <option value="Dermetologist">Dermetologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="doctor-field">
            <label htmlFor="inp7">Education / Degree <span>*</span></label>
            <input
              type="text"
              id="inp7"
              required
              placeholder="e.g. MBBS, MD"
              onChange={(e) => setdegree(e.target.value)}
              value={degree}
              name="degree"
            />
          </div>

          <div className="doctor-field">
            <label htmlFor="inp5">Consultation Fee <span>*</span></label>
            <div className="doctor-fee-input">
              <span>₹</span>
              <input
                type="number"
                id="inp5"
                required
                placeholder="Enter consultation fee"
                onChange={(e) => setfee(e.target.value)}
                value={fee}
                name="fee"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="doctor-form-section">
        <div className="doctor-section-heading">
          <span className="doctor-section-number">03</span>
          <div>
            <h2>Clinic Address</h2>
            <p>Enter the doctor's clinic or workplace address</p>
          </div>
        </div>

        <div className="doctor-fields-grid">
          <div className="doctor-field">
            <label htmlFor="address1">Address Line 1 <span>*</span></label>
            <input
              type="text"
              id="address1"
              required
              placeholder="Street, building or clinic name"
              name="address1"
              onChange={(e) => setaddress1(e.target.value)}
              value={address1}
            />
          </div>

          <div className="doctor-field">
            <label htmlFor="address2">Address Line 2 <span>*</span></label>
            <input
              type="text"
              id="address2"
              required
              placeholder="Area, city or additional details"
              name="address2"
              onChange={(e) => setaddress2(e.target.value)}
              value={address2}
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="doctor-form-section doctor-about-section">
        <div className="doctor-section-heading">
          <span className="doctor-section-number">04</span>
          <div>
            <h2>About the Doctor</h2>
            <p>Share a short professional introduction</p>
          </div>
        </div>

        <div className="doctor-field">
          <label htmlFor="inp8">Professional Bio <span>*</span></label>
          <textarea
            id="inp8"
            required
            rows={5}
            name="about"
            placeholder="Write about the doctor's experience, expertise, qualifications and approach to patient care..."
            onChange={(e) => setabout(e.target.value)}
            value={about}
          />
        </div>
      </section>

      {/* Form Actions */}
      <div className="doctor-form-footer">
        <p><span>*</span> Required fields</p>
        <button type="submit" className="doctor-submit-button">
          <span>Add Doctor</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

    </form>
  </div>
);
}

export default Adddoctor
