import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Heading,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  Button,
  HStack,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import AdminComplaintDetailModal from './AdminUpdateDetailModal';
import { AdminContext } from '../context/AdminContext';
import moment from 'moment';
import * as XLSX from 'xlsx';
import axios from 'axios';

const AdminCompleteComplaints = () => {
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { allEmployeeComplaints, setAllEmployeeComplaints } = useContext(AdminContext);

  const formatDate = (dateString) => moment(dateString).format('MMMM D, YYYY h:mm A');

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

  // Fetch closed complaints dynamically
  useEffect(() => {
    const fetchClosedComplaints = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/complaints/closed');
        setAllEmployeeComplaints(data.allComplaints);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching closed complaints:', error);
        setLoading(false);
      }
    };
    fetchClosedComplaints();
  }, [setAllEmployeeComplaints]);

  const closedComplaints = allEmployeeComplaints?.filter((com) => com.status === 'Closed') || [];

  return (
    <Box fontFamily="'Nunito', sans-serif" p={6} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={6} color="teal.600">
        Closed Complaints
      </Heading>

      <HStack justify="flex-end" mb={4}>
        <Button colorScheme="teal" onClick={handleExportExcel}>
          Export as Excel
        </Button>
      </HStack>

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" color="teal.500" />
        </Box>
      ) : (
        <Box overflowX="auto">
          <TableContainer bg="white" borderRadius="lg" boxShadow="md" minW="900px">
            <Table variant="striped" size="md" w="100%">
              <Thead bg="teal.500">
                <Tr>
                  <Th color="white" isTruncated>Complaint Id</Th>
                  <Th color="white" isTruncated>Assets Type</Th>
                  <Th color="white" whiteSpace="normal">Complaint Text</Th>
                  <Th color="white" isTruncated>Location</Th>
                  <Th color="white" isTruncated>Sublocation</Th>
                  <Th color="white" whiteSpace="normal">Created Date</Th>
                  <Th color="white">Status</Th>
                  <Th color="white" textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {closedComplaints.length > 0 ? (
                  closedComplaints.map((complaint) => (
                    <Tr
                      key={complaint.complaint_id}
                      _hover={{ bg: 'gray.50', transform: 'scale(1.01)' }}
                      transition="all 0.2s"
                    >
                      <Td isTruncated maxW="120px">{complaint.complaint_id}</Td>
                      <Td isTruncated maxW="150px">{complaint.complaint_asset}</Td>
                      <Td wordBreak="break-word" maxW="300px">{complaint.complain_details}</Td>
                      <Td isTruncated maxW="120px">{complaint.employee_location}</Td>
                      <Td isTruncated maxW="120px">{complaint.employee_sublocation}</Td>
                      <Td whiteSpace="normal">{formatDate(complaint.created_date)}</Td>
                      <Td>
                        <Tag colorScheme={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Tag>
                      </Td>
                      <Td textAlign="center">
                        <Tooltip label="View Complaint Details" hasArrow>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            onClick={() => handleViewDetails(complaint)}
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                          >
                            View
                          </Button>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={8} textAlign="center">
                      No closed complaints at the moment.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {currentComplaint && (
        <AdminComplaintDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          complaintDetail={currentComplaint}
          onAssign={handleAssign}
        />
      )}
    </Box>
  );
};

export default AdminCompleteComplaints;
    