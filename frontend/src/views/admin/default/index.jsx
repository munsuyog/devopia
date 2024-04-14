import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { calculateInvestments } from "functions/transactions";
import { getMonthlySpends } from "functions/transactions";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { getInvestments } from "utils/paild";
import { getBalance } from "utils/paild";
import { getTransactions } from "utils/paild";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  columnsDataTransactions
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  const [bankToken, setBankToken] = useState(null);
  const [isBankConnected, setBankConnected] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [monthlySpends, setMonthlySpends] = useState(null);
  const [totalInvestments, setTotalInvestments] = useState(null);
  const [investmentLists, setInvestmentLists] = useState([]);
  const [transactionLists, setTransactionLists] = useState([]);
  const [pieData, setPieData] = useState([]);
  console.log(transactionLists)
  const [balance, setBalance] = useState(null);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        let transactionAmount = 0;

        data.latest_transactions.map((transaction, index) => {
          transactionAmount = transactionAmount + transaction.amount;
        })
        setTransactionLists(data.latest_transactions)
        setTransactions(transactionAmount);
        setMonthlySpends(getMonthlySpends(data.latest_transactions))
      }
      catch(error) {
        console.error(error);
      }
    }

    const fetchInvestments = async () => {
      try {
        const data = await getInvestments();
        console.log(data)
        const formattedData = data.holdings.securities.map(transaction => {
          console.log(transaction)
          const { name, type, close_price, close_price_as_of } = transaction;
          // Format name
          const formattedName = [name, type === 'buy'];
          
          return {
            name: formattedName,
            date: close_price_as_of,
            close_price: close_price
          };
        });
        
        const stockNumbers = data.holdings.total_investment_transactions ?  data.holdings.total_investment_transactions : 0;
        const mutualFunds = data.holdings.securities.filter(security => security.type === "mutual fund");
        const mutualFundsCount = mutualFunds.length;
        setPieData([stockNumbers, mutualFundsCount])
        
        setInvestmentLists(formattedData)
        const investmentAmount = calculateInvestments(data.holdings);
        console.log(data);
        setTotalInvestments(investmentAmount)
      }
      catch(err) {
        console.error(err);
      }
    }
    const fetchBalance = async () => {
      try {
        const data = await getBalance();
        setTotalInvestments(data)
      }
      catch(err) {
        console.error(err);
      }
    }
    fetchBalance();
    fetchTransactions();
    fetchInvestments();
  },[])
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Total Transactions'
          value={`Rs.${transactions}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value={monthlySpends}
        />
        <MiniStatistics name='Net Worth' value={`Rs.${totalInvestments}`} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        
        {transactionLists.length > 0 ? <CheckTable title="Transactions" columnsData={columnsDataTransactions} tableData={transactionLists} /> : ""}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        
        {investmentLists.length > 0 ? (<CheckTable columnsData={columnsDataCheck} tableData={investmentLists} />) : ""}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          {pieData.length > 0 ? <PieCard data={pieData} /> : ""}
        </SimpleGrid>
      </SimpleGrid>
      {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid> */}
    </Box>
  );
}
