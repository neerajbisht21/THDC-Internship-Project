import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  Box,
  Heading,
  Select,
  Flex,
  CloseButton,
  Alert,
  AlertIcon,
  Stack,
  Text
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterAsEmployee } from '../../../Redux/Actions/AuthAction';

const MotionBox = motion(Box);
const MotionFormControl = motion(FormControl);

const inputVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const RegisterEmployee = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [employee_id, setEmployee_id] = useState('');
  const [employee_name, setEmployee_name] = useState('');
  const [employee_designation, setEmployee_designation] = useState('');
  const [employee_department, setEmployee_department] = useState('');
  const [employee_location, setEmployee_location] = useState('');
  const [employee_email, setEmployee_email] = useState('');
  const [employee_password, setEmployee_password] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [role, setRole] = useState('employee');
  const [showAlert, setShowAlert] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, error, isRegistered } = useSelector((state) => state.registerUser);

  const handlePasswordShow = () => setShow(!show);
  const handleConfirmPasswordShow = () => setShowConfirm(!showConfirm);

  const submitSignUpForm = () => {
    if (
      !employee_id ||
      !employee_name ||
      !employee_designation ||
      !employee_department ||
      !employee_location ||
      !employee_email ||
      !employee_password ||
      !confirm_password
    ) {
      toast({
        title: 'Incomplete Form',
        description: 'Please fill in all the fields.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (employee_password !== confirm_password) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const isWorker = role === "worker"; // set worker flag

    dispatch(
      RegisterAsEmployee(
        employee_id,
        employee_name,
        employee_designation,
        employee_department,
        employee_location,
        employee_password,
        employee_email,
        role,
        isWorker
      )
    );
  };

  useEffect(() => setShowAlert(!!error), [error]);

  useEffect(() => {
    if (isRegistered) {
      toast({
        title: 'User Registered Successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      toast({
        title: 'Please Login Again!',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isRegistered]);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" p={4}>
      <MotionBox
        w={{ base: '95%', md: '480px' }}
        maxH="90vh"
        p={8}
        borderRadius="2xl"
        boxShadow="xl"
        bg="rgba(255, 255, 255, 0.25)"
        backdropFilter="blur(12px)"
        overflowY="auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="lg" textAlign="center" mb={4} color="blackAlpha.800">
            Employee Registration
          </Heading>

          {showAlert && error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box flex="1">
                <Text fontFamily="Nunito">{error}</Text>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
            </Alert>
          )}

          <Stack spacing={3}>
            {[ 
              { label: 'Select Role', type: 'select', value: role, setter: setRole, options: ['employee', 'worker'] },
              { label: 'Employee ID', type: 'text', value: employee_id, setter: setEmployee_id },
              { label: 'Employee Name', type: 'text', value: employee_name, setter: setEmployee_name },
              { label: 'Employee Email', type: 'email', value: employee_email, setter: setEmployee_email },
              { label: 'Employee Designation', type: 'text', value: employee_designation, setter: setEmployee_designation },
              { label: 'Employee Department', type: 'text', value: employee_department, setter: setEmployee_department },
              { label: 'Employee Location', type: 'text', value: employee_location, setter: setEmployee_location },
              { label: 'Password', type: 'password', value: employee_password, setter: setEmployee_password, showState: show, toggleShow: handlePasswordShow },
              { label: 'Confirm Password', type: 'password', value: confirm_password, setter: setConfirm_password, showState: showConfirm, toggleShow: handleConfirmPasswordShow },
            ].map((field, i) => (
              <MotionFormControl key={i} isRequired custom={i} variants={inputVariants} initial="hidden" animate="visible">
                <FormLabel>{field.label}</FormLabel>
                {field.type === 'select' ? (
                  <Select
                    bg="white"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                    ))}
                  </Select>
                ) : field.type === 'password' ? (
                  <InputGroup>
                    <Input
                      type={field.showState ? 'text' : 'password'}
                      placeholder={field.label}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      bg="white"
                      _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={field.toggleShow}>
                        {field.showState ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.label}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    bg="white"
                    _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
                  />
                )}
              </MotionFormControl>
            ))}
          </Stack>

          <Button
            colorScheme="teal"
            width="100%"
            isLoading={loading}
            mt={6}
            size="lg"
            onClick={submitSignUpForm}
            _hover={{ transform: 'scale(1.03)', shadow: 'lg' }}
          >
            Sign Up
          </Button>
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default RegisterEmployee;
