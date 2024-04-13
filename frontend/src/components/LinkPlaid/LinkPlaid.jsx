// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const LinkPlaid = () => {
  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    try {
      const response = await fetch('/api/create_link_token', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch link token');
      }
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error generating link token:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  

  useEffect(() => {
    generateToken();
  }, []);

  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};

// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
const Link = (props) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch('/api/set_access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token }),
    });
    // Handle response ...
  }, []);

  const config = {
    token: props.linkToken || '',
    onSuccess,
  };
  

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default LinkPlaid;
