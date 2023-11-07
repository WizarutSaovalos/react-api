import React, { useState, useEffect } from 'react';

const SalesforceDataComponent = ({ accessToken }) => {
  const [data, setData] = useState(null);
  const instanceUrl = 'https://resilient-goat-rvo02o-dev-ed.my.salesforce.com';

  useEffect(() => {
    console.log('accessToken = ',accessToken);
    if (!accessToken) return;

    const fetchData = async () => {
      const queryUrl = `${instanceUrl}/services/data/v56.0/query?q=SELECT+Name+FROM+Account`;

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

  return (
    <div>
      {data ? (
        <ul>
          {data.map((account, index) => (
            <li key={index}>{account.Name}</li>
          ))}
        </ul>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default SalesforceDataComponent;
