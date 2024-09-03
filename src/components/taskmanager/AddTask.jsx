import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/TaskSlice';
import "./AddTask.css";

const AddTask = () => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(""); 
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Name:", name);
    console.log("User ID:", currentUser.id);  // Ensure this logs the correct ID
    dispatch(addTask(name, currentUser.id,deadline));
    setName("");
  };



  return (
    <div>
      <div className="addTask">
        <form className="form1" onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            placeholder="Add your task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
            <input
            className='datepicker'
            type="date"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button className="button" type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
