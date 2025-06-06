import { Routes, Route } from "react-router-dom";
import AuthMainScreen from "./Components/Screen/Auth/AuthMainScreen";
import AuthScreen from "./Components/Screen/Auth/AuthScreen";
import EmployeeLayout from "./Components/EmployeeDashboard/EmployeeLayout";
import RegisterComplaint from "./Components/EmployeeDashboard/RegisterComplaint";
import AllComplaints from "./Components/EmployeeDashboard/AllComplaints";
import OpenComplaints from "./Components/EmployeeDashboard/OpenComplaints";
import ClosedComplaints from "./Components/EmployeeDashboard/ClosedComplaints";
import ArriveComplaints from "./Components/EmployeeDashboard/ArriveComplaints";
import AdminRegisterComplaint from "./Components/AdminDashboard/AdminRegisterComplaint";
import AdminNewComplaints from "./Components/AdminDashboard/AdminNewComplaints";
import AdminPendingComplaints from "./Components/AdminDashboard/AdminPendingComplaints";
import AdminCompleteComplaints from "./Components/AdminDashboard/AdminCompleteComplaints";
import AdminLayout from "./Components/AdminDashboard/AdminLayout";
import LoginAdmin from "./Components/Screen/Auth/LoginAdmin";
import AdminStats from "./Components/AdminDashboard/AdminStats";
import FilterComplaint from "./Components/AdminDashboard/FilterComplaint";
import EmployeeStats from "./Components/EmployeeDashboard/EmployeeStats";
import backgroundImage from "./assets/background.jpg";

function App() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    padding: "20px",
  };

  return (
    <div style={appStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Routes>
          <Route path="/authEmployee" element={<AuthMainScreen />} />
          <Route path="/" element={<AuthScreen />} />
          <Route path="/authEmployee" element={<LoginAdmin />} />

          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="" element={<EmployeeStats />} />
            <Route path="register-complaint" element={<RegisterComplaint />} />
            <Route path="status/all-complaints" element={<AllComplaints />} />
            <Route path="status/open-complaints" element={<OpenComplaints />} />
            <Route path="status/closed-complaints" element={<ClosedComplaints />} />
            <Route path="arrive-complaints" element={<ArriveComplaints />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminStats />} />
            <Route path="filterComplaints" element={<FilterComplaint />} />
            <Route path="register-complaint" element={<AdminRegisterComplaint />} />
            <Route path="status/new-complaints" element={<AdminNewComplaints />} />
            <Route path="status/open-complaints" element={<AdminPendingComplaints />} />
            <Route path="status/closed-complaints" element={<AdminCompleteComplaints />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
