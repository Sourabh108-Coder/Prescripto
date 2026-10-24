
import React, { useContext, useEffect } from 'react';
import { Admincontext } from '../../Context/Admincontext';


const Doctorlist = () => {
  const {
    doctors,
    getalldoctors,
    adtoken,
    changeavailability,
  } = useContext(Admincontext);

  useEffect(() => {
    if (adtoken) {
      getalldoctors();
    }
  }, [adtoken]);

  return (
    <div className="doctor-page">
      {/* Page Header */}
      <div className="doctor-header">
        <div>
          <span className="doctor-eyebrow">ADMINISTRATION</span>
          <h1>Doctors Directory</h1>
          <p>Manage your doctors and their availability.</p>
        </div>

        <div className="doctor-total">
          <span className="total-label">Total Doctors</span>
          <span className="total-number">{doctors.length}</span>
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="doctor-grid">
        {doctors.length > 0 ? (
          doctors.map((item) => (
            <div className="doctor-card" key={item._id}>
              <div className="doctor-card-top">
                <span className="doctor-avatar-label">
                  DOCTOR PROFILE
                </span>

                <span
                  className={`doctor-status ${
                    item.available ? 'is-available' : 'is-unavailable'
                  }`}
                >
                  <span className="status-dot"></span>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className="doctor-image-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="doctor-image"
                  loading="lazy"
                />
              </div>

              <div className="doctor-info">
                <h2>{item.name}</h2>
                <p className="doctor-speciality">
                  {item.speciality}
                </p>

                <div className="doctor-divider"></div>

                <div className="availability-row">
                  <div className="availability-text">
                    <span className="availability-title">
                      Availability
                    </span>
                    <span className="availability-description">
                      {item.available
                        ? 'Accepting appointments'
                        : 'Not accepting appointments'}
                    </span>
                  </div>

                  <label className="availability-switch">
                    <input
                      type="checkbox"
                      checked={Boolean(item.available)}
                      onChange={() => changeavailability(item._id)}
                      aria-label={`Toggle availability for ${item.name}`}
                    />
                    <span className="switch-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="doctor-empty">
            <div className="empty-icon">+</div>
            <h2>No doctors found</h2>
            <p>Doctors will appear here when they are added.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctorlist;
