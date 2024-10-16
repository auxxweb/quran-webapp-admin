import React from "react";
import { Route, Routes } from "react-router-dom";
// import Leaves from "../pages/Leaves";
import Attendence from "../pages/Attendence";
import ShiftAndSchedule from "../pages/ShiftAndSchedule";
import ClientDetails from "../pages/ClientDetails";
import ProjectDetailedPage from "../pages/ProjectDetailedPage";
import ProjetsPage from "../pages/ProjetsPage";
import PaymentPage from "../pages/PaymentPage";
import PaySlip from "../PaySlip";
import Subscription from "../Subscription";
// import Department from "../pages/Questions";
import Designation from "../pages/Designation";
import SettingAndConfi from "../pages/SettingAndConfi";
import DeveloperDetails from "../pages/DeveloperDetails";
import DashBoard from "../pages/DashBoard";
import Zones from "../pages/Zones";
import Login from "../pages/Login";
import Judges from "../pages/judges";
import Participants from "../pages/participants";
import Questions from "../pages/Questions";
import Bundles from "../pages/Bundles";

function ContentArea() {
  return (
    <Routes>
      {/* Use Routes to define all your app routes */}
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/zones" element={<Zones />} />
      <Route path="/judges" element={<Judges />} />
      <Route path="/participants" element={<Participants />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/bundles" element={<Bundles />} />
      <Route path="/attendence" element={<Attendence />} />
      <Route path="/shiftsandschedules" element={<ShiftAndSchedule />} />
      <Route path="/clientsdetails" element={<ClientDetails />} />
      <Route path="/detailedprojectpage" element={<ProjectDetailedPage />} />
      <Route path="/projetspage" element={<ProjetsPage />} />
      <Route path="/paymentpage" element={<PaymentPage />} />
      <Route path="/payslip" element={<PaySlip />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/designation" element={<Designation />} />
      <Route path="/settingandconfi" element={<SettingAndConfi />} />
      <Route path="/developerdetails" element={<DeveloperDetails />} />
    </Routes>
  );
}

export default ContentArea;
