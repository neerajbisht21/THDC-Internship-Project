import React from 'react';
import { Box, Text, Image, Button, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import profileImage from '../../../assets/profile.png';
import logo from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';
import loginBg from '../../../assets/login-bg.jpg';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const AuthScreen = () => {
  return (
    <Box
      minH="100vh"
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={10}
      bgImage={`url(${loginBg})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgBlendMode="overlay"
    >
      {/* Logo */}
      <MotionBox
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        mb={6}
      >
        <Image src={logo} alt="Logo" h="100px" />
      </MotionBox>

      {/* Heading */}
      <MotionText
        fontSize={{ base: '3xl', md: '5xl' }}
        fontFamily="Georgia, serif"
        fontWeight="bold"
        color="white"
        textAlign="center"
        mb={10}
        textShadow="2px 2px 4px rgba(0,0,0,0.6)"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Complaint Management System
      </MotionText>

      {/* Login Card */}
      <Flex justify="center" align="center" wrap="wrap" gap={10} w="100%">
        <MotionBox
          whileHover={{ scale: 1.05, boxShadow: '2xl' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          p={6}
          borderRadius="2xl"
          bg="whiteAlpha.800"
          flex="1"
          maxW="300px"
          h="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          cursor="pointer"
        >
          <Image
            src={profileImage}
            alt="Employee Login"
            borderRadius="full"
            w="50%"
            mb={6}
          />
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="black">
            User Login
          </Text>
          <Link to="/authEmployee">
            <Button
              colorScheme="teal"
              size="lg"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            >
              Login
            </Button>
          </Link>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default AuthScreen;
