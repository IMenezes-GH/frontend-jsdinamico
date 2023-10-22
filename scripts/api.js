export const taskState = {
    taskLength: 0,
    taskDone: 0,
    taskPending: 0
}


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
    console.log(tasksData);
    return tasksData;
}

export const deleteUserTask = async (task) => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");
    const data = {_id: task.id};
    
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