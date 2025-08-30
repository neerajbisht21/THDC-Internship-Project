import React, { useContext, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { EmployeeContext } from '../context/EmployeeContext';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../Redux/Actions/AuthAction';
import { LOGIN_RESET, LOGOUT_USER_RESET } from '../../Redux/ActionType';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const EmployeeStats = () => {
  const { allMyComplaints } = useContext(EmployeeContext);
  const dispatch = useDispatch();
  const toast = useToast();

  const { user: lu } = useSelector((state) => state.loginUser || {});
  const { loading: isLoggingOut, isLoggedOut } = useSelector((state) => state.logOutUser);

  useEffect(() => {
    if (isLoggedOut) {
      toast({
        title: 'User Logged Out Successfully!',
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: LOGOUT_USER_RESET });
      dispatch({ type: LOGIN_RESET });
    }
  }, [isLoggedOut, dispatch, toast]);

  const handleLogOut = () => dispatch(logoutUser());

  const today = moment().format('MMMM D, YYYY');

  const lenOpened = allMyComplaints.filter((c) => c.status === 'Opened').length;
  const lenProcessing = allMyComplaints.filter((c) => c.status === 'Processing').length;
  const lenClosed = allMyComplaints.filter((c) => c.status === 'Closed').length;
  const total = allMyComplaints.length;

  const barChartData = {
    labels: ['Total Complaints', 'Total Closed', 'Total Opened', 'Total Processing'],
    datasets: [
      {
        label: 'Count',
        data: [total, lenClosed, lenOpened, lenProcessing],
        backgroundColor: ['#3182CE', '#38A169', '#DD6B20', '#D69E2E'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  // Animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } }),
  };

  const chartVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.8, duration: 0.8 } },
  };

  return (
    <Box p={6} fontFamily="'Nunito', sans-serif" bg="gray.50" minH="100vh">
      {/* Header */}
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
            Hello, {lu?.employee_name || 'User'}
          </Text>
          <Button
            isLoading={isLoggingOut}
            colorScheme="red"
            onClick={handleLogOut}
            mt={2}
            size="sm"
          >
            Logout
          </Button>
        </Box>
        <Text fontSize="xl" fontWeight="semibold">{today}</Text>
      </Flex>

      {/* Stats + Chart */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        {/* Complaint Summary Cards */}
        <VStack spacing={6} flex="1" align="stretch">
          {[ 
            { label: 'Total Complaints', value: total, bg: 'blue.500', tooltip: 'All Complaints recorded' },
            { label: 'Total Closed', value: lenClosed, bg: 'green.500', tooltip: 'Complaints resolved' },
            { label: 'Total Opened', value: lenOpened, bg: 'orange.500', tooltip: 'Still open complaints' },
            { label: 'Total Processing', value: lenProcessing, bg: 'yellow.500', tooltip: 'Currently being processed' },
          ].map((card, idx) => (
            <Tooltip key={card.label} label={card.tooltip} placement="top">
              <MotionBox
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariant}
                p={6}
                bg={card.bg}
                color="white"
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
                transition="all 0.3s"
              >
                <Text fontSize="xl" fontWeight="bold">{card.label}</Text>
                <Text fontSize="3xl" fontWeight="bold">{card.value}</Text>
              </MotionBox>
            </Tooltip>
          ))}
        </VStack>

        {/* Bar Chart */}
        <MotionBox
          flex="2"
          bg="white"
          p={4}
          borderRadius="lg"
          boxShadow="md"
          initial="hidden"
          animate="visible"
          variants={chartVariant}
        >
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
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default EmployeeStats;
