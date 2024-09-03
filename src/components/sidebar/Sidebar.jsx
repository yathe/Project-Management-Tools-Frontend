import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h5>{currentUser.username}</h5>
      </div>
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <Link to="/dashboard" className="sidebar__link">Dashboard</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
