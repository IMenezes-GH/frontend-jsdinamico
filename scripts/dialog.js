// CREATE TASK DIALOG ================================================

const createTaskDialog = document.getElementById("new-task-dialog");
const createTaskForm = document.getElementById("create-task-dialog-form");

const addTodoButton = document.getElementById("add-todo-button");
const todoListContainer = document.getElementById("todo-list");

const submitTaskButton = document.getElementById("submit-task");

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
createTaskForm.onsubmit = (ev) => {
    ev.preventDefault();
    ev.target.reset();
    todoListContainer.replaceChildren();
}
