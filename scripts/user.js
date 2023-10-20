const names = document.querySelectorAll(".name");
const usernames = document.querySelectorAll(".username");

// const tester =document.getElementById("tester");

const tasksLength = document.querySelectorAll(".task-length");
const tasksPending = document.querySelectorAll(".task-length-pending");
const tasksDone = document.querySelectorAll(".task-length-done");

const taskcontainer = document.getElementById("task-container");

const fetchUserData = async () => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

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
    sessionStorage.setItem('userdata', JSON.stringify(userData));

    return userData;
}


// const userdata = await fetchUserData();
// const user = userdata[0];

let completed = 3;
let pendent = 2;
let tasklength = completed + pendent;


names.forEach((el) => el.innerText = 'Placeholder da silva');
usernames.forEach((el) => el.innerText = 'placehold');
tasksLength.forEach((el) => el.innerText = tasklength);
tasksPending.forEach((el) => el.innerText = pendent);
tasksDone.forEach((el) => el.innerText = completed);

const data = [{
        values: [completed, pendent],
        labels: ['Completas', 'Pendentes'],
        textposition: 'inside',
        type: 'pie', hole: 0.4,
        marker: {
            colors: ['#5ADD8E', '#435343']
        }
      }];

Plotly.newPlot('graph', data, {paper_bgcolor: 'transparent', showlegend: false}, {displayModeBar: false})

taskcontainer.onclick = () => {
    taskcontainer.classList.toggle('open');
}
