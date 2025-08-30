import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar fixed */}
      <Box w="280px" bg="gray.100" borderRight="1px solid" borderColor="gray.200">
        <AdminSidebar />
      </Box>

      {/* Main content */}
      <Box flex="1" p={6} bg="gray.50" overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminLayout;
