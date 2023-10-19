const register = async (data) => {
    const response = await fetch('https://backend-jsdinamico.vercel.app/user', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

