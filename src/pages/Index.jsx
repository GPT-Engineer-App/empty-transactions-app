import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TransactionModal from "../components/TransactionModal";
const SUPABASE_URL = "https://vdnhjxmsuykhvhnvjupi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8";

const Index = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/transactions?order=created_at.desc`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction({ ...transaction, id: transaction.id });
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/transactions?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleUpdate = async (updatedTransaction) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/transactions?id=eq.${selectedTransaction.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          date: updatedTransaction.date,
          amount: updatedTransaction.amount,
          type: updatedTransaction.type,
          category: updatedTransaction.category,
        }),
      });
      fetchTransactions();
      onClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
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
                    <Td>
                      <IconButton icon={<FaEdit />} aria-label="Edit" onClick={() => handleEdit(transaction)} mr={2} />
                      <IconButton icon={<FaTrash />} aria-label="Delete" onClick={() => handleDelete(transaction.id)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>
      <TransactionModal isOpen={isOpen} onClose={onClose} transaction={selectedTransaction} onUpdate={handleUpdate} />
    </Box>
  );
};

export default Index;
