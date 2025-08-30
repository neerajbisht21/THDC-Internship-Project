import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  SimpleGrid,
  useToast,
  Button,
  Divider,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import { AdminContext } from "../context/AdminContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { assignComplaintsToWorkers } from "../../Redux/Actions/ComplaintAction";
import { ASSIGN_COMPLAINT_TO_WORKERS_RESET } from "../../Redux/ActionType";
import Select from "react-select";

const MotionBox = motion(Box);

const AdminComplaintDetailModal = ({ isOpen, onClose, complaintDetail }) => {
  const [empId, setEmpId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { workers } = useContext(AdminContext);
  const { loading: isAssignedLoading, isAssigned } = useSelector(
    (state) => state.assignComplaint
  );

  const handleAssign = (e) => {
    e.preventDefault();
    if (!empId) {
      toast({
        title: "Please select a worker",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch(assignComplaintsToWorkers(complaintDetail._id, empId.value));
  };

  useEffect(() => {
    if (isAssigned) {
      onClose();
      toast({
        title: "Complaint Assigned Successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: ASSIGN_COMPLAINT_TO_WORKERS_RESET });
      navigate("/admin/status/new-complaints");
    }
  }, [isAssigned]);

  const formatDate = (dateString) =>
    moment(dateString).format("MMMM D, YYYY h:mm A");

  const workerOptions =
    workers?.map((w) => ({
      value: w._id,
      label: w.employee_name,
    })) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent
        w="90%"
        maxW="900px"
        h="75vh"
        borderRadius="xl"
        bgGradient="linear(to-tr, teal.50, teal.100)"
        overflow="hidden"
        fontFamily="'Nunito', sans-serif"
        boxShadow="2xl"
      >
        <ModalHeader
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-r, teal.400, teal.600)"
          color="white"
          py={4}
          borderRadius="xl  xl 0 0"
        >
          Complaint Details
        </ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody p={6} overflowY="auto">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {[
              { label: "Complaint Id", value: complaintDetail.complaint_id },
              { label: "Employee Id", value: complaintDetail.employee_id.employee_id },
              { label: "Employee Name", value: complaintDetail.employee_id.employee_name },
              { label: "Department", value: complaintDetail.employee_id.employee_department },
              { label: "Asset Type", value: complaintDetail.complaint_asset },
              { label: "Mobile No", value: complaintDetail.employee_phoneNo },
              { label: "Location", value: complaintDetail.employee_location },
              { label: "Submitted At", value: formatDate(complaintDetail.created_date) },
              { label: "Status", value: complaintDetail.status, isStatus: true },
              complaintDetail.status === "Closed" && complaintDetail.closed_date
                ? { label: "Closed Date", value: formatDate(complaintDetail.closed_date) }
                : null,
            ]
              .filter(Boolean)
              .map((item, idx) => (
                <MotionBox
                  key={idx}
                  p={3}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">{item.label}:</Text>
                    {item.isStatus ? (
                      <Tag
                        colorScheme={complaintDetail.status === "Closed" ? "orange" : "teal"}
                        size="md"
                        borderRadius="full"
                      >
                        {item.value}
                      </Tag>
                    ) : (
                      <Text>{item.value}</Text>
                    )}
                  </Flex>
                </MotionBox>
              ))}

            <MotionBox
              gridColumn="span 2"
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
            >
              <Text fontWeight="bold" mb={1}>
                Complaint Details:
              </Text>
              <Text whiteSpace="pre-line">{complaintDetail.complain_details}</Text>
            </MotionBox>
          </SimpleGrid>

          <Divider my={6} />

          <Box mb={6}>
            <Text fontWeight="bold" mb={2}>
              Assign To:
            </Text>
            {complaintDetail.status === "Opened" ? (
              <Select
                options={workerOptions}
                value={empId}
                onChange={(selected) => setEmpId(selected)}
                placeholder="Search & select worker"
                isSearchable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "8px",
                    borderColor: "#CBD5E0",
                  }),
                }}
              />
            ) : (
              <Text p={2} bg="white" borderRadius="md" boxShadow="md">
                {complaintDetail.attended_by?.name || "N/A"}
              </Text>
            )}
          </Box>

          {complaintDetail.feedback && (
            <MotionBox
              mb={4}
              p={3}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Text fontWeight="bold" mb={1}>
                Feedback:
              </Text>
              <Text>{complaintDetail.feedback}</Text>
            </MotionBox>
          )}

          {complaintDetail.status === "Opened" && (
            <Box textAlign="right" mt={4}>
              <Button
                colorScheme="teal"
                isLoading={isAssignedLoading}
                size="lg"
                onClick={handleAssign}
                _hover={{ transform: "scale(1.05)" }}
              >
                Assign Complaint
              </Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AdminComplaintDetailModal;
