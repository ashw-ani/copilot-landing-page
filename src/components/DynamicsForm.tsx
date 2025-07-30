import React, { useEffect } from 'react';
import './DynamicsForm.css';

const DynamicsForm = () => {
  useEffect(() => {
    // Load the external script when the component is mounted
    const script = document.createElement('script');
    script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormLoader/FormLoader.bundle.js';
    script.async = true;
    script.onload = () => {
      // Set the document language after script loads
      document.documentElement.lang = navigator.language;
      
      // Add custom styling after form loads
      const formInterval = setInterval(() => {
        const form = document.querySelector('form');
        if (form) {
          form.classList.add('dynamics-custom-form');
          clearInterval(formInterval);
        }
      }, 100);
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="dynamics-form-wrapper">
      <div
        data-form-id='11e88023-246d-f011-b4cb-7ced8d0b2175'
        data-form-api-url='https://public-eur.mkt.dynamics.com/api/v1.0/orgs/c94c4f48-5ef5-ed11-a80b-000d3a3a0941/landingpageforms'
        data-cached-form-url='https://assets-eur.mkt.dynamics.com/c94c4f48-5ef5-ed11-a80b-000d3a3a0941/digitalassets/forms/11e88023-246d-f011-b4cb-7ced8d0b2175'
      ></div>
    </div>
  );
};

export default DynamicsForm;