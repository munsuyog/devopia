import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Badge, 
  Progress  
} from "@chakra-ui/react";
import axios from 'axios';
import ReactSpeedometer from "react-d3-speedometer";

const RiskAssessment = () => {
  const [rsi, setRsi] = useState(null);
  console.log(rsi)
  const [stockSymbol, setStockSymbol] = useState("");

  const getRSIFromEndpoint = async (symbol) => {
    const url = 'http://localhost:8000/api/get_rsi'; // Endpoint URL
    try {
      const response = await axios.post(url, { symbol: symbol });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const handleAssessClick = async () => {
    const rsiValue = await getRSIFromEndpoint(stockSymbol);
    setRsi(rsiValue);
  };

  return (
    <div>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        pb={3}
        shadow="md"
        maxWidth="1300px"
        bg="blue.900"
        mt="80px"
        color="white"
      >
        {rsi ? (
            <>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text fontSize="2xl" fontWeight="bold">
                {stockSymbol}
              </Text>
              <Badge colorScheme="green" fontSize="1em">
                <span class="WebRupee">&#x20B9;</span> Market Price
              </Badge>
            </Flex>
    
            <Text mb={2}>Riskometer:</Text>
            <Flex justifyContent="center" alignItems="center">
              <ReactSpeedometer
                maxValue={100}
                value={rsi.rsi}
                startColor="green"
                segments={3}
                endColor="#B30000"
                segmentColors={["green", "orange", "red"]}
                customSegmentStops={[0, 30, 70, 100]}
                customSegmentLabels={[
                  {
                    text: "UNDER BOUGHT",
                    position: "INSIDE",
                    color: "#FFFF",
                    fontSize: "8px",
                  },
                  {
                    text: "NEUTRAL",
                    position: "INSIDE",
                    color: "#FFFF",
                    fontSize: "10px",
                  },
                  {
                    text: "OVERBOUGHT",
                    position: "INSIDE",
                    color: "#FFFF",
                    fontSize: "8px",
                  },
                ]}
              />
            </Flex>
    
            <Progress
              value={rsi}
              style={{ width: "100%" }}
            />
            </>
        ) : (
          <>
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color="gray.50"
                mb='8px'>
                Enter the Symbol of Stocks {"(Eg. TCS)"}
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                mb='24px'
                fontWeight='500'
                size='lg'
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
              />
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                onClick={handleAssessClick}
                mb='24px'>
                Assess
              </Button>
            </FormControl>
          </>
        )}
      </Box>
    </div>
  );
};

export default RiskAssessment;
