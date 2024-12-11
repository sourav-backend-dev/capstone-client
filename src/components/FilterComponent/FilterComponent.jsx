import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './FilterComponent.scss';

const FilterComponent = ({ allProperties }) => {
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [listening, setListening] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  // Error state
  const [errors, setErrors] = useState({
    bedrooms: '',
    bathrooms: '',
    state: '',
    city: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://capstone-server-aclw.onrender.com/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to fetch properties.');
      }
    };

    fetchProperties();
  }, []);

  const validateInputs = () => {
    const newErrors = {};

    // Check if at least one field is filled in (not empty)
    if (!bedrooms && !bathrooms && !state && !city && !minPrice && !maxPrice) {
      setFilteredProperties(properties)
    }

    // Validate numeric fields and check for negative values
    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
      newErrors.minPrice = 'Please enter a valid minimum price (greater than or equal to 0).';
    }

    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
      newErrors.maxPrice = 'Please enter a valid maximum price (greater than or equal to 0).';
    }

    // Ensure maxPrice is not less than minPrice
    if (minPrice && maxPrice && maxPrice < minPrice) {
      newErrors.maxPrice = 'Maximum price should be greater than or equal to minimum price.';
    }

    // Remove any error messages that are empty strings
    const filteredErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (newErrors[key] !== '') {
        acc[key] = newErrors[key];
      }
      return acc;
    }, {});

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };



  const handleSearch = async () => {
    if (!validateInputs()) return;

    // Input validation for numeric fields
    const validMinPrice = minPrice && !isNaN(minPrice) ? minPrice : '';
    const validMaxPrice = maxPrice && !isNaN(maxPrice) ? maxPrice : '';

    try {
      const response = await axios.get('https://capstone-server-aclw.onrender.com/api/properties/filter', {
        params: {
          bedrooms,
          bathrooms,
          state,
          city,
          minPrice: validMinPrice,
          maxPrice: validMaxPrice,
        },
      });

      setFilteredProperties(response.data);
      setBtnClicked(true)
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
      alert('Failed to fetch properties.');
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setSearchQuery(transcript);

      const filtered = properties.filter(
        (property) =>
          property.title.toLowerCase().includes(transcript) ||
          property.description.toLowerCase().includes(transcript) ||
          property.city.toLowerCase().includes(transcript)
      );
      setFilteredProperties(filtered);
    };

    recognition.start();
  };
  console.log(filteredProperties);
  return (
    <>
      {/* Search bar at the top */}
      <div className="search-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button
            className="voice-button"
            onClick={startVoiceRecognition}
            aria-label="Start voice search"
          >
            <i className="fa fa-microphone"></i>
          </button>
        </div>
      </div>
      <div className="filter-layout">
        {/* Filters Sidebar */}
        <div className="filter-sidebar">
          {errors.general && <span className="error">{errors.general}</span>}
          <div className="filters">
            {allProperties ? (
              <>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                  <option value="">Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                </select>
                {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}

                <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
                  <option value="">Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                </select>
                {errors.bathrooms && <span className="error">{errors.bathrooms}</span>}

                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                {errors.state && <span className="error">{errors.state}</span>}

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <span className="error">{errors.city}</span>}

                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                {errors.minPrice && <span className="error">{errors.minPrice}</span>}

                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                {errors.maxPrice && <span className="error">{errors.maxPrice}</span>}
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <span className="error">{errors.city}</span>}

                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                {errors.minPrice && <span className="error">{errors.minPrice}</span>}

                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                {errors.maxPrice && <span className="error">{errors.maxPrice}</span>}
              </>
            )}

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {/* Property Cards */}
        <div className="property-results">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            btnClicked ? 'No Products Found!' :
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
          )}
        </div>

      </div>
    </>
  );
};

export default FilterComponent;
