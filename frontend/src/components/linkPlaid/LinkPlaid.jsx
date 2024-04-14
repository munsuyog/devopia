import {useEffect, useState} from 'react'
import axios from 'axios';
import {usePlaidLink} from "react-plaid-link";
import Cookies from 'js-cookie';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
// import './App.css'

axios.defaults.baseURL ="http://localhost:8000"

function PlaidAuth({publicToken}) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {public_token: publicToken});
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, []);
  return (
    <>
      {account ? (
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text>Linked Successfully...</Text>
        </Flex>
    </Box>
      ) : (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text>Loading...</Text>
        </Flex>
    </Box>
      )}
    </>
  );  
}

function LinkPlaid() {
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
    },
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
        <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text>Please link your bank/demat account to retrive data:</Text>
        <Button onClick={() => open()} disabled={!ready}>
        Link Account
      </Button>
        </Flex>
    </Box>
  );
}

export default LinkPlaid