export const taskState = {
    taskLength: 0,
    taskDone: 0,
    taskPending: 0
}


export const register = async (data) => {
   
    const response = await fetch('https://backend-jsdinamico.vercel.app/user', {
        method: 'POST',
        accept: "*/*",
        // credentials: 'include',
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
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const message = await response.json();
    return {message, response};
}