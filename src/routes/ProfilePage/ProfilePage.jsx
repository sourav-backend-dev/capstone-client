import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";

const ProfileSidebar = () => (
  <div className="profile-sidebar">
    <ul>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/profile/settings">Settings</Link></li>
    </ul>
  </div>
);

const ProfileDetails = ({ user }) => (
  <div className="profile-details">
    <h2>My Profile</h2>
    <p>
      <strong>First Name:</strong> {user.firstName}
    </p>
    <p>
      <strong>Last Name:</strong> {user.lastName}
    </p>
    <p>
      <strong>Email:</strong> {user.email}
    </p>
    <p>
      <strong>Role:</strong> {user.role}
    </p>
    {user.membership && (
      <>
        <p>
          <strong>Membership Type:</strong> {user.membership.type}
        </p>
        <p>
          <strong>Membership Price:</strong> ${user.membership.price}
        </p>
        <p>
          <strong>Duration:</strong> {user.membership.durationInMonths} months
        </p>
      </>
    )}
  </div>
);

const SettingsPage = ({ user, setUser }) => {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        "https://capstone-server-aclw.onrender.com/api/user/profile",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          ...(form.password && { password: form.password }), // Only send password if it's updated
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(response.data); // Update the user in the parent component
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (optional)"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://capstone-server-aclw.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Profile not found. Please log in again.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileSidebar />
        <div className="profile-content">
          <Routes>
            <Route path="/" element={<ProfileDetails user={user} />} />
            <Route path="/settings" element={<SettingsPage user={user} setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
