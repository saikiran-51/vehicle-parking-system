import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const response = await axios.get("http://localhost:5000/dashboard");

    setDashboardData(response.data);
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="dashboard-container">
        <h1>Parking Dashboard</h1>

        <div className="cards-container">
          <div className="dashboard-card">
            <p className="card-title">Total Slots</p>

            <h1 className="card-count">{dashboardData.total}</h1>
          </div>

          <div className="dashboard-card">
            <p className="card-title">Available</p>

            <h1 className="card-count">{dashboardData.available}</h1>
          </div>

          <div className="dashboard-card">
            <p className="card-title">Reserved</p>

            <h1 className="card-count">{dashboardData.reserved}</h1>
          </div>

          <div className="dashboard-card">
            <p className="card-title">Occupied</p>

            <h1 className="card-count">{dashboardData.occupied}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
