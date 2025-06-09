import React, { useEffect, useState } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, RadioGroup, Radio, Select,
  Textarea, Button, VStack, useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerComplaint } from '../../Redux/Actions/ComplaintAction';
import { useNavigate } from 'react-router-dom';
import { REGISTER_COMPLAINT_RESET } from '../../Redux/ActionType';

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

    const assetToSend = complaint_asset === "Other" ? customAsset : complaint_asset;

    if (!employee_location || !employee_sublocation || !assetToSend || !complain_details || !employee_phoneNo) {
      toast({
        title: 'Please fill all the details',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    dispatch(registerComplaint(employee_location, employee_sublocation, assetToSend, employee_phoneNo, complain_details));
  };

  const { loading: isComplaintLoading, isRegisteredComplaint } = useSelector((state) => state.registerComplaint);

  useEffect(() => {
    if (isRegisteredComplaint) {
      toast({
        title: 'Complaint Registered Successfully',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      setComplain_details("");
      setEmployee_phoneNo("");
      setComplaint_asset("");
      setCustomAsset("");
      setEmployee_location("");
      setEmployee_sublocation("");
      dispatch({ type: REGISTER_COMPLAINT_RESET });
      navigate('/admin/status/new-complaints');
    }
  }, [isRegisteredComplaint, dispatch, navigate, toast]);

  return (
    <Box
      p={8}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      fontFamily="'Nunito', sans-serif"
      maxW="90%"
      mx="auto"
      mt={1}
      mb={10}
      maxH="90vh"
      overflowY="auto"
    >
      <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
        Register a Complaint
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Employee Location</FormLabel>
            <RadioGroup
              value={employee_location}
              onChange={(value) => {
                setEmployee_location(value);
                setEmployee_sublocation("");
              }}
              defaultValue="Tehri"
            >
              <VStack align="start">
                <Radio value="Tehri">Tehri</Radio>
                <Radio value="Koteshwar">Koteshwar</Radio>
              </VStack>
            </RadioGroup>
          </FormControl>

          {employee_location === "Tehri" && (
            <FormControl isRequired>
              <FormLabel>Select Sub-Location</FormLabel>
              <RadioGroup
                value={employee_sublocation}
                onChange={(value) => setEmployee_sublocation(value)}
              >
                <VStack align="start">
                  <Radio value="Koti">Koti</Radio>
                  <Radio value="Bhagirathipuram">Bhagirathipuram</Radio>
                  <Radio value="New Tehri">New Tehri</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
          )}

          {employee_location === "Koteshwar" && (
            <FormControl isRequired>
              <FormLabel>Select Sub-Location</FormLabel>
              <RadioGroup
                value={employee_sublocation}
                onChange={(value) => setEmployee_sublocation(value)}
              >
                <VStack align="start">
                  <Radio value="Power House">Power House</Radio>
                  <Radio value="Admin Block">Admin Block</Radio>
                  <Radio value="Water Sports Academy">Water Sports Academy</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>
          )}

          <FormControl isRequired>
            <FormLabel>Asset</FormLabel>
            <Select
              value={complaint_asset}
              onChange={(e) => setComplaint_asset(e.target.value)}
              placeholder="Select asset"
            >
              <option value="THDC Desktop">THDC Desktop</option>
              <option value="THDC UPS">THDC UPS</option>
              <option value="THDC Printer">THDC Printer</option>
              <option value="THDC Scanner">THDC Scanner</option>
              <option value="Other">Other</option>
            </Select>

            {complaint_asset === "Other" && (
              <Input
                mt={2}
                placeholder="Enter custom asset"
                value={customAsset}
                onChange={(e) => setCustomAsset(e.target.value)}
              />
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <Input
              value={employee_phoneNo}
              onChange={(e) => setEmployee_phoneNo(e.target.value.replace(/\D/g, ''))}
              type="tel"
              placeholder="Enter your mobile number"
              maxLength="10"
              minLength="10"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Complaint Details</FormLabel>
            <Textarea
              value={complain_details}
              onChange={(e) => setComplain_details(e.target.value)}
              placeholder="Describe your complaint in detail"
              minH="100px"
            />
          </FormControl>

          <Button
            isLoading={isComplaintLoading}
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
            mt={3}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AdminRegisterComplaint;
