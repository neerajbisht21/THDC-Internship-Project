import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import RegisterEmployee from './RegisterEmployee';
import LoginEmployee from './LoginEmployee';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const AuthMainScreen = () => {
  return (
    <Container
      maxW="container.sm"
      centerContent
      mt={10}
      py={8}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* Heading with animation */}
      <MotionBox
        mb={6}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        textAlign="center"
      >
        <MotionText
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          fontFamily="Georgia, serif"
          color="white"
          textShadow="2px 2px 4px rgba(0,0,0,0.7)"
        >
          THDC CMS Portal
        </MotionText>
      </MotionBox>

      {/* Login/Sign Up Tabs with improved glass effect */}
      <MotionBox
        bg="rgba(255, 255, 255, 0.25)"
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        boxShadow="xl"
        w="100%"
        p={{ base: 4, md: 6 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList mb="1em">
            <Tab width="50%" color="black" _selected={{ color: "white", bg: "teal.500" }}>
              Login
            </Tab>
            <Tab width="50%" color="black" _selected={{ color: "white", bg: "teal.500" }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginEmployee />
            </TabPanel>
            <TabPanel>
              <RegisterEmployee />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MotionBox>
    </Container>
  );
};

export default AuthMainScreen;
