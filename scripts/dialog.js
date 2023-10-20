// CREATE TASK DIALOG ================================================

import { taskState, postUserTask } from "./api.js";
import { renderStats } from "./user.js";

const createTaskDialog = document.getElementById("new-task-dialog");
const createTaskForm = document.getElementById("create-task-dialog-form");

const addTodoButton = document.getElementById("add-todo-button");
const todoListContainer = document.getElementById("todo-list");

const submitTaskButton = document.getElementById("submit-task");

const tasksMain = document.getElementById("tasks-main");
const asidetaskList = document.getElementById("aside-task-list");

// Abre modal para criar uma tarefa 
const newTaskButton = document.getElementById('task-create-button');
const newTaskCloseButton = document.getElementById('new-task-close');


newTaskButton.onclick = () => {
    createTaskDialog.showModal();
}

newTaskCloseButton.onclick = () => {
    createTaskDialog.close();
}

// Append de novos items para lista

const appendTODO = () => {

    const textInput = document.getElementById('add-todo-text');

    const listItem = document.createElement('li');
    const span = document.createElement('span');

    listItem.innerHTML = '<input type="checkbox">';
    span.appendChild(document.createTextNode(textInput.value));
    
    
    listItem.appendChild(span);
    
    todoListContainer.appendChild(listItem);
    textInput.value = '';
    textInput.focus();
}

addTodoButton.onclick = () => {appendTODO()}
createTaskForm.onsubmit = async (ev) => {
    ev.preventDefault();

    const title = ev.target.querySelector("#title").value;
    const description = ev.target.querySelector("#description").value;
    const creation_date = new Date();
    const due_date = ev.target.querySelector("#due-date").value;
    const todos = ev.target.querySelectorAll('li');
    
    const task = {
        title,
        description,
        type: 'normal',
        to_do: []
    }

    const tarefa =
    `
    <h2 class="task-title">${title} <span>${taskState.taskLength}</span></h2>
    <hr>
    <p class="task-description">${description}</p>
    
    <p class="task-creation-date">Data de criação: <span class="txt-accent">${creation_date.toLocaleDateString()}</span> às <span class="txt-accent">${new Date().toLocaleTimeString()}</span></p>
    <p class="task-due-date">Data de prazo: <span class="txt-accent">${due_date}</span></p>
                
    <p class="task-objetivos">Objetivos:</p>
    <ul>
    </ul>
    `
                
    
    
    
    // ASIDE CONTAINER
    const li = document.createElement('li');
    li.innerHTML = `<span class="txt-accent txt-bold">${taskState.taskLength} ${title}</span> | <span>${description}</span>`
    
    const article = document.createElement('article');
    article.classList.add('task');
                    
    article.innerHTML = tarefa;
    const ulTarefa = article.querySelector('ul');
    todos.forEach((el) => {
        const checked = el.firstChild.checked;
        const objective = el.lastChild.innerText;

        ulTarefa.appendChild(el);
        task.to_do.push({objective, checked})
    })
    
    
    task.to_do = JSON.stringify(task.to_do)

    tasksMain.appendChild(article);
    asidetaskList.appendChild(li);
                
    todoListContainer.replaceChildren();
    ev.target.reset();
    taskState.taskLength += 1;
    taskState.taskPending += 1;

    await postUserTask(task);
    renderStats();
}
            