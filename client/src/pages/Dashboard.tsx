import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import "../styles/global.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <span>Taskalicious</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content-container">
        <TaskList />
      </div>
    </>
  );
};

export default Dashboard;
