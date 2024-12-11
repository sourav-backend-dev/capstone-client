// WishlistPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WishlistPage.scss';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

function WishlistPage() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://capstone-server-aclw.onrender.com/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const wishlistProperties = properties.filter(property => wishlist.includes(property.id));

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="wishlist-page">
      {/* Header/Banner */}
      <div className="header-banner">
        <h1>Your Wishlist</h1>
      </div>
      <div className="property-cards">
        {wishlistProperties.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistProperties.map(property => (
            <PropertyCard property={property} />
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
