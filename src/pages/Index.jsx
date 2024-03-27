import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
const SUPABASE_URL = "https://vdnhjxmsuykhvhnvjupi.supabase.co";
const SUPABASE_API_KEY = "YOUR_SUPABASE_API_KEY";

const Index = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions?order=created_at.desc`, {
        headers: {
          apikey: SUPABASE_API_KEY,
          Authorization: `Bearer ${SUPABASE_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Transaction App
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h2" size="lg" marginBottom={2}>
            Transactions
          </Heading>
          {transactions.length === 0 ? (
            <Text>No transactions found.</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Category</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.date}</Td>
                    <Td>{transaction.amount}</Td>
                    <Td>{transaction.type}</Td>
                    <Td>{transaction.category}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
