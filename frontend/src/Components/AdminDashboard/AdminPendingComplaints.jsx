import React, { useContext, useState, useEffect } from "react";
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
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import AdminComplaintDetailModal from "./AdminUpdateDetailModal";
import { AdminContext } from "../context/AdminContext";
import moment from "moment";
import axios from "axios";

const AdminPendingComplaints = () => {
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { allEmployeeComplaints, setAllEmployeeComplaints } = useContext(AdminContext);

  const formatDate = (dateString) =>
    moment(dateString).format("MMMM D, YYYY h:mm A");

  const handleViewDetails = (complaint) => {
    setCurrentComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleAssign = (assignedTo) => {
    console.log(`Assigned to: ${assignedTo}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Opened":
        return "green";
      case "Processing":
        return "yellow";
      case "Closed":
        return "red";
      default:
        return "gray";
    }
  };

  // Fetch pending complaints from backend dynamically
  useEffect(() => {
    const fetchPendingComplaints = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/complaints/pending"); // backend route
        setAllEmployeeComplaints(data.allComplaints); // save in context
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pending complaints:", error);
        setLoading(false);
      }
    };

    fetchPendingComplaints();
  }, [setAllEmployeeComplaints]);

  const pendingComplaints =
    allEmployeeComplaints?.filter((com) => com.status === "Processing") || [];

  return (
    <>
      <Box
        p={6}
        fontFamily="'Nunito', sans-serif"
        w="100%"
        h="100%"
        bg="gray.50"
      >
        {/* Header */}
        <Heading
          as="h1"
          textAlign="center"
          mb={6}
          color="teal.600"
          fontSize="2xl"
          fontWeight="bold"
        >
          Pending Complaints
        </Heading>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" color="teal.500" />
          </Box>
        ) : (
          <TableContainer
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            overflowX="auto"
          >
            <Table variant="striped" colorScheme="gray" size="sm">
              <Thead bg="teal.500">
                <Tr>
                  <Th color="white">Complaint Id</Th>
                  <Th color="white">Asset Type</Th>
                  <Th color="white">Complaint Text</Th>
                  <Th color="white">Location</Th>
                  <Th color="white">Sublocation</Th>
                  <Th color="white">Created Date</Th>
                  <Th color="white">Status</Th>
                  <Th color="white" textAlign="center">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendingComplaints.length > 0 ? (
                  pendingComplaints.map((complaint) => (
                    <Tr
                      key={complaint.complaint_id}
                      _hover={{ bg: "gray.100" }}
                      transition="background 0.2s"
                    >
                      <Td>{complaint.complaint_id}</Td>
                      <Td>{complaint.complaint_asset}</Td>
                      <Td maxW="250px" whiteSpace="normal">
                        {complaint.complain_details}
                      </Td>
                      <Td>{complaint.employee_location}</Td>
                      <Td>{complaint.employee_sublocation}</Td>
                      <Td>{formatDate(complaint.created_date)}</Td>
                      <Td>
                        <Tag
                          colorScheme={getStatusColor(complaint.status)}
                          variant="solid"
                        >
                          {complaint.status}
                        </Tag>
                      </Td>
                      <Td textAlign="center">
                        <Tooltip label="View Complaint Details" hasArrow>
                          <Button
                            onClick={() => handleViewDetails(complaint)}
                            colorScheme="teal"
                            size="sm"
                            _hover={{ transform: "scale(1.05)" }}
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
                      No pending complaints at the moment.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modal */}
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
