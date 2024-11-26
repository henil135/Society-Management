// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './component/Signup';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import EnterOtp from './component/EnterOtp';
import ResetPassword from './component/ResetPassword';
import ResidentManagement from './component/ResidentManagement';
import Dashboard from './component/Dashboard';
import ResidentForm from './component/ResidentForm';

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
import VisitorsTracking from './component/VisitorsTracking';
import EmergencyManagement from './component/EmergencyManagement';
import Profile from './component/Profile';

import EditProfile from './component/EditProfile'
import PersonalDetail from './component/PersonalDetail';
import TenantPersonalDetails from './component/TenantPersonalDetails';
import ServiceComplaint from './component/ServiceComplaint.jsx';
import RequestSubmission from './component/RequestSubmission.jsx';
import EventParticipation from './component/EventParticipation.jsx';
import ActivityParticipation from './component/ActivityParticipation.jsx';
import MaintenanceInvoices from './component/MaintenanceInvoices.jsx';

import SecurityProtocolsResident from './component/SecurityProtocolsResident';

function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/residentmanagement' element={<ResidentManagement/>}/>
          <Route path='/residentForm' element={<ResidentForm/>}/>
          <Route path="/Financial-Maintenance" element={<FinancialManagementIncome />} />
          <Route path="/Other-Income" element={<FinancialManagementOtherIncome />} />
          <Route path="/Expense" element={<FinancialManagementExp />} />
          <Route path="/Note" element={<FinancialManagementNote />} />
          <Route path="/facility-management" element={<FacilityManagement/>}/>
          <Route path="/create-complaint" element={<ComplaintTracking/>}/>
          <Route path="/request-tracking" element={<RequestTracking/>}/>
          <Route path="/visitors-log" element={<DetailTracking/>}/>
          <Route path="/security-protocols" element={<SecurityProtocols/>}/>
          <Route path="/security-guard" element={<SecurityGaurd/>}/>
          <Route path="/announcement" element={<Announcement/>} />
          <Route path='/visitor-tracking' element={<VisitorsTracking/>}/>
          <Route path='/emergency-management' element={<EmergencyManagement/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/EditProfile' element={<EditProfile/>}/>

          <Route path='/personal-details' element={<PersonalDetail/>} />
          <Route path='/personal-details-tenant' element={<TenantPersonalDetails/>} />
          <Route path='/service-and-complaint' element={<ServiceComplaint/>} />
          <Route path='/request-and-submission' element={<RequestSubmission/>} />
          <Route path='/events-and-participation' element={<EventParticipation/>} />
          <Route path='/activity-and-participation' element={<ActivityParticipation/>} />
          <Route path='/maintenance-invoices' element={<MaintenanceInvoices/>} />


          <Route element={<PersonalDetail/>} path='/personal-details' />

            <Route element={<TenantPersonalDetails/>} path='/personal-details-tenant' />
            <Route path='/Resident-Protocols' element={<SecurityProtocolsResident/>}/>


        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
