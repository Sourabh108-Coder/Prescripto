
import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../Context/Admincontext'
import { MdCancel } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";

const Allappointments = () => {
  const {
    adtoken,
    appointments,
    getallappointments,
    cancelappointment
  } = useContext(Admincontext);

  useEffect(() => {
    if (adtoken) {
      getallappointments();
    }
  }, [adtoken]);

  return (
    <div className=" all-appointments-page">

      <div className="appointments-title">
        <div className="appointments-title-icon">
          <RiFileList3Line />
        </div>

        <div>
          <h1 className="all-doc">All Appointments</h1>
          <p className = "mob_hid">Manage and track all patient appointments</p>
        </div>
      </div>

      <div className="appointments-panel">

        <div className="appointments-panel-header">
          <div>
            <h2>Appointment Records</h2>
            <p className = "mob_hid">View patient details and appointment status</p>
          </div>

          <div className="appointments-count">
            {appointments.length} Appointments
          </div>
        </div>

        <div className="appo-data">

          <div className="table-header">
            <div className="table-cell">#</div>
            <div className="table-cell">Patient</div>
            <div className="table-cell">Email Address</div>
            <div className="table-cell">Date & Time</div>
            <div className="table-cell">Doctor</div>
            <div className="table-cell">Fees</div>
            <div className="table-cell">Status / Action</div>
          </div>

          {appointments.map((item, index) => (
            <div key={item._id} className="table-row">

              <div className="table-cell" data-label="No.">
                <span className="appointment-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="table-cell" data-label="Patient">
                <div className="patient-info">
                  <div className="patient-avatar">
                    {item.userdata.name?.charAt(0)?.toUpperCase() || 'P'}
                  </div>

                  <span className="patient-name">
                    {item.userdata.name}
                  </span>
                </div>
              </div>

              <div className="table-cell email-cell" data-label="Email">
                {item.userdata.email}
              </div>

              <div className="table-cell date-cell" data-label="Date & Time">
                <span>{item.slotdate}</span>
                <span className="appointment-time">
                  {item.slottime}
                </span>
              </div>

              <div className="table-cell doctor-cell" data-label="Doctor">
                {item.docdata.name}
              </div>

              <div className="table-cell fees-cell" data-label="Fees">
                <span>{item.docdata.fee}</span>
              </div>

              <div className="table-cell action-cell" data-label="Status">
                {item.canceled ? (
                  <span className="appointment-status status-cancelled">
                    <span className="status-dot"></span>
                    Cancelled
                  </span>
                ) : item.iscompleted ? (
                  <span className="appointment-status status-completed">
                    <span className="status-dot"></span>
                    Completed
                  </span>
                ) : (
                  <button
                    type="button"
                    className="cancel-appointment-btn"
                    aria-label={`Cancel appointment for ${item.userdata.name}`}
                    onClick={() => cancelappointment(item._id)}
                  >
                    {/* <MdCancel /> */}
                    <span>Revoke Appointment</span>
                  </button>
                )}
              </div>

            </div>
          ))}

          {appointments.length === 0 && (
            <div className="appointments-empty">
              <RiFileList3Line />
              <h3>No appointments found</h3>
              <p>Appointments will appear here when they are booked.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Allappointments;
