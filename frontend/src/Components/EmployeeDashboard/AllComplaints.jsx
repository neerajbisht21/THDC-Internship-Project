import React, { useContext } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
  Text, Tag, Button
} from '@chakra-ui/react';
import { EmployeeContext } from '../context/EmployeeContext';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AllComplaints = () => {
  const { allMyComplaints } = useContext(EmployeeContext);

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

  const handleExportExcel = () => {
    if (!allMyComplaints || allMyComplaints.length === 0) {
      alert('No complaints to export!');
      return;
    }

    const exportData = allMyComplaints.map(c => ({
      'Complaint Id': c.complaint_id,
      'Assets Type': c.complaint_asset,
      'Complaint Text': c.complain_details,
      Location: c.employee_location,
      Sublocation: c.employee_sublocation,
      'Created Date': formatDate(c.created_date),
      Status: c.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Complaints');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'All_Complaints.xlsx');
  };

  return (
    <Box p={5} fontFamily="'Nunito', sans-serif" maxW="100vw" bg="gray.50" minH="100vh">
      <Button colorScheme="teal" mb={4} onClick={handleExportExcel}>
        Export as Excel
      </Button>
      <Text fontSize="3xl" textAlign="center" fontWeight="bold" mb={4}>All Complaints</Text>
      
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
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allMyComplaints?.map((complaint) => (
                <Tr key={complaint.complaint_id}>
                  <Td>{complaint.complaint_id}</Td>
                  <Td>{complaint.complaint_asset}</Td>
                  <Td>{complaint.complain_details}</Td>
                  <Td>{complaint.employee_location}</Td>
                  <Td>{complaint.employee_sublocation}</Td>
                  <Td>{formatDate(complaint.created_date)}</Td>
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

export default AllComplaints;
