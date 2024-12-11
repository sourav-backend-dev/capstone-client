import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import React-Leaflet components
import L from 'leaflet';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faKey } from '@fortawesome/free-solid-svg-icons';
import './PropertyDetailsPage.scss';
import 'leaflet/dist/leaflet.css'; // Leaflet styles
import PropertyCard from "../../components/PropertyCard/PropertyCard";

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([0, 0]); // State for map coordinates

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://capstone-server-aclw.onrender.com/api/properties/${id}`);
        setProperty(response.data);

        // Fetch coordinates for the location
        const geocodeResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
          params: {
            q: `${response.data.city}, ${response.data.state}, ${response.data.pincode}`,
            key: 'd99a71b3ada2488abe68753ffc7c6e8d', // Replace with your OpenCage API key
          },
        });

        const { results } = geocodeResponse.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry;
          setCoordinates([lat, lng]);
        } else {
          console.error('No results found for the provided address.');
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
        alert('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://capstone-server-aclw.onrender.com/api/properties');
        const availableProperties = response.data.filter((property) => !property.sold);
        const shuffledProperties = availableProperties.sort(() => Math.random() - 0.5);
        const topProperties = shuffledProperties.slice(0, 4);
        setProperties(topProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  const images = property.imageUrl.split(',');

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const soldBadgeClass = property.sold ? 'sold-badge sold' : 'sold-badge available';

  return (
    <div className="property-details-page">
  
  {/* Slider Section */}
  <div className="property-slider">
    <Slider {...sliderSettings}>
      {images.map((image, index) => (
        <div key={index} className="slider-image-container">
          <img
            src={image}
            alt={`${property.title} - ${index + 1}`}
            className="slider-image"
          />
        </div>
      ))}
    </Slider>
  </div>
  
  {/* Details and Map Section */}
  <div className="property-details-container">
    {/* Property Info */}
    <div className="property-info">
    <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>
        <strong>Price:</strong> ${property.price.toLocaleString()}
      </p>
      <p>
        <strong>Dimensions:</strong> {property.length} m x {property.breadth} m
      </p>
      <p>
        <strong>Location:</strong> {property.city}, {property.state}, {property.pincode}
      </p>
      <div className="property-features">
        <p><FontAwesomeIcon icon={faBed} /> {property.bedrooms} Bedrooms</p>
        <p><FontAwesomeIcon icon={faBath} /> {property.bathrooms} Bathrooms</p>
        <p><FontAwesomeIcon icon={faCar} /> {property.parking ? 'Parking Available' : 'No Parking'}</p>
        <p><FontAwesomeIcon icon={faKey} /> {property.furnished ? 'Furnished' : 'Unfurnished'}</p>
      </div>
      <p className={soldBadgeClass}>
        <strong>Sold:</strong> {property.sold ? 'Yes' : 'No'}
      </p>
      {property.sold && (
        <p>
          <strong>Sold At:</strong> {new Date(property.soldAt).toLocaleDateString()}
        </p>
      )}
    </div>

    {/* Map Section */}
    <div className="property-map">
      <h2>Property Location</h2>
      <MapContainer center={coordinates} zoom={1} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>
            {property.city}, {property.state}, {property.pincode}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>

  {/* Newly Listed Properties */}
  <div className="newly-listed-properties">
    <h2>You may Also Like</h2>
    <div className="property-cards">
      {properties.length === 0 ? (
        <p>No new properties found.</p>
      ) : (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      )}
    </div>
  </div>
</div>
  );
}

export default PropertyDetailsPage;