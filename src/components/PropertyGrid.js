import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCodeComponent from './QRCodeComponent'; // Ensure this import is correct
import axios from 'axios';
import './PropertyGrid.css';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the properties!", error);
      });
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/properties/${id}`) // Corrected endpoint with /api
      .then(() => {
        setProperties(properties.filter((property) => property._id !== id)); // Assuming the ID field from MongoDB is _id
      })
      .catch((error) => {
        console.error("There was an error deleting the property!", error);
      });
  };

  return (
    <div className="property-grid">
      <h1>Property Listings</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          className="clear-button"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>
      </div>
      <table className="property-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <tr key={property._id}> {/* Updated to use _id */}
                <td>{property._id}</td> {/* Updated to use _id */}
                <td>{property.title}</td>
                <td>{property.location?.city}</td>
                <td>{property.location?.state}</td>
                <td>{property.location?.country}</td>
                <td>${property.price?.amount.toLocaleString()}</td>
                <td>
                  <Link to={`/property-details/${property._id}`} className="action-button">
                    <FaEye /> {/* View icon */}
                  </Link>
                  <Link to={`/edit-property/${property._id}`} className="action-button">
                    <FaEdit /> {/* Edit icon */}
                  </Link>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDelete(property._id)} // Updated to use _id
                  >
                    <FaTrash /> {/* Delete icon */}
                  </button>
                  <QRCodeComponent
                    id={property._id} // Updated to use _id
                    size={64}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No properties found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(filteredProperties.length / propertiesPerPage)).keys()].map(number => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PropertyGrid;
