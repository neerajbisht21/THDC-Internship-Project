import React, { useContext, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  useToast,
  useDisclosure,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import moment from 'moment';
import { AdminContext } from '../context/AdminContext';
import { logoutUser } from '../../Redux/Actions/AuthAction';
import { LOGIN_RESET, LOGOUT_USER_RESET } from '../../Redux/ActionType';
import { useDispatch, useSelector } from 'react-redux';

const AdminStats = () => {
  const { loading, user: lu, isLoggedIn, error } = useSelector(
    (state) => state.login || {}
  );
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading: isLoggedOutUserLoading, isLoggedOut } = useSelector(
    (state) => state.logOutUser
  );

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isLoggedOut) {
      toast({
        title: 'Admin Logged Out Successfully!',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      dispatch({ type: LOGOUT_USER_RESET });
      dispatch({ type: LOGIN_RESET });
    }
  }, [isLoggedOut]);

  const today = moment().format('MMMM D, YYYY');

  const { allEmployeeComplaints } = useContext(AdminContext);

  const len1 = allEmployeeComplaints.filter((com) => com.status === 'Opened').length;
  const len2 = allEmployeeComplaints.filter((com) => com.status === 'Processing').length;
  const len3 = allEmployeeComplaints.filter((com) => com.status === 'Closed').length;
  const len4 = allEmployeeComplaints.length;

  const barChartData = {
    labels: ['Total Complaints', 'Total Closed', 'Total Opened', 'Total Processing'],
    datasets: [
      {
        label: 'Count',
        data: [len4, len3, len1, len2],
        backgroundColor: ['#3182CE', '#38A169', '#DD6B20', '#D69E2E'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      p={6}
      fontFamily="'Nunito', sans-serif"
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      h="100%"
      w="100%"
    >
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="center"
        p={4}
        bg="teal.500"
        color="white"
        borderRadius="lg"
        mb={6}
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Hello, {lu && lu.employee_name}
          </Text>
          <Button
            isLoading={isLoggedOutUserLoading}
            colorScheme="red"
            onClick={handleLogOut}
            mt={2}
            size="sm"
          >
            Logout
          </Button>
        </Box>
        <Text fontSize="xl" fontWeight="semibold">
          {today}
        </Text>
      </Flex>

      {/* Stats + Chart */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        {/* Complaint Summary Cards */}
        <VStack spacing={6} flex="1" align="stretch">
          <Tooltip label="All Complaints recorded" placement="top">
            <Box
              p={6}
              bg="blue.500"
              color="white"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold">
                Total Complaints
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {len4}
              </Text>
            </Box>
          </Tooltip>

          <Tooltip label="Complaints resolved" placement="top">
            <Box
              p={6}
              bg="green.500"
              color="white"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold">
                Total Closed
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {len3}
              </Text>
            </Box>
          </Tooltip>

          <Tooltip label="Still open complaints" placement="top">
            <Box
              p={6}
              bg="orange.500"
              color="white"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold">
                Total Opened
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {len1}
              </Text>
            </Box>
          </Tooltip>

          <Tooltip label="Currently being processed" placement="top">
            <Box
              p={6}
              bg="yellow.500"
              color="white"
              borderRadius="lg"
              boxShadow="md"
              textAlign="center"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <Text fontSize="xl" fontWeight="bold">
                Total Processing
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {len2}
              </Text>
            </Box>
          </Tooltip>
        </VStack>

        {/* Bar Chart */}
        <Box flex="2" bg="white" p={4} borderRadius="lg" boxShadow="md">
          <Text fontSize="lg" mb={2} textAlign="center" fontWeight="semibold">
            Complaint Counts
          </Text>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'bottom' } },
            }}
            height={250}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminStats;
