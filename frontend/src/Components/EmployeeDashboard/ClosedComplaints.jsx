import React, { useContext } from 'react';
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
  Center,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { EmployeeContext } from '../context/EmployeeContext';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ClosedComplaints = () => {
  const { allMyComplaints, loading } = useContext(EmployeeContext);

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

  const closedComplaints = allMyComplaints?.filter(c => c.status === 'Closed');

  const handleExportExcel = () => {
    if (!closedComplaints || closedComplaints.length === 0) {
      alert('No closed complaints to export!');
      return;
    }

    const exportData = closedComplaints.map(c => ({
      'Assets Type': c.complaint_asset,
      'Complaint Text': c.complain_details,
      Location: c.employee_location,
      Sublocation: c.employee_sublocation,
      'Created Date': formatDate(c.created_date),
      'Closed Date': formatDate(c.closed_date),
      Feedback: c.feedback || '',
      Status: c.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Closed Complaints');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Closed_Complaints.xlsx');
  };

  const ComplaintRow = ({ complaint }) => (
    <Tr _hover={{ bg: 'gray.50' }} transition="background 0.2s">
      <Td>{complaint.complaint_asset}</Td>
      <Td maxW="250px" whiteSpace="normal">{complaint.complain_details}</Td>
      <Td>{complaint.employee_location}</Td>
      <Td>{complaint.employee_sublocation}</Td>
      <Td>{formatDate(complaint.created_date)}</Td>
      <Td>{formatDate(complaint.closed_date)}</Td>
      <Td>{complaint.feedback}</Td>
      <Td>
        <Tag colorScheme={getStatusColor(complaint.status)} variant="solid">
          {complaint.status}
        </Tag>
      </Td>
    </Tr>
  );

  return (
    <Box p={6} fontFamily="'Nunito', sans-serif" bg="gray.50" minH="100vh">
      {/* Header */}
      <Flex mb={4} align="center" justify="space-between">
        <Center flex="1">
          <Text fontSize="3xl" fontWeight="bold" color="teal.600">
            Closed Complaints
          </Text>
        </Center>
        <Button
          colorScheme="teal"
          size="md"
          onClick={handleExportExcel}
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          Export as Excel
        </Button>
      </Flex>

      {/* Table */}
      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : closedComplaints && closedComplaints.length > 0 ? (
        <Box maxH="70vh" overflowY="auto" px={2}>
          <TableContainer bg="white" borderRadius="md" boxShadow="md" w="100%">
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead bg="teal.500">
                <Tr>
                  <Th color="white">Assets Type</Th>
                  <Th color="white">Complaint Text</Th>
                  <Th color="white">Location</Th>
                  <Th color="white">Sublocation</Th>
                  <Th color="white">Created Date</Th>
                  <Th color="white">Closed Date</Th>
                  <Th color="white">Feedback</Th>
                  <Th color="white">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {closedComplaints.map(c => (
                  <ComplaintRow key={c.complaint_id} complaint={c} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Center mt={10}>
          <Text fontSize="xl" color="gray.500">No closed complaints found!</Text>
        </Center>
      )}
    </Box>
  );
};

export default ClosedComplaints;
