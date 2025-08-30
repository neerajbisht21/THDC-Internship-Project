import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  Tag,
  Spinner,
} from '@chakra-ui/react';
import { EmployeeContext } from '../context/EmployeeContext';
import moment from 'moment';

const OpenComplaints = () => {
  const { allMyComplaints } = useContext(EmployeeContext);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) =>
    dateString ? moment(dateString).format('MMMM D, YYYY h:mm A') : '';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Opened': return 'green';
      case 'Closed': return 'red';
      case 'Processing': return 'yellow';
      default: return 'gray';
    }
  };

  const openComplaints =
    allMyComplaints?.filter((c) => c.status === 'Opened') || [];

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [allMyComplaints]);

  return (
    <Box p={6} fontFamily="'Nunito', sans-serif" bg="gray.50" minH="100vh">
      <Heading as="h1" textAlign="center" mb={6} color="teal.500" fontSize="2xl">
        Open Complaints
      </Heading>

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
        </Box>
      ) : openComplaints.length > 0 ? (
        <Box maxH="70vh" overflowY="auto" px={2}>
          <TableContainer bg="white" borderRadius="md" boxShadow="md" w="100%">
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead bg="teal.500">
                <Tr>
                  <Th color="white">Complaint Id</Th>
                  <Th color="white">Asset Type</Th>
                  <Th color="white">Complaint Text</Th>
                  <Th color="white">Location</Th>
                  <Th color="white">Sublocation</Th>
                  <Th color="white">Created Date</Th>
                  <Th color="white">Closed Date</Th>
                  <Th color="white">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {openComplaints.map((complaint) => (
                  <Tr key={complaint.complaint_id} _hover={{ bg: 'gray.100' }} transition="background 0.2s">
                    <Td>{complaint.complaint_id}</Td>
                    <Td>{complaint.complaint_asset}</Td>
                    <Td maxW="250px" whiteSpace="normal">{complaint.complain_details}</Td>
                    <Td>{complaint.employee_location}</Td>
                    <Td>{complaint.employee_sublocation}</Td>
                    <Td>{formatDate(complaint.created_date)}</Td>
                    <Td>
                      {complaint.closed_date ? (
                        formatDate(complaint.closed_date)
                      ) : (
                        <Text color="orange.500" fontWeight="bold">Under processing</Text>
                      )}
                    </Td>
                    <Td>
                      <Tag colorScheme={getStatusColor(complaint.status)} variant="solid">
                        {complaint.status}
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500">No open complaints found!</Text>
        </Box>
      )}
    </Box>
  );
};

export default OpenComplaints;
