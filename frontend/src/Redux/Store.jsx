import { configureStore } from '@reduxjs/toolkit'
import { logOutReducer, loginReducer, registerEmployeeReducer } from './Reducers/AuthReducers'
import {
  assignComplaintToWorkersReducer,
  changeStatusComplaintReducer,
  filterComplaintReducer,
  findAllArrivedComplaintsReducer,
  getAllEmployeeComplaintReducer,
  getAllMyComplaintReducer,
  getAllWorkersListReducer,
  registerComplaintReducer
} from './Reducers/ComplaintReducer'

const rootReducer = {
  login: loginReducer,
  logOutUser: logOutReducer,
  registerUser: registerEmployeeReducer,
  registerComplaint: registerComplaintReducer,
  allMyComplaints: getAllMyComplaintReducer,
  allEmployeeComplaints: getAllEmployeeComplaintReducer,
  allWorkers: getAllWorkersListReducer,
  assignComplaint: assignComplaintToWorkersReducer,
  findAllArrived: findAllArrivedComplaintsReducer,
  changeStatus: changeStatusComplaintReducer,
  filterComplaints: filterComplaintReducer
}
const preloadedState = {
  // optional initial state
}

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
  // No need to define middleware unless you're customizing it
})

export default store
