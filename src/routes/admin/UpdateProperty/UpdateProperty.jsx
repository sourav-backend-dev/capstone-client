import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProperty.scss';

function UpdateProperty() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState({
    title: '',
    description: '',
    imageUrl: '',
    length: '',
    breadth: '',
    city: '',
    state: '',
    pincode: '',
    furnished: false,
    parking: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://capstone-server-aclw.onrender.com/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
        alert('Failed to fetch property details.');
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProperty({
      ...property,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // Title and Description: Required fields
    if (!property.title) newErrors.title = 'Title is required.';
    if (!property.description) newErrors.description = 'Description is required.';

    // Length, Breadth, and Price: Must be greater than 0
    const numericFields = ['length', 'breadth'];
    numericFields.forEach((field) => {
      if (property[field] <= 0) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0.`;
    });


    // Image URL format validation
    if (property.imageUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(property.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL for the image.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only submit if valid

    try {
      await axios.put(`https://capstone-server-aclw.onrender.com/api/properties/${id}`, {
        ...property,
        userId,
      });
      alert('Property updated successfully!');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property.');
    }
  };

  return (
    <div className="update-property">
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(property)
          .filter((key) => !['createdAt', 'updatedAt', 'userId', 'soldAt'].includes(key)) // Exclude these fields
          .map((key) => (
            <React.Fragment key={key}>
              {typeof property[key] === 'boolean' ? (
                <div className="toggle-container">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      name={key}
                      checked={property[key]}
                      onChange={handleInputChange}
                    />
                    <span className="slider"></span>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ) : key === 'imageUrl' ? (
                // Image preview
                <div className="field" key={key}>
                  <input
                    type="text"
                    name={key}
                    placeholder="Image URL"
                    value={property[key]}
                    onChange={handleInputChange}
                  />
                  {property[key] && (
                    <div className="image-thumbnail">
                      <img
                        src={property[key].split(',')[0]}
                        alt={property.title}
                        className="thumbnail"
                      />
                    </div>
                  )}
                  {errors[key] && <span className="error">{errors[key]}</span>}
                </div>
              ) : (
                <div className="field" key={key}>
                  <input
                    type={key === 'length' || key === 'breadth' ? 'number' : 'text'}
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={property[key]}
                    onChange={handleInputChange}
                    required
                    disabled={key === 'id'} // Disable the 'id' field if it existed
                  />
                  {errors[key] && <span className="error">{errors[key]}</span>}
                </div>
              )}
            </React.Fragment>
          ))}
        <button type="submit" className="update-btn">Update Property</button>
      </form>
    </div>
  );
}

export default UpdateProperty;
