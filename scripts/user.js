const names = document.querySelectorAll(".name");
const usernames = document.querySelectorAll(".username");

const fetchUserData = async () => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");
    console.log(username, token);


    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}`, {
        method: 'GET',
        accept: "json",
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    const userData = await response.json();
    return userData;
}

const userdata = await fetchUserData();
const user = userdata[0];

names.forEach((el) => el.innerText = user.name);
usernames.forEach((el) => el.innerText = user.username);
