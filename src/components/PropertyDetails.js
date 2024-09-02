// PropertyDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetails.css'; // Make sure this CSS file exists and is styled appropriately

function PropertyDetails() {
  const { id } = useParams(); // Extract the property ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [property, setProperty] = useState(null); // State to hold the property data
  const [error, setError] = useState(null); // State to handle errors

  // Fetch property details when the component mounts or when the ID changes
  useEffect(() => {
    axios.get(`http://localhost:8000/api/properties/${id}`) // Updated API path
      .then(response => {
        setProperty(response.data); // Set property data from the response
      })
      .catch(() => setError('Error fetching property details')); // Set error if fetching fails
  }, [id]);

  // If there's an error, display the error message
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="property-details-container">
      {property ? (
        <div className="property-details">
          <h1 className="property-title">Property Details</h1>
          <div className="property-info">
            <div className="property-info-item">
              <span className="property-info-label">Title:</span>
              <span className="property-info-value">{property.title}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">City:</span>
              <span className="property-info-value">{property.location?.city}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">State:</span>
              <span className="property-info-value">{property.location?.state}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">Country:</span>
              <span className="property-info-value">{property.location?.country}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">Amount:</span>
              <span className="property-info-value">${property.price?.amount.toLocaleString()}</span>
            </div>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>Back to List</button>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
