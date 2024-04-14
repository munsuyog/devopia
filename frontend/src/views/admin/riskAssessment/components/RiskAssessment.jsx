import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Progress, Badge } from "@chakra-ui/react";
import ReactSpeedometer from "react-d3-speedometer";
import axios from 'axios'

const RiskAssessment = () => {
  const [rsi, setRsi] = useState(80);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rsi') // replace with your backend API endpoint
      .then(response => {
        setRsi(response.data.rsi);
      })
      .catch(error => {
        console.error('Error fetching RSI:', error);
      });
  }, []);
  const getColorScheme = () => {
    if (rsi < 30) {
      return "green";
    } else if (rsi < 70) {
      return "orange";
    } else {
      return "red";
    }
  };
  const getRSIStatus = () => {
    if (rsi < 30) {
      return "UNDER BOUGHT";
    } else if (rsi < 70) {
      return "NEUTRAL";
    } else {
      return "OVERBOUGHT";
    }
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
        maxWidth="400px"
        bg="blue.900"
        mt="80px"
        color="white"
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Company Name 
          </Text>
          <Badge colorScheme="green" fontSize="1em">
            <span class="WebRupee">&#x20B9;</span> Market Price
          </Badge>
        </Flex>

        <Text mb={2}>Riskometer:</Text>
        <Flex justifyContent="center" alignItems="center">
          {/* <ReactSpeedometer
            maxValue={100}
            value={rsi}
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
          /> */}
        </Flex>

        <Text
          mt={4}
          mb={2}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>RSI: {rsi}</div>
          <div>STATUS: {getRSIStatus()}</div>
        </Text>

        <Progress
          colorScheme={getColorScheme()}
          value={rsi}
          style={{ width: "100%" }}
        />
      </Box>
    </div>
  );
};

export default RiskAssessment;
