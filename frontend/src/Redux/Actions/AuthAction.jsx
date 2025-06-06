import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_AS_EMPLOYEE_REQUEST,
  REGISTER_AS_EMPLOYEE_SUCCESS,
  REGISTER_AS_EMPLOYEE_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL
} from '../ActionType';

import {
  findArrivedComplaints,
  getAllEmployeeComplaints,
  getAllMyComplaints,
  getAllWorkersList
} from './ComplaintAction';

export const loginUser = (employee_id, employee_password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post("/api/v1/login", { employee_id, employee_password }, config);

    const role = data.user.employee_role;

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    localStorage.setItem("user", JSON.stringify(data.user));

    if (role === "employee") {
      dispatch(getAllMyComplaints());
      dispatch(findArrivedComplaints());
    } else if (role === "admin") {
      dispatch(getAllEmployeeComplaints());
      dispatch(getAllWorkersList());
    } else {
      throw new Error("Invalid user role.");
    }

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
  }
};

// Register Employee
export const RegisterAsEmployee = (
  employee_id,
  employee_name,
  employee_designation,
  employee_department,
  employee_location,
  employee_password,
  employee_email
) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_AS_EMPLOYEE_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.post("/api/v1/register", {
      employee_id,
      employee_name,
      employee_designation,
      employee_department,
      employee_location,
      employee_password,
      employee_email
    }, config);

    dispatch({ type: REGISTER_AS_EMPLOYEE_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({
      type: REGISTER_AS_EMPLOYEE_FAIL,
      payload: error.response?.data?.message || "Registration failed"
    });
  }
};

// Logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    const { data } = await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.message });

  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response?.data?.message || "Logout failed"
    });
  }
};
