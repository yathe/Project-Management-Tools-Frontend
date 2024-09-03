import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/TaskSlice';
import ListCard from './ListCard';
import './TaskList.css';

const TaskList = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { currentUser } = auth;
  const { AllTasks } = tasks;

  useEffect(() => {
    if (currentUser && currentUser.token) {
      dispatch(getAllTasks(currentUser.token, currentUser.id));
    }
  }, [dispatch, currentUser, tasks]);

  return (
    <div className="task-list">
      <div className="list-card__header">
        <ul className="list-card__row">
          <li className="list-card__cell"><strong>ID</strong></li>
          <li className="list-card__cell"><strong>Issue Name</strong></li>
          <li className="list-card__cell"><strong>Status</strong></li>
          <li className="list-card__cell"><strong>Deadline</strong></li>
          <li className="list-card__cell"><strong>Action</strong></li>
        </ul>
      </div>
      {AllTasks && Object.values(AllTasks).map((item) => (
        <ListCard key={item._id} items={item} />
      ))}
    </div>
  );
};

export default TaskList;
