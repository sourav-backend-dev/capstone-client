import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faKey, faRuler, faRulerHorizontal, faRulerVertical,faCheckCircle, faTag } from '@fortawesome/free-solid-svg-icons';


function Dashboard() {
  const { role, userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      if (role === 'admin') {
        try {
          const userResponse = await axios.get('https://capstone-server-aclw.onrender.com/api/users');
          setUsers(userResponse.data);

          const propertyResponse = await axios.get('https://capstone-server-aclw.onrender.com/api/properties');
          setProperties(propertyResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('Failed to fetch data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://capstone-server-aclw.onrender.com/api/properties/${id}`);
      setProperties(properties.filter(property => property.id !== id));
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update-property/${id}`); // Navigate to the update page with property ID
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (role !== 'admin') {
    return <h2>Access denied: You do not have permission to view this page.</h2>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Properties List</h1>

      <table className="property-table">
        <thead>
          <tr>
            <th rowspan={2}>Image</th>
            <th rowspan={2}>Title</th>
            <th rowspan={2}>Description</th>
            <th colSpan={7}>Features</th>
            <th rowspan={2}>City</th>
            <th rowspan={2}>State</th>
            <th rowspan={2}>Pincode</th>
            <th rowspan={2} colSpan={2}>Actions</th>
          </tr>
          <tr>
            <th><FontAwesomeIcon icon={faRulerVertical} /></th>
            <th><FontAwesomeIcon icon={faRulerHorizontal} /></th>
            <th><FontAwesomeIcon icon={faBed} /></th>
            <th><FontAwesomeIcon icon={faBath} /></th>
            <th><FontAwesomeIcon icon={faCar} /></th>
            <th><FontAwesomeIcon icon={faKey} /></th>
            <th><FontAwesomeIcon icon={faTag} /></th>

          </tr>
        </thead>
        <tbody>
          {properties.length === 0 ? (
            <tr>
              <td colSpan="10">No properties found.</td>
            </tr>
          ) : (
            properties.map((property) => (
              <tr key={property.id}>
                <td>
                  <img
                    src={property.imageUrl.split(',')[0]}
                    alt={property.title}
                    className="thumbnail"
                  />
                </td>
                <td>{property.title}</td>
                <td>{property.description}</td>
                <td>{property.length}m</td>
                <td>{property.breadth}m</td>
                <td>{property.bedrooms}</td>
                <td>{property.bathrooms}</td>
                <td>{property.parking ? "✅" : "❌"}</td>
                <td>{property.furnished ? "✅" : "❌"}</td>
                <td>{property.sold ? "✅" : "❌"}</td>
                <td>{property.city}</td>
                <td>{property.state}</td>
                <td>{property.pincode}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(property.id)}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(property.id)}>
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;