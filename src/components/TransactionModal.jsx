import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const TransactionModal = ({ isOpen, onClose, transaction, onUpdate }) => {
  const [updatedTransaction, setUpdatedTransaction] = useState(transaction);

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
            <Input type="date" name="date" value={transaction?.date || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={transaction?.amount || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={transaction?.type || ""} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Input name="category" value={transaction?.category || ""} onChange={handleChange} />
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
