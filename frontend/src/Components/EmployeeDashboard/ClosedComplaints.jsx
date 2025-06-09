import React, { useContext } from 'react';
import {
  Box, Table, Heading, Thead, Tbody, Tr, Th, Td, TableContainer,
  Tag, Button
} from '@chakra-ui/react';
import { EmployeeContext } from '../context/EmployeeContext';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ClosedComplaints = () => {
  const { allMyComplaints } = useContext(EmployeeContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Opened': return 'green';
      case 'Closed': return 'red';
      case 'Processing': return 'yellow';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) =>
    dateString ? moment(dateString).format('MMMM D, YYYY h:mm A') : '';

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

  return (
    <Box p={5} fontFamily="'Nunito', sans-serif" maxW="100vw" bg="gray.50" minH="100vh">
      <Button colorScheme="teal" mb={4} onClick={handleExportExcel}>
        Export as Excel
      </Button>

      <Heading as="h1" textAlign="center" mb={8} color="teal.500">
        Closed Complaints
      </Heading>

      {/* Scrollable area */}
      <Box maxH="70vh" overflowY="auto" px={2}>
        <TableContainer bg="white" borderRadius="md" boxShadow="md" w="100%">
          <Table variant="simple">
            <Thead bg="gray.100" position="sticky" top="0" zIndex="docked">
              <Tr>
                <Th>Assets Type</Th>
                <Th>Complaint Text</Th>
                <Th>Location</Th>
                <Th>Sublocation</Th>
                <Th>Created Date</Th>
                <Th>Closed Date</Th>
                <Th>Feedback</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {closedComplaints?.map((complaint) => (
                <Tr key={complaint.complaint_id}>
                  <Td>{complaint.complaint_asset}</Td>
                  <Td>{complaint.complain_details}</Td>
                  <Td>{complaint.employee_location}</Td>
                  <Td>{complaint.employee_sublocation}</Td>
                  <Td>{formatDate(complaint.created_date)}</Td>
                  <Td>{formatDate(complaint.closed_date)}</Td>
                  <Td>{complaint.feedback}</Td>
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

export default ClosedComplaints;
