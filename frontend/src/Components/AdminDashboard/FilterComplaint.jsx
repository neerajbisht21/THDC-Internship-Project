import React, { useContext, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Button,
  HStack,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { AdminContext } from "../context/AdminContext";
import AdminComplaintDetailModal from "./AdminUpdateDetailModal";
import moment from "moment";

const FilterComplaint = () => {
  const { allEmployeeComplaints } = useContext(AdminContext);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterAsset, setFilterAsset] = useState("");
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case "Closed":
        return "red";
      case "Processing":
        return "yellow";
      default:
        return "gray";
    }
  };

  const filteredComplaints = allEmployeeComplaints.filter((complaint) => {
    const matchesStatus = filterStatus
      ? complaint.status === filterStatus
      : true;
    const matchesSearch = searchText
      ? complaint.complain_details
          .toLowerCase()
          .includes(searchText.toLowerCase())
      : true;
    const matchesDate = filterDate
      ? moment(complaint.created_date).isSame(filterDate, "day")
      : true;
    const matchesLocation = filterLocation
      ? complaint.employee_location
          .toLowerCase()
          .includes(filterLocation.toLowerCase())
      : true;
    const matchesAsset = filterAsset
      ? complaint.complaint_asset
          .toLowerCase()
          .includes(filterAsset.toLowerCase())
      : true;

    return (
      matchesStatus &&
      matchesSearch &&
      matchesDate &&
      matchesLocation &&
      matchesAsset
    );
  });

  return (
    <>
      <Box
        p={6}
        fontFamily="'Nunito', sans-serif"
        w="100%"
        h="100%"
        bg="gray.50"
      >
        <Heading
          as="h1"
          textAlign="center"
          mb={6}
          color="teal.600"
          fontSize="2xl"
          fontWeight="bold"
        >
          Filter Complaints
        </Heading>

        {/* Filter Controls */}
        <HStack spacing={4} mb={6} justify="center" flexWrap="wrap">
          <Select
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            w="200px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          >
            <option value="Opened">Opened</option>
            <option value="Processing">Processing</option>
            <option value="Closed">Closed</option>
          </Select>

          <Input
            type="date"
            placeholder="Filter by Date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            w="180px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          />

          <Input
            placeholder="Filter by Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            w="200px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          />

          <Input
            placeholder="Filter by Asset Type"
            value={filterAsset}
            onChange={(e) => setFilterAsset(e.target.value)}
            w="200px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          />

          <Input
            placeholder="Search by complaint text..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            w="300px"
            bg="white"
            borderRadius="md"
            boxShadow="sm"
          />

          <Button
            onClick={() => {
              setFilterStatus("");
              setSearchText("");
              setFilterDate("");
              setFilterLocation("");
              setFilterAsset("");
            }}
            colorScheme="teal"
          >
            Reset
          </Button>
        </HStack>

        {/* Table */}
        <TableContainer
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          overflowX="auto"
        >
          <Table variant="striped" colorScheme="gray" size="sm">
            <Thead bg="teal.500">
              <Tr>
                <Th color="white" maxW="100px">Complaint Id</Th>
                <Th color="white" maxW="120px">Asset Type</Th>
                <Th color="white" maxW="250px">Complaint Text</Th>
                <Th color="white" maxW="150px">Location</Th>
                <Th color="white" maxW="150px">Sublocation</Th>
                <Th color="white" maxW="150px">Created Date</Th>
                <Th color="white" maxW="100px">Status</Th>
                <Th color="white" textAlign="center" maxW="100px">
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <Tr
                    key={complaint.complaint_id}
                    _hover={{ bg: "gray.100" }}
                    transition="background 0.2s"
                  >
                    <Td maxW="100px" isTruncated>{complaint.complaint_id}</Td>
                    <Td maxW="120px" isTruncated>{complaint.complaint_asset}</Td>
                    <Td maxW="250px" whiteSpace="normal">{complaint.complain_details}</Td>
                    <Td maxW="150px" isTruncated>{complaint.employee_location}</Td>
                    <Td maxW="150px" isTruncated>{complaint.employee_sublocation}</Td>
                    <Td maxW="150px" isTruncated>{formatDate(complaint.created_date)}</Td>
                    <Td maxW="100px" isTruncated>
                      <Tag colorScheme={getStatusColor(complaint.status)} variant="solid">
                        {complaint.status}
                      </Tag>
                    </Td>
                    <Td textAlign="center" maxW="100px">
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
                  <Td colSpan={8} textAlign="center" py={6} color="gray.500">
                    No complaints match the filter.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
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

export default FilterComplaint;
