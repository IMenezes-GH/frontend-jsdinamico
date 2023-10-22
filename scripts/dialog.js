// CREATE TASK DIALOG ================================================

import { taskState, postUserTask } from "./api.js";
import { renderStats } from "./user.js";
import { Task } from "./task.js";

const createTaskDialog = document.getElementById("new-task-dialog");
const createTaskForm = document.getElementById("create-task-dialog-form");

const addTodoButton = document.getElementById("add-todo-button");
const todoListContainer = document.getElementById("todo-list");

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

// Behavior no botão para adicionar TODOList na modal
addTodoButton.onclick = () => {appendTODO()}

// Evento executado quando o botão da modal de criar diálogo seja apertado
createTaskForm.onsubmit = async (ev) => {
    ev.preventDefault();

    const title = ev.target.querySelector("#title").value;
    const description = ev.target.querySelector("#description").value;
    const due_date = ev.target.querySelector("#due-date").value;
    const todos = ev.target.querySelectorAll('li');
    
    const task = new Task({
        title,
        description,
        type: 'normal',
        to_do: [],
        due_date: new Date(due_date)
    });
    

    // ASIDE CONTAINER
    
    const article = task.renderArticle();
        
    const ulTarefa = article.querySelector('ul');
    console.log(ulTarefa);
    todos.forEach((el) => {
        const checked = el.firstChild.checked;
        const objective = el.lastChild.innerText;

        ulTarefa.appendChild(el);
        task.to_do.push({objective, checked})
    })
    
    tasksMain.appendChild(article);
    asidetaskList.appendChild(task.renderLi());
                
    todoListContainer.replaceChildren();

    ev.target.reset();

    taskState.taskLength += 1;
    taskState.taskPending += 1;


    await postUserTask(task.stringify());
    renderStats();
}
            