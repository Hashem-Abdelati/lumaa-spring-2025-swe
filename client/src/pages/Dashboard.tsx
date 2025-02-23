import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";

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
    window.history.pushState(null, "", "/");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
};

export default Dashboard;
