import './PropertyCard.scss';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function PropertyCard({ property }) {
  const images = property.imageUrl.split(',');
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const handleWishlistToggle = (property) => {
    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.includes(property.id)
        ? prevWishlist.filter((id) => id !== property.id)
        : [...prevWishlist, property.id];

      // Save to local storage
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  return (
    <div className="property-card" key={property.id}>
      <img
        src={property.imageUrl.split(',')[0]}
        alt={property.title}
        className="property-image"
        style={{ height: '250px', width: '285px' }}
      />
      <h2 className="property-title">{property.title}</h2>
      <p className="property-details">
        <strong>Price:</strong>  ${property.price}
      </p>
      <p className="property-details">
        <strong>Length:</strong>  {property.length} m |  <strong>Breadth:</strong> {property.breadth} m
      </p>
      <p className="property-location">
        {property.city}, {property.state}, {property.pincode}
      </p>
      <div className='buttonGroup'>
        <button
          className={`wishlist-button ${wishlist.includes(property.id) ? 'active' : ''
            }`}
          onClick={() => handleWishlistToggle(property)}
        >
          ♥
        </button>
        <Link to={`/property/${property.id}`} className="property-link">
          Details
        </Link>

      </div>
    </div>
  );
}

export default PropertyCard;