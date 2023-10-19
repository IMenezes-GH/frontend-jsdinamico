export const register = async (data) => {
   
    const response = await fetch('https://backend-jsdinamico.vercel.app/user', {
        method: 'POST',
        accept: "*/*",
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const TOKEN = await response.json();
    return TOKEN;
}