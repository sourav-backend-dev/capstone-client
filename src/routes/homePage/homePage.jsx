import React, { useEffect, useState } from 'react';
import SimpleSlider from "../../components/slider/Slider";
import { TestimonialSlider } from "../../components/TestimonialSlider/TestimonialSlider";
import PropertyCard from "../../components/PropertyCard/PropertyCard"; // Create this component for displaying individual properties
import axios from 'axios'; // To fetch properties
import "./homePage.scss";
import HomeFilter from '../../components/HomeFilter/HomeFilter';

function HomePage() {
  const images = [
    "https://wallpapers.com/images/hd/nice-house-pictures-ptper8p8mdxv00ae.jpg",
    "https://t3.ftcdn.net/jpg/09/13/84/34/360_F_913843485_cLn212ImJL0oTBgEeUqDxbStSzj3hRgX.jpg",
    "https://c1.wallpaperflare.com/preview/640/638/338/houses-neighbourhood-landscape-lake.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20230618/pngtree-modern-house-visualized-in-stunning-3d-render-image_3630772.jpg",
    "https://t4.ftcdn.net/jpg/08/21/79/23/360_F_821792373_z7GFwY7OMuKBtwajVmNxe6EWEg0O4gLf.jpg",
  ];

  const testimonialArray = [
    "This product completely exceeded my expectations. Highly recommended!",
    "The customer service was fantastic. I’ll definitely be coming back.",
    "Affordable, reliable, and top-notch quality. Great experience overall.",
    "I've never been more satisfied with a purchase. A must-have!",
    "Five stars all the way. Can't wait to use their services again!",
  ];

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://capstone-server-aclw.onrender.com/api/properties'); // Fetch all properties
        
        // Filter out sold properties
        const availableProperties = response.data.filter((property) => !property.sold);
        
        // Shuffle the array randomly
        const shuffledProperties = availableProperties.sort(() => Math.random() - 0.5);
        
        // Limit to the first 4 shuffled properties
        const topProperties = shuffledProperties.slice(0, 4);
        
        setProperties(topProperties); // Set the properties state
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
    return <p>Loading newly listed properties...</p>;
  }

  return (
    <div className="home">
      <SimpleSlider images={images} />
      <div className="filterComponent">
      <HomeFilter />

      </div>
      <div className="txtContainer">
        <h1>
          Find Your Dream Home
          <br />
          Search for your ideal property
        </h1>
        <p>
          Explore a curated selection of homes, apartments, and commercial
          spaces. Partner with trusted agents and get personalized assistance.
          <br />Start your property search with confidence today!
        </p>
        <div className="boxes">
          <div className="box">
            <h1>16+</h1>
            <h2>Years of Experience</h2>
          </div>
          <div className="box">
            <h1>200</h1>
            <h2>Awards Earned</h2>
          </div>
          <div className="box">
            <h1>1300+</h1>
            <h2>Properties Ready</h2>
          </div>
        </div>      
      </div>

      <div className="txtContainer">
        <h1>What Our Members Say?</h1>
        <TestimonialSlider testimonials={testimonialArray} />
      </div>

      {/* Newly Listed Properties Section */}
      <div className="newly-listed-properties">
        <h2>Newly Listed Properties</h2>
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

export default HomePage;
