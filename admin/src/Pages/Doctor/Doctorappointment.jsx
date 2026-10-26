import React, { useContext, useEffect } from 'react';
import { Doctorcontext } from '../../Context/Doctorcontext';
import { MdCancel } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';

const Doctorappointment = () => {
  const {
    doctoken,
    allappointments,
    getallappointments,
    completedappo,
    cancelledappo,
  } = useContext(Doctorcontext);

  useEffect(() => {
    if (doctoken) {
      getallappointments();
    }
  }, [doctoken]);

  const appointments = allappointments || [];

  const completedCount = appointments.filter(
    (item) => item.iscompleted && !item.canceled
  ).length;

  const cancelledCount = appointments.filter(
    (item) => item.canceled
  ).length;

  const pendingCount = appointments.filter(
    (item) => !item.canceled && !item.iscompleted
  ).length;

  return (
    <section className="da-page">
      {/* Page heading */}
      <div className="da-heading">
        <div className="da-heading-content">
          <span className="da-eyebrow">DOCTOR DASHBOARD</span>
          <h1 className="da-title">Appointments</h1>
          <p className="da-subtitle">
            Manage your patient visits, track appointment statuses,
            and keep your schedule organized.
          </p>
        </div>

        <div className="da-total-card">
          <span className="da-total-icon">✚</span>
          <div>
            <span className="da-total-label">Total appointments</span>
            <h2>{appointments.length}</h2>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="da-stats">
        <div className="da-stat-card da-stat-blue">
          <div className="da-stat-top">
            <span className="da-stat-label">Total Visits</span>
            <span className="da-stat-icon">▦</span>
          </div>
          <h3>{appointments.length}</h3>
          <p>All scheduled appointments</p>
        </div>

        <div className="da-stat-card da-stat-orange">
          <div className="da-stat-top">
            <span className="da-stat-label">Pending</span>
            <span className="da-stat-icon">◷</span>
          </div>
          <h3>{pendingCount}</h3>
          <p>Awaiting completion</p>
        </div>

        <div className="da-stat-card da-stat-green">
          <div className="da-stat-top">
            <span className="da-stat-label">Completed</span>
            <span className="da-stat-icon">✓</span>
          </div>
          <h3>{completedCount}</h3>
          <p>Successfully completed</p>
        </div>

        <div className="da-stat-card da-stat-red">
          <div className="da-stat-top">
            <span className="da-stat-label">Cancelled</span>
            <span className="da-stat-icon">×</span>
          </div>
          <h3>{cancelledCount}</h3>
          <p>Cancelled appointments</p>
        </div>
      </div>

      {/* Appointments table */}
      <div className="da-appointments-panel">
        <div className="da-panel-heading">
          <div>
            <h2>All Appointments</h2>
            <p>View and manage your patient appointments below.</p>
          </div>

          <span className="da-record-count">
            {appointments.length} records
          </span>
        </div>

        {appointments.length > 0 ? (
          <div className="da-table-wrapper">
            <div className="da-table da-table-header">
              <div className="da-cell">#</div>
              <div className="da-cell">Patient</div>
              <div className="da-cell">Email Address</div>
              <div className="da-cell">Date &amp; Time</div>
              <div className="da-cell">Fees</div>
              <div className="da-cell">Payment</div>
              <div className="da-cell">Status / Actions</div>
            </div>

            {appointments.map((item, index) => {
              const patientName = item.userdata?.name || 'Unknown patient';
              const patientEmail = item.userdata?.email || 'No email provided';

              return (
                <div className="da-table da-table-row" key={item._id || index}>
                  <div className="da-cell da-index" data-label="Appointment">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="da-cell da-patient" data-label="Patient">
                    <div className="da-avatar">
                      {patientName.charAt(0).toUpperCase()}
                    </div>
                    <div className="da-patient-info">
                      <strong>{patientName}</strong>
                      <span>Patient</span>
                    </div>
                  </div>

                  <div className="da-cell da-email" data-label="Email Address">
                    {patientEmail}
                  </div>

                  <div className="da-cell da-datetime" data-label="Date & Time">
                    <strong>{item.slotdate}</strong>
                    <span>{item.slottime}</span>
                  </div>

                  <div className="da-cell da-fees" data-label="Fees">
                    <strong>{item.amount}</strong>
                  </div>

                  <div className="da-cell" data-label="Payment">
                    <span
                      className={`da-payment ${
                        item.payment ? 'da-payment-online' : 'da-payment-cash'
                      }`}
                    >
                      <span className="da-payment-dot" />
                      {item.payment ? 'Online' : 'Cash'}
                    </span>
                  </div>

                  <div className="da-cell da-actions" data-label="Status / Actions">
                    {item.canceled ? (
                      <span className="da-status da-status-cancelled">
                        Cancelled
                      </span>
                    ) : item.iscompleted ? (
                      <span className="da-status da-status-completed">
                        <FaCircleCheck />
                        Completed
                      </span>
                    ) : (
                      <div className="da-action-group">
                        <button
                          type="button"
                          className="da-action-btn da-complete-btn"
                          onClick={() => completedappo(item._id)}
                          aria-label={`Mark ${patientName}'s appointment as completed`}
                          title="Mark as completed"
                        >
                          <FaCircleCheck />
                          <span>Complete</span>
                        </button>

                        <button
                          type="button"
                          className="da-action-btn da-cancel-btn"
                          onClick={() => cancelledappo(item._id)}
                          aria-label={`Cancel ${patientName}'s appointment`}
                          title="Cancel appointment"
                        >
                          <MdCancel />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="da-empty-state">
            <div className="da-empty-illustration">
              <span className="da-empty-calendar">▦</span>
              <span className="da-empty-plus">+</span>
            </div>

            <h3>No appointments yet</h3>
            <p>
              Your appointment list is empty. New patient bookings
              will appear here when they become available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctorappointment;