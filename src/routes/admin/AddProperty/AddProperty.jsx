import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import './AddProperty.scss';

function AddProperty() {
  const { userId } = useAuth();
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    imageUrl: '',
    length: '',
    breadth: '',
    city: '',
    state: '',
    pincode: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    parking: false,
    furnished: false,
    sold: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const numericFields = ['length', 'breadth', 'price', 'bedrooms', 'bathrooms'];

    setNewProperty({
      ...newProperty,
      [name]: type === 'checkbox' ? checked : numericFields.includes(name) ? parseFloat(value) : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Title and Description: Required fields
    if (!newProperty.title) newErrors.title = 'Title is required.';
    if (!newProperty.description) newErrors.description = 'Description is required.';

    // Image URL validation (optional but basic check for format)
    if (newProperty.imageUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(newProperty.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL for the image.';
    }

    // Length, Breadth, Price, Bedrooms, Bathrooms: Must be greater than 0
    const requiredNumericFields = ['length', 'breadth', 'price', 'bedrooms', 'bathrooms'];
    requiredNumericFields.forEach((field) => {
      if (newProperty[field] <= 0) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0.`;
    });


    // City and State: Required fields
    if (!newProperty.city) newErrors.city = 'City is required.';
    if (!newProperty.state) newErrors.state = 'State is required.';

    // Price validation: Must be a valid number and greater than 0
    if (newProperty.price <= 0) newErrors.price = 'Price must be greater than 0.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return; // Only submit if valid

    try {
      await axios.post('https://capstone-server-aclw.onrender.com/api/properties', {
        ...newProperty,
        userId,
      });
      alert('Property added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to add property.');
    }
  };

  const resetForm = () => {
    setNewProperty({
      title: '',
      description: '',
      imageUrl: '',
      length: 0,
      breadth: 0,
      city: '',
      state: '',
      pincode: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      parking: false,
      furnished: false,
      sold: false,
    });
  };

  return (
    <div className="add-property">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(newProperty).map((key) => (
          <React.Fragment key={key}>
            {typeof newProperty[key] === 'boolean' ? (
              <div className="toggle-container">
                <label className="toggle">
                  <input
                    type="checkbox"
                    name={key}
                    checked={newProperty[key]}
                    onChange={handleInputChange}
                  />
                  <span className="slider"></span>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              </div>
            ) : (
              <div className="field">
                <input
                  type={typeof newProperty[key] === 'number' ? 'number' : 'text'}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={newProperty[key]}
                  onChange={handleInputChange}
                  required={key !== 'imageUrl'} 
                />
                {errors[key] && <span className="error">{errors[key]}</span>}
              </div>
            )}
          </React.Fragment>
        ))}
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default AddProperty;
