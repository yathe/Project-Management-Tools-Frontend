 import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialTask = localStorage.getItem('task')
    ? JSON.parse(localStorage.getItem('task'))
    : null;

const initialState = {
    TaskData: initialTask,
    AllTasks: [],
};

export const taskSlice = createSlice({
    name: "Task",
    initialState,
    reducers: {
        taskAddedSuccessfully: (state, action) => {
            state.TaskData = action.payload;
        },
        taskAddFailure: (state) => {
            return state;
        },
        getAllTaskSuccess: (state, action) => {
            state.AllTasks = action.payload;
        },
        getAllTaskFailure: (state) => {
            return state;
        },
        editTaskSuccess: (state, action) => {
            const updatedTask = action.payload;
            state.AllTasks = state.AllTasks.map(task =>
                task._id === updatedTask._id ? updatedTask : task
            );
        },
        deleteSuccess: (state, action) => {
            state.TaskData = action.payload;
        },
        deleteFail: (state) => {
            return state;
        }
    }
});

export const {
    taskAddedSuccessfully,
    taskAddFailure,
    getAllTaskSuccess,
    getAllTaskFailure,
    editTaskSuccess,
    deleteSuccess,
    deleteFail
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (taskName, userId,deadline) => async (dispatch) => {
    // console.log("addTask function - Task Name:", taskName, "User ID:", userId);

    const taskData = {
        task: taskName,
        createdBy: userId,
        deadline: deadline,
    };

    try {
        const response = await fetch('https://project-taskbar-backend.netlify.app/task/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Task added successfully:', data);
            localStorage.setItem("task", JSON.stringify(data));
            dispatch(taskAddedSuccessfully(data));
        } else {
            // Fetch and log error details from the response
            const errorData = await response.json();
            console.error('Failed to add task:', errorData.message || response.statusText);
            alert(errorData.message || 'Failed to add task'); // Display the error to the user
            dispatch(taskAddFailure());
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error adding task:', error.message);
        alert('Error adding task: ' + error.message); // Display the error to the user
        dispatch(taskAddFailure());
    }
};

export const getAllTasks = (token, id) => async (dispatch) => {
    try {
        console.log(token);

        // Construct the URL with query parameters
        const url = new URL('https://project-taskbar-backend.netlify.app/task/tasks');
        if (id) {
            url.searchParams.append('id', id);
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getAllTaskSuccess(data));
        } else {
            // Handle response errors
            console.error('Failed to fetch tasks:', response.statusText);
            if (response.status === 400) {
                dispatch(getAllTaskFailure());
            }
        }
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        dispatch(getAllTaskFailure());
    }
};
export const ArrowClick = (item, direction) => async (dispatch) => {
    // Determine the new status based on direction
    const statusMap = {
        backlog: direction === 'right' ? 'todo' : 'backlog',
        todo: direction === 'right' ? 'doing' : 'backlog',
        doing: direction === 'right' ? 'done' : 'todo',
        done: direction === 'left' ? 'doing' : 'done'
    };

    const newStatus = statusMap[item.status] || item.status; // Default to current status if not found

    const taskData = {
        status: newStatus,
    };

    try {
        // Make a request to the backend to update the task status
        const response = await axios.put(`https://project-taskbar-backend.netlify.app/task/${item._id}/status`, taskData);

        if (response.status === 200) {
            const updatedTask = response.data;
            // Dispatch an action to update the state with the updated task
            dispatch(editTaskSuccess(updatedTask));
        } else {
            console.error('Failed to update task status:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating task status:', error.message);
    }
};
export const deleteItem = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://project-taskbar-backend.netlify.app/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            dispatch(deleteSuccess());
        } else {
            console.error('Failed to delete task:', response.statusText);
            dispatch(deleteFail());
        }
    } catch (error) {
        console.error('Error deleting task:', error.message);
        dispatch(deleteFail());
    }
};











































