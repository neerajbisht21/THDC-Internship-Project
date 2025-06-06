import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  CloseButton,
  Box,
  Alert,
  AlertIcon,
  Heading,
  Flex,
  HStack,
  IconButton,
  Select,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../Redux/Actions/AuthAction'; // Assuming this handles both admin and employee login
import { useNavigate } from 'react-router-dom';
import { RepeatIcon } from '@chakra-ui/icons';

import loginBg from '../../../assets/login-bg.jpg';

const generateCaptcha = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
const initialState = {
  loading: false,
  user: null,
  error: null,
  isLoggedIn: false,
};

const LoginEmployee = () => {
  const [show, setShow] = useState(false);
  const [employee_id, setEmployee_id] = useState('');
  const [employee_password, setEmployee_password] = useState('');
  const [role, setRole] = useState('employee'); // Added role state default employee
  const [captcha, setCaptcha] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { loading, user, isLoggedIn, error } = useSelector((state) => state.login || {});


  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handlePasswordShow = () => setShow(!show);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptchaInput('');
    setCaptchaError('');
  };

  const validateCaptcha = () => {
    if (!userCaptchaInput.trim()) {
      setCaptchaError('Captcha code is required');
      return false;
    }
    if (userCaptchaInput.toUpperCase() !== captcha) {
      setCaptchaError('Captcha code does not match');
      return false;
    }
    setCaptchaError('');
    return true;
  };

  const submitLoginUpForm = () => {
    setShowAlert(false);
    if (!validateCaptcha()) return;

    // Dispatch login action with role info
    dispatch(loginUser(employee_id, employee_password, role));
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.employee_role === 'employee') {
        navigate('/employee');
      } else if (user.employee_role === 'admin') {
        navigate('/admin');
      }
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      refreshCaptcha();
      setUserCaptchaInput('');
    }
  }, [error]);

  const onClose = () => setShowAlert(false);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.50">
      <Box
        w={{ base: '90%', md: '500px' }}
        p={9}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bgImage={`url(${loginBg})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={1}
          borderRadius={8}
        />

        <VStack spacing={5} color="white" position="relative" zIndex={2}>
          <Heading as="h1" size="lg" mb={6} textAlign="center">
            Login
          </Heading>

          <FormControl id="role" isRequired>
            <FormLabel>Login As</FormLabel>
            <Select
              bg="white"
              color="black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>

          <FormControl id="employee_id" isRequired>
            <FormLabel>User Id</FormLabel>
            <Input
              mb="1rem"
              value={employee_id}
              placeholder="Enter Your User Id"
              onChange={(e) => {
                const value = e.target.value;
                setEmployee_id(value);
                localStorage.setItem('shared_employee_id', value);
              }}
              bg="white"
              color="black"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                value={employee_password}
                mb="1rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter Your Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmployee_password(value);
                  localStorage.setItem('shared_employee_password', value);
                }}
                bg="white"
                color="black"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handlePasswordShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Text
            userSelect="none"
            fontWeight="bold"
            fontSize="2xl"
            letterSpacing="6px"
            bg="gray.200"
            px={8}
            py={3}
            borderRadius="md"
            w="100%"
            textAlign="center"
            mb={2}
            color="black"
          >
            {captcha}
          </Text>

          <HStack w="100%" mb={captchaError ? 0 : 4}>
            <FormControl isInvalid={!!captchaError} isRequired flex="1">
              <Input
                placeholder="Enter captcha code"
                value={userCaptchaInput}
                onChange={(e) => setUserCaptchaInput(e.target.value.toUpperCase())}
                textTransform="uppercase"
                maxLength={6}
                autoComplete="off"
                bg="white"
                color="black"
              />
              {captchaError && (
                <Text color="red.500" fontSize="sm" mt="1">
                  {captchaError}
                </Text>
              )}
            </FormControl>

            <IconButton
              aria-label="Refresh Captcha"
              icon={<RepeatIcon />}
              onClick={refreshCaptcha}
              h="40px"
            />
          </HStack>

          {showAlert && error && (
            <Alert status="error" borderRadius="md" zIndex={2}>
              <AlertIcon />
              <Box flex="1">
                <Text fontFamily="Nunito">{error}</Text>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
            </Alert>
          )}

          <Button
            colorScheme="blue"
            isLoading={loading}
            width="100%"
            mt={4}
            onClick={submitLoginUpForm}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginEmployee;
