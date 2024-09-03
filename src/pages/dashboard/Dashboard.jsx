import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import './Dashboard.css';
import { getAllTasks } from '../../redux/TaskSlice';

const Dashboard = () => {
  const tasklist = useSelector((state) => state.task);
  const { AllTasks } = tasklist;
  const user = useSelector((state) => state.auth);
  const { currentUser } = user;

  let pendingTask = [];
  let completedTask = [];
  let doingTask = [];

  // Use forEach to iterate over AllTasks
  AllTasks.forEach((task) => {
    if (task.status === "todo") {
      pendingTask.push(task);
    } else if (task.status === "done") {
      completedTask.push(task);
    }
    else if (task.status === "doing") {
      doingTask.push(task);
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser && currentUser.token) {
      dispatch(getAllTasks(currentUser.token, currentUser.id));
    }
  }, [dispatch, currentUser]);

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <Sidebar />
      </div>
      <div className="dashboard__right">
        <h2 className="dashboard__title">Project Management Tool</h2>
        <div className="taskcount">
          <div className="todo box">ToDo - {pendingTask.length}</div>
          <div className="doing box">In Progress-{doingTask.length}</div>
          <div className="done box">Completed - {completedTask.length}</div>
        </div>
        <div className="createButton">
          <Link to="/taskmanager" className="button">+ Create New Project</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
