import React, { useContext, useState } from 'react';
import {
  Box, Table, Thead, Heading, Tbody, Tr, Th, Td,
  TableContainer, Tag, Button
} from '@chakra-ui/react';
import AdminComplaintDetailModal from './AdminUpdateDetailModal';
import { AdminContext } from '../context/AdminContext';
import moment from 'moment';
import * as XLSX from 'xlsx';

const AdminCompleteComplaints = () => {
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) =>
    moment(dateString).format('MMMM D, YYYY h:mm A');

  const { allEmployeeComplaints } = useContext(AdminContext);

  const handleViewDetails = (complaint) => {
    setCurrentComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleAssign = (assignedTo) => {
    console.log(`Assigned to: ${assignedTo}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Opened':
        return 'green';
      case 'Closed':
        return 'red';
      case 'Processing':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const handleExportExcel = () => {
    if (!allEmployeeComplaints) return;

    const filteredData = allEmployeeComplaints
      .filter((com) => com.status === 'Closed')
      .map((complaint) => ({
        'Complaint Id': complaint.complaint_id,
        'Assets Type': complaint.complaint_asset,
        'Complaint Text': complaint.complain_details,
        Location: complaint.employee_location,
        Sublocation: complaint.employee_sublocation,
        'Created Date': formatDate(complaint.created_date),
        Status: complaint.status,
      }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Closed Complaints');
    XLSX.writeFile(workbook, 'Closed_Complaints.xlsx');
  };

  return (
    <>
      <Box
        p={5}
        fontFamily="'Nunito', sans-serif"
        maxW="100vw"
        maxH="90vh"
        overflowY="auto"
        bg="gray.50"
      >
        <Heading as="h1" textAlign="center" mb={4} color="teal.500">
          Closed Complaints
        </Heading>

        <Box  mb={4}>
          <Button colorScheme="teal" onClick={handleExportExcel}>
            Export as Excel
          </Button>
        </Box>

        <TableContainer
          bg="white"
          borderRadius="md"
          boxShadow="md"
          maxW="100%"
        >
          <Table variant="simple">
            <Thead bg="gray.100">
              <Tr>
                <Th>Complaint Id</Th>
                <Th>Assets Type</Th>
                <Th>Complaint Text</Th>
                <Th>Location</Th>
                <Th>Sublocation</Th>
                <Th>Created Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allEmployeeComplaints &&
                allEmployeeComplaints
                  .filter((com) => com.status === 'Closed')
                  .map((complaint) => (
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
                      <Td>
                        <Button
                          onClick={() => handleViewDetails(complaint)}
                          colorScheme="blue"
                          size="sm"
                        >
                          View
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {currentComplaint && (
        <AdminComplaintDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          complaintDetail={currentComplaint}
          onAssign={handleAssign}
        />
      )}
    </>
  );
};

export default AdminCompleteComplaints;
