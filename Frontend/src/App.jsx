// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './component/Authentication/Signup.jsx';
import Login from './component/Authentication/Login.jsx';
import ForgotPassword from './component/Authentication/ForgotPassword';
import EnterOtp from './component/Authentication/EnterOtp';
import ResetPassword from './component/Authentication/ResetPassword';
import ResidentManagement from './component/ResidentManagement';
import Dashboard from './component/Dashboard';
import FinancialManagementOtherIncome from './component/FinancialManagementOtherIncome';
import FinancialManagementExp from './component/FinancialManagementExp';
import FinancialManagementNote from './component/FinancialManagementNote';
import FinancialManagementIncome from './component/FinancialManagementIncome';
import FacilityManagement from './component/FacilityManagement';
import ComplaintTracking from './component/CreateComplaint';
import RequestTracking from './component/RequestTracking';
import DetailTracking from './component/VisitorsLogs';
import SecurityProtocols from './component/SecurityProtocols';
import SecurityGaurd from './component/SecurityGaurd';
import Announcement from './component/Announcement';
import VisitorsTracking from './component/Security/VisitorsTracking';
import EmergencyManagement from './component/Security/EmergencyManagement';
import Profile from './component/Profile';
import EditProfile from './component/EditProfile'
import PersonalDetail from './component/Resident/PersonalDetail';
import TenantPersonalDetails from './component/TenantPersonalDetails';
import ServiceComplaint from './component/Resident/ServiceComplaint.jsx';
import RequestSubmission from './component/RequestSubmission.jsx';
import EventParticipation from './component/Resident/EventParticipation.jsx';
import ActivityParticipation from './component/Resident/ActivityParticipation.jsx';
import MaintenanceInvoices from './component/Resident/MaintenanceInvoices.jsx';
import SecurityProtocolsResident from './component/SecurityProtocolsResident';
import ViewInvoice from './component/ViewInvoice.jsx';
import OtherIncomeInvoices from './component/Resident/OtherIncomeInvoice.jsx';
import Polls from './component/Resident/Polls.jsx';
import Access from './component/Resident/Access.jsx';
import CommunitiesDiscussion from './component/Resident/CommunitiesDiscussion.jsx';
import CommunityQuestion from './component/Resident/CommunityQuestion.jsx';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import TenantForm from './component/TenantForm.jsx';
import OwnerForm from './component/OwnerForm.jsx';



function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Routes >
          {/* Authentication */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/residentmanagement' element={<ResidentManagement />} />
          <Route path='/tenant-form' element={<TenantForm />} />
          <Route path="/ownerform" element={<OwnerForm />} />
          <Route path="/Financial-Maintenance" element={<FinancialManagementIncome />} />
          <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
          <Route path="/Expense" element={<FinancialManagementExp />} />
          <Route path="/Note" element={<FinancialManagementNote />} />
          <Route path="/facility-management" element={<FacilityManagement />} />
          <Route path="/create-complaint" element={<ComplaintTracking />} />
          <Route path="/request-tracking" element={<RequestTracking />} />
          <Route path="/visitors-log" element={<DetailTracking />} />
          <Route path="/security-protocols" element={<SecurityProtocols />} />
          <Route path="/security-guard" element={<SecurityGaurd />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path='/visitor-tracking' element={<VisitorsTracking />} />
          <Route path='/emergency-management' element={<EmergencyManagement />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/EditProfile' element={<EditProfile />} />
          <Route path='/personal-details' element={<PersonalDetail />} />
          <Route path='/personal-details-tenant' element={<TenantPersonalDetails />} />
          <Route path='/service-and-complaint' element={<ServiceComplaint />} />
          <Route path='/request-and-submission' element={<RequestSubmission />} />
          <Route path='/events-and-participation' element={<EventParticipation />} />
          <Route path='/activity-and-participation' element={<ActivityParticipation />} />
          <Route path='/maintenance-invoices' element={<MaintenanceInvoices />} />
          <Route path='/other-income-nvoice' element={<OtherIncomeInvoices />} />
          

          <Route path='/security-Protocol' element={<SecurityProtocolsResident />} />

          <Route path='/view-invoice' element={<ViewInvoice />} />
          <Route path='/Polls' element={<Polls />} />
          <Route path='/Community-Discussion' element={<CommunitiesDiscussion />} />
          <Route path='/Community-Question' element={<CommunityQuestion />} />



          <Route path='/Access' element={<Access />} />

        </Routes>
        <Toaster />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
