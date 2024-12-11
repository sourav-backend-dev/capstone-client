import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("https://capstone-server-aclw.onrender.com/api/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="admin-messages-panel">
      <h1>Appointments</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Message</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.userName}</td>
                <td>{appointment.userMessage}</td>
                <td>{new Date(appointment.start).toLocaleString()}</td>
                <td>{new Date(appointment.end).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Appointments Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
