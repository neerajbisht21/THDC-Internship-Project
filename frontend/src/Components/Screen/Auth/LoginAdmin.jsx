// import React, { useState, useEffect } from 'react';
// import {
//   Text, Button, FormControl, FormLabel, Input, InputGroup,
//   InputRightElement, VStack, CloseButton, Heading, Flex, Box, Alert, AlertIcon, Select,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../../../Redux/Actions/AuthAction'; // Use the combined login action
// import { useNavigate } from 'react-router-dom';

// const LoginAdmin = () => {
//   const [show, setShow] = useState(false);
//   const [employee_id, setEmployee_id] = useState('');
//   const [employee_password, setEmployee_password] = useState('');
//   const [role, setRole] = useState('admin'); // default role admin
//   const [showAlert, setShowAlert] = useState(false);

//   const handlePasswordShow = () => setShow(!show);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedId = localStorage.getItem('shared_employee_id');
//     const storedPassword = localStorage.getItem('shared_employee_password');
//     if (storedId) setEmployee_id(storedId);
//     if (storedPassword) setEmployee_password(storedPassword);
//   }, []);

//   const submitLoginUpForm = () => {
//     dispatch(loginUser(employee_id, employee_password, role));
//   };

//   const { loading, user, isLoggedIn, error } = useSelector((state) => state.login);

//   useEffect(() => {
//     if (isLoggedIn && user) {
//       if (user.employee_role === 'employee') {
//         navigate('/employee');
//       } else if (user.employee_role === 'admin') {
//         navigate('/admin');
//       }
//     }
//   }, [isLoggedIn, user, navigate]);

//   useEffect(() => {
//     if (error) {
//       setShowAlert(true);
//     }
//   }, [error]);

//   const onClose = () => setShowAlert(false);

//   return (
//     <Flex height="100vh" alignItems="center" justifyContent="center" bg="gray.50">
//       <Box w={{ base: '90%', md: '500px' }} p={8} borderWidth={1} borderRadius={8} boxShadow="lg" bg="white">
//         <VStack spacing={5} color="black">
//           <Heading as="h1" size="lg" mb={6} textAlign="center">
//             Login
//           </Heading>

//           <FormControl id="role" isRequired>
//             <FormLabel>Login As</FormLabel>
//             <Select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//             </Select>
//           </FormControl>

//           <FormControl id="employee_id" isRequired>
//             <FormLabel>User Id</FormLabel>
//             <Input
//               mb="1rem"
//               value={employee_id}
//               placeholder="Enter Your User Id"
//               onChange={(e) => {
//                 setEmployee_id(e.target.value);
//                 localStorage.setItem('shared_employee_id', e.target.value);
//               }}
//             />
//           </FormControl>

//           <FormControl id="password" isRequired>
//             <FormLabel>Password</FormLabel>
//             <InputGroup>
//               <Input
//                 value={employee_password}
//                 mb="1rem"
//                 type={show ? 'text' : 'password'}
//                 placeholder="Enter Your Password"
//                 onChange={(e) => {
//                   setEmployee_password(e.target.value);
//                   localStorage.setItem('shared_employee_password', e.target.value);
//                 }}
//               />
//               <InputRightElement width="4.5rem">
//                 <Button h="1.75rem" size="sm" onClick={handlePasswordShow}>
//                   {show ? 'Hide' : 'Show'}
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//           </FormControl>

//           {showAlert && error && error.length > 0 && (
//             <Alert status="error" display="flex" justifyContent="space-between" alignItems="center">
//               <Box display="flex" alignItems="center">
//                 <AlertIcon />
//                 <Text fontFamily="Nunito">{error}</Text>
//               </Box>
//               <CloseButton onClick={onClose} />
//             </Alert>
//           )}

//           <Button
//             colorScheme="blue"
//             isLoading={loading}
//             width="100%"
//             mt={4}
//             onClick={submitLoginUpForm}
//           >
//             Login
//           </Button>
//         </VStack>
//       </Box>
//     </Flex>
//   );
// };

// export default LoginAdmin;
