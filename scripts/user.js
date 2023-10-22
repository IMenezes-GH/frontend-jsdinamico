import { taskState } from "./api.js";
import { Task } from "./task.js";

const names = document.querySelectorAll(".name");
const usernames = document.querySelectorAll(".username");

const tasksLength = document.querySelectorAll(".task-length");
const tasksPending = document.querySelectorAll(".task-length-pending");
const tasksDone = document.querySelectorAll(".task-length-done");

const taskcontainer = document.getElementById("task-container");
const asidetaskList = document.getElementById("aside-task-list");

const taskmain = document.getElementById("tasks-main");
const taskcontainerBtn = document.getElementById("open-aside-btn");

const fetchUserData = async () => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}`, {
        method: 'GET',
        accept: "json",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    const userData = await response.json();
    sessionStorage.setItem('userdata', JSON.stringify(userData));

    return userData;
}

const fetchUserTasks = async () => {

    const username = sessionStorage.getItem("username");
    const token = sessionStorage.getItem("auth");

    const response = await fetch(`https://backend-jsdinamico.vercel.app/user/${username}/tasks`, {
        method: 'GET',
        accept: "json",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    const tasksData = await response.json();
    sessionStorage.setItem('tasksdata', JSON.stringify(tasksData));

    return tasksData;
}

const userdata = await fetchUserData();
const user = userdata[0];

document.title = `${user.name} | Minhas tarefas`;
const tarefas = await fetchUserTasks();

export const renderTasks = async () => {
    
    const tarefas = JSON.parse(sessionStorage.getItem('tasksdata'));

    if (!Array.isArray(tarefas)) return;
    tarefas.forEach((val, index) => {

        const task = new Task(
            {
            key: index,
            id: val._id,
            title: val.title,
            description: val.description,
            type: val.type,
            due_date: new Date(val.due_date),
            creationDate: new Date(val.creationDate),
            completed: val.completed,
            to_do: val.to_do
        })

        task.completed ? taskState.taskDone += 1 : taskState.taskPending += 1;

        taskmain.appendChild(task.renderArticle());
        asidetaskList.appendChild(task.renderLi());
    })

    taskState.taskLength = tarefas.length;
}

renderTasks();

export const renderStats = () => {
    
    names.forEach((el) => el.innerText = user.name);
    usernames.forEach((el) => el.innerText = user.username);
    tasksLength.forEach((el) => el.innerText = taskState.taskLength);
    tasksPending.forEach((el) => el.innerText = taskState.taskPending);
    tasksDone.forEach((el) => el.innerText = taskState.taskDone);
    
    const data = [{
        values: [taskState.taskDone || 0, taskState.taskPending || 0],
        labels: ['Completas', 'Pendentes'],
        textposition: 'inside',
        type: 'pie', hole: 0.4,
        marker: {
            colors: ['#5ADD8E', '#435343']
        }
    }];
    
    Plotly.newPlot('graph', data, {paper_bgcolor: 'transparent', showlegend: false}, {displayModeBar: false})
};
renderStats();

taskcontainerBtn.onclick = () => {
    taskcontainer.classList.toggle('open');
}