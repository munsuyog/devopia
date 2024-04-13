import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { PlaidApi, Configuration, CountryCode, Products } from 'react-plaid-link';

const LinkPlaid = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const configuration = new Configuration({
      basePath: 'https://sandbox.plaid.com', // or your Plaid API base URL
      baseOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Plaid-Version': '2020-09-14', // or your preferred Plaid API version
        },
      },
    });

    const plaidClient = new PlaidApi(configuration);

    const request = {
      user: {
        client_user_id: 'user-id',
      },
      client_name: 'Plaid Test App',
      products: [Products.Transactions],
      country_codes: [CountryCode.US],
      language: 'en',
      webhook: 'https://sample-web-hook.com',
      redirect_uri: 'https://example.com/callback',
    };

    const fetchLinkToken = async () => {
      try {
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        setLinkToken(createTokenResponse.data.link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
        // Handle error
      }
    };

    fetchLinkToken();

  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const config = {
    token: linkToken || '',
    onSuccess: (publicToken, metadata) => {
      console.log('Plaid Link successful:', { publicToken, metadata });
      // Handle successful Plaid Link integration here
    },
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default LinkPlaid;
