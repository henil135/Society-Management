import React from 'react';

import Header from './Header';
import Income from './Income';
import TotalBalanceChart from './TotalBalanceChart';
import Complaintlist from './Complaintlist';
import Sidebar from "../component/Layout/Sidebar";


function Dashboard() {
  console.log("Dashboard rendered"); // Ensure this log appears when the component is loaded
  return (
    <div>
        <Sidebar />
      <Header/>
      <div className="dashboard-bg" style={{ marginLeft: "300px" }}>

        <Income />
        <TotalBalanceChart />
        <Complaintlist />
      </div>
    </div>
  );
}

export default Dashboard;
