import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const TransactionModal = ({ isOpen, onClose, transaction, onUpdate }) => {
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction ? { ...transaction, id: transaction.id } : {});

  const handleChange = (e) => {
    setUpdatedTransaction({ ...updatedTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(updatedTransaction);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={updatedTransaction.date || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={updatedTransaction.amount || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={updatedTransaction.type || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={updatedTransaction.category || ""} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
