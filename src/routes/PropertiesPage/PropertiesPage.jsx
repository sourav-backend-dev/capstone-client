// PropertiesPage.js
import React, { useEffect, useState } from 'react';
import './PropertiesPage.scss';
import FilterComponent from '../../components/FilterComponent/FilterComponent';

function PropertiesPage() {

  return (
    <div className="properties-page">
      {/* Header/Banner */}
      <div className="header-banner">
        <h1>Properties</h1>
      </div>

      <div className="PropertiesContainer">
        <FilterComponent allProperties={true} />
      </div>
    </div>
  );
}

export default PropertiesPage;