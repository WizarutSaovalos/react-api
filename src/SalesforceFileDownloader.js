import React from 'react';
import axios from 'axios';

// Correct the parameters to use props
const SalesforceFileDownloader = (props) => {
    console.log('props ',props);
  const { accessToken, contentVersionId } = props; // Destructure props 


  const instanceUrl = 'https://resilient-goat-rvo02o-dev-ed.my.salesforce.com';

  const handleDownload = async () => {
    console.log('contentVersionId = ', contentVersionId);
    console.log('Attempting to download file with ContentVersionId:', contentVersionId);
    try {
      const response = await axios({
        method: 'get',
        url: `${instanceUrl}/services/data/v56.0/sobjects/ContentVersion/${contentVersionId}/VersionData`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // To handle binary data
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', '.pdf'); // You might want to give a more meaningful name
      document.body.appendChild(fileLink);

      fileLink.click();

      document.body.removeChild(fileLink);
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error during file download', error);
    }
  };

  return (
    <button onClick={() => handleDownload()}>
      Download File 
    </button>
  );
};

export default SalesforceFileDownloader;
