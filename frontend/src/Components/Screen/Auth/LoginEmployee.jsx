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
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../Redux/Actions/AuthAction';

const MotionBox = motion(Box);
const MotionText = motion(Text);

// Function to generate slightly distorted captcha
const generateCaptcha = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    result += randomChar;
  }
  return result;
};

const LoginEmployee = () => {
  const [show, setShow] = useState(false);
  const [employee_id, setEmployee_id] = useState('');
  const [employee_password, setEmployee_password] = useState('');
  const [role] = useState('employee');
  const [captcha, setCaptcha] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, isLoggedIn, error } = useSelector(
    (state) => state.login || {}
  );

  useEffect(() => setCaptcha(generateCaptcha()), []);

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
    if (userCaptchaInput !== captcha) {
      setCaptchaError('Captcha code does not match');
      return false;
    }
    setCaptchaError('');
    return true;
  };

  const submitLoginUpForm = () => {
    setShowAlert(false);
    if (!validateCaptcha()) return;
    dispatch(loginUser(employee_id, employee_password, role));
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      if (user.employee_role === 'employee') navigate('/employee');
      else if (user.employee_role === 'admin') navigate('/admin');
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      refreshCaptcha();
    }
  }, [error]);

  const onClose = () => setShowAlert(false);

  return (
    <MotionBox
      w={{ base: '90%', md: '400px' }}
      p={6}
      borderRadius="2xl"
      bg="rgba(255, 255, 255, 0.25)"
      backdropFilter="blur(12px)"
      boxShadow="xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      mx="auto"
    >
      <VStack spacing={5}>
        <MotionText
          as={Heading}
          size="xl"
          color="white"
          fontWeight="bold"
          textAlign="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Login
        </MotionText>

        <FormControl id="employee_id" isRequired>
          <FormLabel color="white">User Id</FormLabel>
          <Input
            value={employee_id}
            placeholder="Enter Your User Id"
            onChange={(e) => setEmployee_id(e.target.value)}
            bg="whiteAlpha.900"
            color="black"
            _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel color="white">Password</FormLabel>
          <InputGroup>
            <Input
              value={employee_password}
              type={show ? 'text' : 'password'}
              placeholder="Enter Your Password"
              onChange={(e) => setEmployee_password(e.target.value)}
              bg="whiteAlpha.900"
              color="black"
              _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handlePasswordShow}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Captcha */}
        <MotionBox
          p={3}
          borderRadius="md"
          w="100%"
          textAlign="center"
          fontWeight="bold"
          fontSize="2xl"
          color="white"
          letterSpacing="5px"
          bgGradient="linear(to-r, teal.400, teal.600, teal.500)"
          bgClip="text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'Courier New, monospace',
            letterSpacing: '8px',
            textShadow: '1px 1px 2px black',
          }}
        >
          {captcha}
        </MotionBox>

        <HStack w="100%">
          <FormControl isInvalid={!!captchaError} isRequired flex="1">
            <Input
              placeholder="Enter captcha code"
              value={userCaptchaInput}
              onChange={(e) => setUserCaptchaInput(e.target.value)}
              maxLength={6}
              bg="whiteAlpha.900"
              color="black"
              _focus={{ borderColor: 'teal.400', boxShadow: '0 0 0 1px teal' }}
            />
            {captchaError && (
              <Text color="red.500" fontSize="sm" mt={1}>
                {captchaError}
              </Text>
            )}
          </FormControl>
          <IconButton
            aria-label="Refresh Captcha"
            icon={<RepeatIcon />}
            onClick={refreshCaptcha}
            h="40px"
            colorScheme="teal"
          />
        </HStack>

        {showAlert && error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <Box flex="1">
              <Text fontFamily="Nunito">{error}</Text>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onClose}
            />
          </Alert>
        )}

        <Button
          colorScheme="teal"
          isLoading={loading}
          width="100%"
          mt={4}
          size="lg"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
          onClick={submitLoginUpForm}
        >
          Login
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default LoginEmployee;
