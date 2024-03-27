import React, { useState } from "react";
import { Box, Heading, VStack, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const Index = () => {
  const [transactions, setTransactions] = useState([]);

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
            <UnorderedList>
              {transactions.map((transaction, index) => (
                <ListItem key={index}>{transaction}</ListItem>
              ))}
            </UnorderedList>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
