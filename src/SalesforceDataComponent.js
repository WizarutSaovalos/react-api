import React, { useState, useEffect } from 'react';
import SalesforceFileDownloader from './SalesforceFileDownloader'; // Import the downloader component

const SalesforceDataComponent = ({ accessToken }) => {
  const [data, setData] = useState(null);
  const instanceUrl = 'https://resilient-goat-rvo02o-dev-ed.my.salesforce.com';

  useEffect(() => {
    console.log('accessToken = ',accessToken);
    if (!accessToken) return;

    const fetchData = async () => {
      const queryUrl = `${instanceUrl}/services/data/v56.0/query?q=SELECT+Id,+Title+FROM+ContentDocument`;

      try {
        const response = await fetch(queryUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  // Define a function to handle file download
  const handleFileDownload = (contentDocumentId) => {
    console.log('Document ID for download:', contentDocumentId);
    // Here you can call SalesforceFileDownloader or trigger download directly
    // If SalesforceFileDownloader is a function you could do something like:
    //SalesforceFileDownloader(accessToken, contentDocumentId);
  };

  return (
    <div>
      {data && data.map((document, index) => (
        <li key={index}>
          <button onClick={() => handleFileDownload(document.Id)}>
            {document.Title}
          </button>
          <SalesforceFileDownloader accessToken={accessToken} contentVersionId={document.Id} />
        </li>
      ))};
    </div>
  );
};

export default SalesforceDataComponent;
