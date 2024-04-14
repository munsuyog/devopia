import {useEffect, useState} from 'react'
import axios from 'axios';
import {usePlaidLink} from "react-plaid-link";
import Cookies from 'js-cookie';
// import './App.css'

axios.defaults.baseURL ="http://localhost:8000"

function PlaidAuth({publicToken, token, setBankToken, setBankConnected}) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {public_token: publicToken});
      console.log("accessToken", accessToken.data);
      Cookies.set('token', accessToken.data.accessToken)
      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    setBankConnected(true)
    }
    fetchData();
  }, []);
  return (
    <>
      {account ? (
        <>
          <p>Account number: {account.account}</p>
          <p>Routing number: {account.routing}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );  
}

function LinkPlaid({setBankConnected, setBankToken}) {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
    }
    fetch();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
      setToken(public_token)
      // send public_token to server
    },
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken} setBankConnected={setBankConnected} setBankToken={setBankToken} token={token} />) : (
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
  );
}

export default LinkPlaid