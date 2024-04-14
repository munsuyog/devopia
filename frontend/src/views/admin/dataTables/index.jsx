import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, {useState, useEffect} from "react";
import { getInvestments } from "utils/paild";
import { getBalance } from "utils/paild";
import { getTransactions } from "utils/paild";
import { getMonthlySpends } from "functions/transactions";
import { calculateInvestments } from "functions/transactions";

export default function Settings() {
  const [bankToken, setBankToken] = useState(null);
  const [isBankConnected, setBankConnected] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [monthlySpends, setMonthlySpends] = useState(null);
  const [totalInvestments, setTotalInvestments] = useState(null);
  const [investmentLists, setInvestmentLists] = useState([]);
  const [transactionLists, setTransactionLists] = useState([]);
  const [pieData, setPieData] = useState([]);
  // Chakra Color Mode

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
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={investmentLists}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={transactionLists} />
      </SimpleGrid>
    </Box>
  );
}
