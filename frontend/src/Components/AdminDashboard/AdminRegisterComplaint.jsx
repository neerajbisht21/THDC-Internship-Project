import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Select,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { registerComplaint } from "../../Redux/Actions/ComplaintAction";
import { useNavigate } from "react-router-dom";
import { REGISTER_COMPLAINT_RESET } from "../../Redux/ActionType";

const AdminRegisterComplaint = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [employee_location, setEmployee_location] = useState("");
  const [employee_sublocation, setEmployee_sublocation] = useState("");
  const [complaint_asset, setComplaint_asset] = useState("");
  const [customAsset, setCustomAsset] = useState("");
  const [employee_phoneNo, setEmployee_phoneNo] = useState("");
  const [complain_details, setComplain_details] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const assetToSend =
      complaint_asset === "Other" ? customAsset : complaint_asset;

    if (
      !employee_location ||
      !employee_sublocation ||
      !assetToSend ||
      !complain_details ||
      !employee_phoneNo
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill all the details before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    dispatch(
      registerComplaint(
        employee_location,
        employee_sublocation,
        assetToSend,
        employee_phoneNo,
        complain_details
      )
    );
  };

  const { loading: isComplaintLoading, isRegisteredComplaint } = useSelector(
    (state) => state.registerComplaint
  );

  useEffect(() => {
    if (isRegisteredComplaint) {
      toast({
        title: "Complaint Registered Successfully",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setComplain_details("");
      setEmployee_phoneNo("");
      setComplaint_asset("");
      setCustomAsset("");
      setEmployee_location("");
      setEmployee_sublocation("");
      dispatch({ type: REGISTER_COMPLAINT_RESET });
      navigate("/admin/status/new-complaints");
    }
  }, [isRegisteredComplaint, dispatch, navigate, toast]);

  return (
    <Box
      p={8}
      bg="white"
      borderRadius="lg"
      boxShadow="xl"
      fontFamily="'Nunito', sans-serif"
      maxW="70%"
      mx="auto"
      mt={5}
      mb={10}
      h="auto"
    >
      <Heading
        as="h1"
        size="xl"
        mb={8}
        textAlign="center"
        color="teal.600"
        fontWeight="extrabold"
      >
        Register a Complaint
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={8} align="stretch">
          {/* Location */}
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Employee Location</FormLabel>
            <RadioGroup
              value={employee_location}
              onChange={(value) => {
                setEmployee_location(value);
                setEmployee_sublocation("");
              }}
            >
              <HStack spacing={8}>
                <Radio value="Tehri" colorScheme="teal">
                  Tehri
                </Radio>
                <Radio value="Koteshwar" colorScheme="teal">
                  Koteshwar
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          {/* Sub Location */}
          {employee_location === "Tehri" && (
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Select Sub-Location</FormLabel>
              <RadioGroup
                value={employee_sublocation}
                onChange={(value) => setEmployee_sublocation(value)}
              >
                <HStack spacing={6} wrap="wrap">
                  <Radio value="Koti" colorScheme="teal">
                    Koti
                  </Radio>
                  <Radio value="Bhagirathipuram" colorScheme="teal">
                    Bhagirathipuram
                  </Radio>
                  <Radio value="New Tehri" colorScheme="teal">
                    New Tehri
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          )}

          {employee_location === "Koteshwar" && (
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Select Sub-Location</FormLabel>
              <RadioGroup
                value={employee_sublocation}
                onChange={(value) => setEmployee_sublocation(value)}
              >
                <HStack spacing={6} wrap="wrap">
                  <Radio value="Power House" colorScheme="teal">
                    Power House
                  </Radio>
                  <Radio value="Admin Block" colorScheme="teal">
                    Admin Block
                  </Radio>
                  <Radio value="Water Sports Academy" colorScheme="teal">
                    Water Sports Academy
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          )}

          {/* Asset */}
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Asset</FormLabel>
            <Select
              value={complaint_asset}
              onChange={(e) => setComplaint_asset(e.target.value)}
              placeholder="Select asset"
              focusBorderColor="teal.500"
            >
              <option value="THDC Desktop">THDC Desktop</option>
              <option value="THDC UPS">THDC UPS</option>
              <option value="THDC Printer">THDC Printer</option>
              <option value="THDC Scanner">THDC Scanner</option>
              <option value="Other">Other</option>
            </Select>

            {complaint_asset === "Other" && (
              <Input
                mt={3}
                placeholder="Enter custom asset"
                value={customAsset}
                onChange={(e) => setCustomAsset(e.target.value)}
                focusBorderColor="teal.500"
              />
            )}
          </FormControl>

          {/* Phone */}
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Mobile Number</FormLabel>
            <Input
              value={employee_phoneNo}
              onChange={(e) =>
                setEmployee_phoneNo(e.target.value.replace(/\D/g, ""))
              }
              type="tel"
              placeholder="Enter your mobile number"
              maxLength="10"
              minLength="10"
              focusBorderColor="teal.500"
            />
          </FormControl>

          {/* Complaint Details */}
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Complaint Details</FormLabel>
            <Textarea
              value={complain_details}
              onChange={(e) => setComplain_details(e.target.value)}
              placeholder="Describe your complaint in detail"
              minH="120px"
              focusBorderColor="teal.500"
            />
          </FormControl>

          <Divider />

          {/* Submit */}
          <Button
            isLoading={isComplaintLoading}
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            mt={4}
            borderRadius="full"
          >
            Submit Complaint
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AdminRegisterComplaint;
