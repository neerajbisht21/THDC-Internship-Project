import React from 'react'; 
import { Container, Text, Box, Image, Button, Flex } from '@chakra-ui/react';
import profileImage from '../../../assets/profile.png';
import logo from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';

const AuthScreen = () => {
  return (
    <Container maxW="container.xl" py={10} bg="transparent">
         <Box position="relative" mb={10} height="80px">
  <img
    src={logo}
    alt="Logo"
    style={{
      height: "80px",
      position: "absolute",
      left:-100,
      top: "0%",
      transform: "translateY(-50%)",
    }}
  />
  <Text
    fontSize="5xl"
    fontFamily="Georgia, serif"
    fontWeight="normal"
    color="white"
    textAlign="center"
    position="absolute"
    left="50%"
    transform="translateX(-50%)"
    width="100%"
    top= "20%"
  >
    Complaint Management System
  </Text>
</Box>

      <Flex justify="center" align="center" wrap="wrap" gap={10} w="100%">
        {/* <Box
          p={6}
          borderWidth={1}
          borderRadius="lg"
          overflow="hidden"
          textAlign="center"
          bg="white"
          boxShadow="md"
          flex="1"
          maxW="md"
          h="350px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={profileImage}
            alt="Admin Login"
            borderRadius="full"
            w="50%"
            mb={4}
          />
          <Link to='/authAdmin'>
          <Button colorScheme="red" textColor='white' size="lg">
            Admin Login
          </Button>
          </Link>
        </Box> */}
        <Box
          p={6}
          borderWidth={20}
          borderRadius="xl"
          overflow="hidden"
          textAlign="center"
          bg="transparent"
          boxShadow="md"
          flex="1"
          maxW="sm"
          h="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          border="none"
          
        >
          <Image
            src={profileImage}
            alt="Employee Login"
            borderRadius="full"
            w="60%"
            mb={4}
          />
          <Link to ='/authEmployee'>
          <Button colorScheme="blue" size="lg">
            Login
          </Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default AuthScreen;
