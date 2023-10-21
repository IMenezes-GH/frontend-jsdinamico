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

    console.log(JSON.stringify(task))

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