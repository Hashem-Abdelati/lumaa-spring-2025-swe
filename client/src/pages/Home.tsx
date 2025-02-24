import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Taskalicious</h1>
      <p>Manage your tasks efficiently and stay organized.</p>
      <div className="buttons">
        <Link to="/login"><button className="primary-btn">Login</button></Link>
        <Link to="/register"><button className="secondary-btn">Register</button></Link>
      </div>
    </div>
  );
};

export default Home;
