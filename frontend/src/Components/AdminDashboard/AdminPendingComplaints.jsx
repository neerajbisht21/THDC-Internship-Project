import React, { useContext, useState } from 'react';
import {
  Box, Table, Heading, Thead, Tbody, Tr, Th, Td, TableContainer, Tag, Button
} from '@chakra-ui/react';
import AdminComplaintDetailModal from './AdminUpdateDetailModal';
import { AdminContext } from '../context/AdminContext';
import moment from 'moment';

const AdminPendingComplaints = () => {
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM D, YYYY h:mm A'); // e.g., July 22, 2024 7:19 AM
  };

  const handleViewDetails = (complaint) => {
    setCurrentComplaint(complaint);
    setIsModalOpen(true);
  };

  const { allEmployeeComplaints } = useContext(AdminContext);

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

  return (
    <>
      <Box
        p={5}
        fontFamily="'Nunito', sans-serif"
        maxW="100vw"
        overflowX="auto"
        bg="gray.50"
        maxH="90vh"         // Added max height to restrict height
        overflowY="auto"    // Added vertical scroll if content overflows
      >
        <Heading as="h1" textAlign="center" mb={14} color="teal.500">
          Pending Complaints
        </Heading>
        <Box overflowX="auto">
          <TableContainer
            bg="white"
            borderRadius="md"
            boxShadow="md"
            maxW="100%"
          >
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Assets Type</Th>
                  <Th>Location</Th>
                  <Th>Sublocation</Th>
                  <Th>Created Date</Th>
                  <Th>Assigned To</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allEmployeeComplaints &&
                  allEmployeeComplaints
                    .filter((com) => com.status === 'Processing')
                    .map((complaint) => (
                      <Tr key={complaint.complaint_id}>
                        <Td>{complaint.complaint_asset}</Td>
                        <Td>{complaint.employee_location}</Td>
                        <Td>{complaint.employee_sublocation}</Td>
                        <Td>{formatDate(complaint.created_date)}</Td>
                        <Td>{complaint.attended_by?.name || 'N/A'}</Td>
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

export default AdminPendingComplaints;
