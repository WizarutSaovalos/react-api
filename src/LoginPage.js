import React, { useState,useEffect } from 'react';
import SalesforceDataComponent from './SalesforceDataComponent';

const LoginPage = () => {
  const [accessToken, setAccessToken] = useState('');

  const handleSalesforceLogin = () => {
    // Construct the Salesforce login URL
    const clientId = '3MVG9n_HvETGhr3CfzUjVvrJHlbHNiqZAfR9g0UBWmLsvoqTo0yHJRKCO_o5uACry7DQeFKZUIpvb0_.Dp1YF';
    //const consumer_secret = '53BDF4508651119B218C3F738C01C03599922AA3E21FCF0E14C3779DDB9E6409';
    const redirectUri = encodeURIComponent('https://localhost:3000/callback');
    const loginUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;

    // Redirect to Salesforce login
    window.location.href = loginUrl;
    SalesforceDataComponent();
  };

  // Check if the URL contains an access token
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      // Extract the access_token from the hash
      const params = new URLSearchParams(hash.substring(1)); // Remove the '#' symbol
      const accessToken = params.get('access_token');
      if (accessToken) {
        setAccessToken(accessToken);
        // Store the access token in localStorage or a context/state management library
        localStorage.setItem('sf_access_token', accessToken);
      }
    }
  }, []);

  // Conditionally render SalesforceDataComponent if accessToken is present
  return accessToken ? (
    <SalesforceDataComponent accessToken={accessToken} />
  ) : (
    <div className="login-container">
      <button onClick={handleSalesforceLogin}>Login with Salesforce</button>
    </div>
  );
};

export default LoginPage;
