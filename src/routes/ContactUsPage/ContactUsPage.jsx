import React, { useState } from 'react';
import './ContactUsPage.scss';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch('https://capstone-server-aclw.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSuccessMessage('Failed to send the message. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-us-page">
      <h1>Contact Us</h1>
      <section className="contact-details">
        <div className="info">
          <h2>Get in Touch</h2>
          <p>
            Have questions or need assistance? The Urban Nest team is here to help. Reach out to us, and we'll ensure your
            real estate journey is smooth and stress-free.
          </p>
          <p><strong>Email:</strong> support@urbannest.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Dream Street, Homeville, Country</p>
        </div>
        <div className="map">
          <iframe
            title="Urban Nest Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345094757!2d-122.40121028468146!3d37.79249817975607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d2b12df1%3A0x12f96ff1d94862b2!2sUrban%20Nest!5e0!3m2!1sen!2sus!4v1691800272077!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
            {errors.message && <p className="error">{errors.message}</p>}
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default ContactUsPage;
