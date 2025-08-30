import React, { useContext, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Tag,
  Button,
  Heading,
  Center,
  Flex,
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import ComplaintDetailModal from './ComplaintDetailModal';
import { EmployeeContext } from '../context/EmployeeContext';

const ArriveComplaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const { isOpen, onOpen, onClose } = useState(false); // still using state for modal
  const { allMyArrivedComplaints } = useContext(EmployeeContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Opened': return 'green';
      case 'Closed': return 'red';
      case 'Processing': return 'yellow';
      default: return 'gray';
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    onOpen();
  };

  const ComplaintRow = ({ complaint }) => (
    <Tr _hover={{ bg: 'gray.50' }} transition="background 0.2s">
      <Td>{complaint.complaint_asset}</Td>
      <Td maxW={{ base: '120px', md: '200px' }} isTruncated>{complaint.complain_details}</Td>
      <Td>{complaint.employee_phoneNo}</Td>
      <Td>{complaint.employee_location}</Td>
      <Td>{complaint.employee_sublocation}</Td>
      <Td>
        <Tag colorScheme={getStatusColor(complaint.status)} variant="solid">
          {complaint.status}
        </Tag>
      </Td>
      <Td>
        <Button
          colorScheme="teal"
          leftIcon={<FaEye />}
          size={{ base: 'xs', md: 'sm' }}
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
          transition="all 0.2s"
          onClick={() => handleViewDetails(complaint)}
        >
          View
        </Button>
      </Td>
    </Tr>
  );

  return (
    <Box p={6} fontFamily="'Nunito', sans-serif" bg="gray.50" minH="100vh" w="100%">
      {/* Header */}
      <Center mb={6}>
        <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} color="teal.600">
          New Complaints
        </Heading>
      </Center>

      {/* Table with responsive horizontal scroll */}
      <Box overflowX="auto">
        <TableContainer bg="white" borderRadius="md" boxShadow="md" minW="700px">
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead bg="teal.500">
              <Tr>
                <Th color="white">Asset Type</Th>
                <Th color="white">Complaint Text</Th>
                <Th color="white">Mobile No</Th>
                <Th color="white">Location</Th>
                <Th color="white">Sublocation</Th>
                <Th color="white">Status</Th>
                <Th color="white" textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allMyArrivedComplaints?.filter(c => c.status === 'Processing').map(c => (
                <ComplaintRow key={c.complaint_id} complaint={c} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          isOpen={isOpen}
          onClose={onClose}
          complaint={selectedComplaint}
        />
      )}
    </Box>
  );
};

export default ArriveComplaints;
