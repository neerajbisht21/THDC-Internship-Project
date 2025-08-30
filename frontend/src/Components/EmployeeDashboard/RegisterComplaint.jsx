import React, { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { registerComplaint } from '../../Redux/Actions/ComplaintAction';
import { REGISTER_COMPLAINT_RESET } from '../../Redux/ActionType';
import { useNavigate } from 'react-router-dom';

const RegisterComplaint = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [employee_location, setEmployee_location] = useState('');
  const [employee_sublocation, setEmployee_sublocation] = useState('');
  const [complaint_asset, setComplaint_asset] = useState('');
  const [customAsset, setCustomAsset] = useState('');
  const [employee_phoneNo, setEmployee_phoneNo] = useState('');
  const [complain_details, setComplain_details] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const assetToSend = complaint_asset === 'Other' ? customAsset : complaint_asset;

    if (!employee_location || !employee_sublocation || !complaint_asset || !complain_details || !employee_phoneNo) {
      toast({
        title: 'Please fill all the details',
        status: 'error',
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
      });
      setComplain_details('');
      setEmployee_phoneNo('');
      setComplaint_asset('');
      setCustomAsset('');
      setEmployee_location('');
      setEmployee_sublocation('');
      dispatch({ type: REGISTER_COMPLAINT_RESET });
      navigate('/employee/status/open-complaints');
    }
  }, [isRegisteredComplaint, dispatch, navigate, toast]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, teal.50, teal.700)"
      py={8}
      px={{ base: 4, md: 12 }}
      fontFamily="'Nunito', sans-serif"
      display="flex"
      justifyContent="center"
    >
      <Box
        w={{ base: '100%', md: '700px' }}
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        p={{ base: 6, md: 10 }}
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.600">
          Register a Complaint
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={5} align="stretch" maxH="75vh" overflowY="auto" pr={2}>
            {/* Employee Location */}
            <FormControl isRequired>
              <FormLabel>Employee Location</FormLabel>
              <RadioGroup
                value={employee_location}
                onChange={(value) => {
                  setEmployee_location(value);
                  setEmployee_sublocation('');
                }}
              >
                <VStack align="start">
                  <Radio value="Tehri">Tehri</Radio>
                  <Radio value="Koteshwar">Koteshwar</Radio>
                </VStack>
              </RadioGroup>
            </FormControl>

            {/* Sub-location */}
            {employee_location && (
              <FormControl isRequired>
                <FormLabel>Select Sub-Location</FormLabel>
                <RadioGroup value={employee_sublocation} onChange={setEmployee_sublocation}>
                  <VStack align="start">
                    {employee_location === 'Tehri' && (
                      <>
                        <Radio value="Koti">Koti</Radio>
                        <Radio value="Bhagirathipuram">Bhagirathipuram</Radio>
                        <Radio value="New Tehri">New Tehri</Radio>
                      </>
                    )}
                    {employee_location === 'Koteshwar' && (
                      <>
                        <Radio value="Power House">Power House</Radio>
                        <Radio value="Admin Block">Admin Block</Radio>
                        <Radio value="Water Sports Academy">Water Sports Academy</Radio>
                      </>
                    )}
                  </VStack>
                </RadioGroup>
              </FormControl>
            )}

            {/* Asset */}
            <FormControl isRequired>
              <FormLabel>Asset</FormLabel>
              <Select value={complaint_asset} onChange={(e) => setComplaint_asset(e.target.value)}>
                <option value="" disabled hidden>Select Asset</option>
                <option value="THDC Desktop">THDC Desktop</option>
                <option value="THDC UPS">THDC UPS</option>
                <option value="THDC Printer">THDC Printer</option>
                <option value="THDC Scanner">THDC Scanner</option>
                <option value="Other">Other</option>
              </Select>
              {complaint_asset === 'Other' && (
                <Input
                  mt={2}
                  placeholder="Enter custom asset"
                  value={customAsset}
                  onChange={(e) => setCustomAsset(e.target.value)}
                />
              )}
            </FormControl>

            {/* Mobile Number */}
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                maxLength={10}
                minLength={10}
                value={employee_phoneNo}
                onChange={(e) => setEmployee_phoneNo(e.target.value.replace(/\D/g, ''))}
              />
            </FormControl>

            {/* Complaint Details */}
            <FormControl isRequired>
              <FormLabel>Complaint Details</FormLabel>
              <Textarea
                value={complain_details}
                onChange={(e) => setComplain_details(e.target.value)}
                placeholder="Describe your complaint in detail"
                minH="150px"
              />
            </FormControl>

            {/* Submit Button */}
            <Button
              isLoading={isComplaintLoading}
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
              borderRadius="md"
            >
              Submit Complaint
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterComplaint;
