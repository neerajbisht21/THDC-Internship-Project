import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  Link,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  FaRegEdit,
  FaList,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    user: lu,
    isLoggedIn,
  } = useSelector((state) => state.login);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const navItems = [
    { to: "", label: "Back To Home", icon: FaArrowRight },
    { to: "register-complaint", label: "Register a Complaint", icon: FaRegEdit },
    { to: "status/all-complaints", label: "All Complaints", icon: FaList },
    { to: "status/open-complaints", label: "Open Complaints", icon: FaArrowRight },
    { to: "status/closed-complaints", label: "Closed Complaints", icon: FaTimesCircle },
    { to: "arrive-complaints", label: "Arrive Complaints", icon: FaCheckCircle },
  ];

  return (
    <Box
      w="280px"
      p={5}
      bg="gray.900"
      color="white"
      h="100vh"
      boxShadow="xl"
      fontFamily="'Nunito', sans-serif"
    >
      <Flex align="center" mb={6} direction="column">
        <Avatar name={lu ? lu.employee_name : ""} src="/assets/profile.png" size="xl" mb={4} />
        <Text fontSize="lg" fontWeight="bold" color="gray.100">
          {lu && lu.employee_name}
        </Text>
      </Flex>

      <Divider borderColor="gray.600" mb={4} />

      <VStack align="start" spacing={2} w="100%">
        {navItems.map((item, index) => (
          <Link
            key={index}
            as={RouterLink}
            to={item.to}
            display="flex"
            alignItems="center"
            w="100%"
            p={3}
            borderRadius="md"
            transition="all 0.2s"
            _hover={{
              bg: "gray.700",
              transform: "translateX(6px) scale(1.02)",
              color: "teal.300",
              boxShadow: "md",
              borderLeft: "4px solid teal",
            }}
          >
            <Icon as={item.icon} mr={3} boxSize={5} />
            <Text fontWeight="medium">{item.label}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
