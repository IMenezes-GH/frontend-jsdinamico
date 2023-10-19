export const register = async (data) => {
    document.body.style.cursor = 'wait';
    const response = await fetch('https://backend-jsdinamico.vercel.app/user', {
        method: 'POST',
        accept: "*/*",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const message = await response.json();
    document.body.style.cursor = 'inherit';
    return message;
}
