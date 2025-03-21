import React, { useEffect } from 'react';

const DynamicsForm = () => {
  useEffect(() => {
    // Load the external script when the component is mounted
    const script = document.createElement('script');
    script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormLoader/FormLoader.bundle.js';
    script.async = true;
    script.onload = () => {
      // Additional actions can be placed here if needed when the script is loaded
    };
    document.body.appendChild(script);

    // Set the document language to match the user's browser language
    document.documentElement.lang = navigator.language;

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      data-form-id='99bd152d-1103-f011-bae3-000d3a44bf43'
      data-form-api-url='https://public-eur.mkt.dynamics.com/api/v1.0/orgs/c94c4f48-5ef5-ed11-a80b-000d3a3a0941/landingpageforms'
      data-cached-form-url='https://assets-eur.mkt.dynamics.com/c94c4f48-5ef5-ed11-a80b-000d3a3a0941/digitalassets/forms/99bd152d-1103-f011-bae3-000d3a44bf43'
    ></div>
  );
};

export default DynamicsForm;