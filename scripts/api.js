import { Task } from "./task.js";

export const taskState = {
    taskLength: 0,
    taskDone: 0,
    taskPending: 0
}


/**
 * Sends a POST request to /user
 * @param {Object} data 
 * @returns 
 */
export const register = async (data) => {
   
    const response = await fetch('https://backend-jsdinamico.vercel.app/user', {
        method: 'POST',
        accept: "*/*",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const message = await response.json();
    
    return message;
}

/**
 * Sends a POST request to /login
 * @param {Object} data 
 * @returns 
 */
export const login = async (data) => {

    const response = await fetch('https://backend-jsdinamico.vercel.app/login', {
        method: 'POST',
        accept: "*/*",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const message = await response.json();
    return {message, response};
}

/**
 * Sends a POST request to /user/:user/tasks
 * @param {Task} task 
 * @returns 
 */
export const postUserTask = async (task) => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}/tasks`, {
        method: 'POST',
        accept: "*/*",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })

    const tasksData = await response.json();
    return tasksData;
}

/**
 * Sends a PATCH request to /users/:user/tasks
 * @param {Task} task 
 * @returns {Object}
 */
export const updateUserTask = async (task) => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}/tasks`, {
        method: 'PATCH',
        accept: "*/*",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task)
    })

    const tasksData = await response.json();

    return tasksData;
}

/**
 * Sends a DELETE request to /user/:user/tasks
 * @param {Task} task 
 * @returns 
 */
export const deleteUserTask = async (task) => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}/tasks`, {
        method: 'DELETE',
        accept: "*/*",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const tasksData = await response.json();
    return tasksData;
}

