// import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Navbar from "./layout/navbar";
import '../styles/styles.css'

export default function Dashboard() {
  const [workoutCount, setWorkoutCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [topLifters, setTopLifters] = useState([]);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      const res = await fetch(
        "http://127.0.0.1:8000/api/get-dashboard-details",
      );
      const data = await res.json();
      setWorkoutCount(data.workoutCount);
      setUserCount(data.userCount);
      setTopLifters(data.topLifters);
    };

    fetchDashboardDetails();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
            <div className="container py-4">

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="stats-card">
              <h5>Total Workouts</h5>
              <h2>{workoutCount}</h2>
            </div>
          </div>

          <div className="col-md-6">
            <div className="stats-card">
              <h5>Total Users</h5>
              <h2>{userCount}</h2>
            </div>
          </div>
        </div>
        {/* Leaderboard */}
        <div className="leaderboard-card">
          <h4 className="mb-4">Top Five Lifters</h4>

          {topLifters.map((lifter, index) => (
            <div className="leaderboard-item" key={index}>
              <div className="left-section">
                <div className="rank">{index + 1}</div>

                <div>
                  <h6>{lifter.user_name}</h6>
                  <small>Top Performer</small>
                </div>
              </div>

              <div className="right-section">
                <h5>{lifter.weight} kg</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
