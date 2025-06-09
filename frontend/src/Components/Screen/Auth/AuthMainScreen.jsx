import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import RegisterEmployee from './RegisterEmployee';
import LoginEmployee from './LoginEmployee';

const AuthMainScreen = () => {
  return (
    <>
      <Container maxW="50%" centerContent>
        <Box
          display={{ base: "block", lg: "flex" }}
          justifyContent={{ base: "none", lg: "center" }}
          alignItems={{ base: "none", lg: "center" }}
          paddingLeft={{ base: "6rem", lg: "5" }}
          bg="transparent"
          w="100%"
          m="20px 0 20px 0"
          borderRadius="lg"
          borderWidth="1px"
          border="none"
        >
          <Text margin={{ base: "0", lg: "0.5rem 10rem" }} fontSize={{ base: "4xl", lg: "4xl" }} fontWeight="bold" fontFamily="Georgia, serif" color="white">
            THDC CMS Portal
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} color='black' borderRadius="lg" borderWidth="1px" >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign up</Tab>
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
        </Box>
      </Container>

    </>
  );
}

export default AuthMainScreen;

