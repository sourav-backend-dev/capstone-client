import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "./appointmentCalendar.scss"; // Import SCSS

const AppointmentCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([
    {
      title: "Meeting with Client",
      start: new Date(2024, 11, 10, 10, 0),
      end: new Date(2024, 11, 10, 11, 0),
    },
  ]);

  const handleSelectSlot = async ({ start, end }) => {
    const title = prompt("Enter Appointment Title");
    const userName = prompt("Enter Your Name");
    const userMessage = prompt("Enter Your Message");

    if (title && userName && userMessage) {
      const newEvent = { title, start, end, userName, userMessage };
      setEvents([...events, newEvent]);

      try {
        await axios.post("https://capstone-server-aclw.onrender.com/api/appointments", newEvent);
        alert("Appointment saved successfully!");
      } catch (error) {
        console.error("Error saving appointment:", error);
        alert("Failed to save appointment.");
      }
    }
  };

  return (
    <div className="appointment-calendar">
      <h1>Appointment Scheduler</h1>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default AppointmentCalendar;
