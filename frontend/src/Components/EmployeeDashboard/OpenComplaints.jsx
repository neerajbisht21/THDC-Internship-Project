import React, { useContext } from 'react';
import {
  Box, Table, Thead, Tbody, Heading, Tr, Th, Td, TableContainer, Text, Tag
} from '@chakra-ui/react';
import { EmployeeContext } from '../context/EmployeeContext';
import moment from 'moment';

const OpenComplaints = () => {
  const { allMyComplaints } = useContext(EmployeeContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Opened': return 'green';
      case 'Closed': return 'red';
      case 'Processing': return 'yellow';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM D, YYYY h:mm A');
  };

  return (
    <Box
      p={5}
      fontFamily="'Nunito', sans-serif"
      maxW="100vw"
      bg="gray.50"
      minH="100vh"
    >
      <Heading as="h1" textAlign="center" mb={6} color="teal.500">
        Opened Complaints
      </Heading>

      {/* Scrollable container */}
      <Box maxH="70vh" overflowY="auto" px={2}>
        <TableContainer bg="white" borderRadius="md" boxShadow="md" w="100%">
          <Table variant="simple">
            <Thead bg="gray.100" position="sticky" top="0" zIndex="docked">
              <Tr>
                <Th>Complaint Id</Th>
                <Th>Assets Type</Th>
                <Th>Complaint Text</Th>
                <Th>Location</Th>
                <Th>Sublocation</Th>
                <Th>Created Date</Th>
                <Th>Closed Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allMyComplaints &&
                allMyComplaints
                  .filter((com) => com.status === 'Opened')
                  .map((complaint) => (
                    <Tr key={complaint.complaint_id}>
                      <Td>{complaint.complaint_id}</Td>
                      <Td>{complaint.complaint_asset}</Td>
                      <Td>{complaint.complain_details}</Td>
                      <Td>{complaint.employee_location}</Td>
                      <Td>{complaint.employee_sublocation}</Td>
                      <Td>{formatDate(complaint.created_date)}</Td>
                      <Td>
                        {complaint.closed_date
                          ? formatDate(complaint.closed_date)
                          : (
                            <Text color="orange.500" fontWeight="bold">
                              Under processing
                            </Text>
                          )}
                      </Td>
                      <Td>
                        <Tag colorScheme={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Tag>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default OpenComplaints;
