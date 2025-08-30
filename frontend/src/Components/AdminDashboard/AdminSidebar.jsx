import React from 'react';
import { Box, Flex, Avatar, Text, VStack, Link, Icon, Divider } from '@chakra-ui/react';
import { FaFolderOpen, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const { user: loginUser } = useSelector((state) => state.login || {});

  const navItems = [
    { to: "/admin", label: "Back To Home", icon: FaFolderOpen },
    { to: "/admin/register-complaint", label: "Register a Complaint", icon: FaFolderOpen },
    { to: "/admin/status/new-complaints", label: "New Complaints", icon: FaHourglassHalf },
    { to: "/admin/status/open-complaints", label: "Pending Complaints", icon: FaCheckCircle },
    { to: "/admin/status/closed-complaints", label: "Closed Complaints", icon: FaTimesCircle },
    { to: "/admin/filterComplaints", label: "Filter Complaints", icon: FaHourglassHalf },
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
        <Avatar
          name={loginUser ? loginUser.employee_name : ""}
          src="/assets/admin-profile.png"
          size="xl"
          mb={4}
        />
        <Text fontSize="lg" fontWeight="bold" color="gray.100">
          {loginUser ? loginUser.employee_name : ""}
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

export default AdminSidebar;
