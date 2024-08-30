import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SplashPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [wifiDetails, setWifiDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/properties/${id}`)
      .then(response => {
        setProperty(response.data);
      })
      .catch(() => setError('Error fetching property details'));
  }, [id]);

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const handleConnect = () => {
    const postData = { firstName, lastName, email };

    axios.post('http://localhost:8000/connect', postData)
      .then(() => {
        return axios.get(`http://localhost:8000/properties/${id}`);
      })
      .then(response => {
        // Ensure `response.data` contains `wifi-details`
        if (response.data['wifi-details']) {
          setWifiDetails(response.data['wifi-details']);
        } else {
          setError('No WiFi details found');
        }
      })
      .catch(() => setError('Error connecting to the property'));
  };

  const splashPageData = property && property['splash-page'] && property['splash-page'][0];

  return (
    <div>
      {error && <p>{error}</p>}
      {splashPageData ? (
        <div>
          <h1>{splashPageData.title}</h1>
          <img src={splashPageData.logo} alt="Property Logo" />
          <p>{splashPageData.description1}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <form>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="button" onClick={handleClear}>Clear</button>
        <button type="button" onClick={handleConnect}>Connect</button>
      </form>

      {wifiDetails ? (
        <div>
          <h3>WiFi Details:</h3>
          <p>Name: {wifiDetails.wifiName}</p>
          <p>Password: {wifiDetails.wifiPassword}</p>
        </div>
      ) : (
        <p>WiFi details not available</p>
      )}
    </div>
  );
}

export default SplashPage;
