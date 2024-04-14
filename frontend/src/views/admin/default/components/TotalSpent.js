// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.jsx";
import LineChart from "components/charts/LineChart";
import { getMonthlyIncomeAndOutcome } from "functions/transactions";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { getTransactions } from "utils/paild";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function TotalSpent(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [lineChartData, setLineChartData] = useState([]);
  console.log(lineChartData)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        const { summedIncome, summedOutcome } = getMonthlyIncomeAndOutcome(data.latest_transactions);
        const lineChartDataTotalSpent = [
          {
              name: "Income",
              data: summedIncome,
          },
          {
              name: "Outcome",
              data: summedOutcome,
          },
      ];
      setLineChartData(lineChartDataTotalSpent)
      }
      catch(error) {
        console.error(error);
      }
    }
    fetchTransactions();
  },[])

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
            {...rest}>
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            {lineChartData.length > 0 ? (`Rs.${lineChartData[1].data.reduce((acc, val) => acc + val, 0)}`) : ""}
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Total Spent
            </Text>
          </Flex>
          {
  lineChartData.length > 0 ? (
    <Flex align='center'>
      <Icon
        as={IoCheckmarkCircle}
        color={
          lineChartData[0].data.reduce((acc, val) => acc + val, 0) >=
          lineChartData[1].data.reduce((acc, val) => acc + val, 0)
            ? 'green.500'
            : 'red.500'
        }
        me='4px'
      />
      <Text
        color={
          lineChartData[0].data.reduce((acc, val) => acc + val, 0) >=
          lineChartData[1].data.reduce((acc, val) => acc + val, 0)
            ? 'green.500'
            : 'red.500'
        }
        fontSize='md'
        fontWeight='700'
      >
        {
          lineChartData[0].data.reduce((acc, val) => acc + val, 0) >=
          lineChartData[1].data.reduce((acc, val) => acc + val, 0)
            ? 'On track'
            : 'Not on track'
        }
      </Text>
    </Flex>
  ) : ""
}


        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
        {lineChartData.length > 0 ? (          <LineChart
            chartData={lineChartData}
            chartOptions={lineChartOptionsTotalSpent}
          />) : ""}
        </Box>
      </Flex>
    </Card>
  );
}
