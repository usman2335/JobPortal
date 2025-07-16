import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { ModeToggle } from "./components/Toggles/mode-toggle";
import RegisterCandidatePage from "./pages/Register/RegisterCandidatePage";
import RegisterRecruiterPage from "./pages/Register/RegisterRecruiterPage";
import RoleBasedRoute from "./components/Routes/RoleBasedRoute";
import RecruiterHomePage from "./pages/Recruiter/RecruiterHomePage";
import CandidateHomePage from "./pages/Candidate/CandidateHomePage";
import RecruiterLayout from "./Layouts/RecruiterLayout";
import CandidateLayout from "./Layouts/CandidateLayout";
import PostJob from "./pages/Recruiter/PostJob";
import ManageJob from "./pages/Recruiter/ManageJob";
import EditJobPage from "./pages/Recruiter/EditJob";

import { AnimatePresence } from "motion/react";
import FindJob from "./pages/Candidate/FindJob";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<RoleBasedRoute allowedRoles={["recruiter"]} />}>
          <Route
            path="/register/recruiter"
            element={<RegisterRecruiterPage />}
          />
          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<RecruiterHomePage />} />
            <Route path="create-job" element={<PostJob />} />
            <Route path="jobs" element={<ManageJob />} />
            <Route path="edit-job/:id" element={<EditJobPage />} />
          </Route>
        </Route>

        <Route element={<RoleBasedRoute allowedRoles={["candidate"]} />}>
          <Route
            path="/register/candidate"
            element={<RegisterCandidatePage />}
          />
          <Route path="/candidate/" element={<CandidateLayout />}>
            <Route path="find-jobs" element={<FindJob />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ModeToggle />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
