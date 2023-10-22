import {
    taskState,
    deleteUserTask,
    updateUserTask
} from "./api.js";
const editTaskDialog = document.getElementById('edit-task-dialog');

export class Task {

    constructor({
        key,
        id,
        title,
        description,
        to_do,
        due_date,
        type,
        completed,
        creationDate
    }) {
        this.key = key;
        this.id = id;
        this.title = title;
        this.description = description || "";
        this.to_do = to_do || [];
        this.type = type;
        this.creationDate = creationDate || new Date();
        this.due_date = due_date;
        this.completed = completed;
    }

    stringify() {
        const stringifiedObject = {
            id: this.id,
            title: this.title,
            description: this.description,
            to_do: JSON.stringify(this.to_do),
            type: this.type,
            creationDate: this.creationDate,
            due_date: this.due_date
        }

        return stringifiedObject;
    }

    renderArticle() {
        const article = document.createElement('article');
        article.classList.add('task');

        article.innerHTML =
            `
        <h2 class="task-title">${this.title} <button id="new-task-close" class="dialog-close">x</button></h2>
        <hr>
        <p class="task-description">${this.description}</p>
        
        <p class="task-creation-date">Data de criação: <span class="txt-accent">${this.creationDate.toLocaleDateString()}</span> às <span class="txt-accent">${this.creationDate.toLocaleTimeString()}</span></p>
        <p class="task-due-date">Data de prazo: <span class="txt-accent">${this.due_date ? this.due_date.toLocaleDateString() : 'Sem prazo'}</span></p>
                    
        <p class="task-objetivos">Objetivos:</p>
        <ul>
        </ul>
        `
        const closeButton = article.querySelector("#new-task-close");

        closeButton.addEventListener('click', async () => {
            await deleteUserTask(this);
            location.reload(); // PLACEHOLDER, FUTURAMENTE ATUALIZAÇÃO NÃO SERÁ FEITA POR RELOAD
        })

        const ulTarefa = article.querySelector('ul');
        this.to_do.forEach((val) => {
            const checked = val.checked;
            const objective = val.objective;

            const li = document.createElement("li");
            li.innerHTML =
                `
            <input checked=${checked} type="checkbox" ><span>${objective}</span>
            `

            ulTarefa.appendChild(li);
        })

        // Abre uma modal ao clicar em uma tarefa, permitindo que ela seja editada
        article.onclick = (ev) => {

            const editTitle = editTaskDialog.querySelector('#edit-title');
            const editDescription = editTaskDialog.querySelector('#edit-description');
            const editDue_date = editTaskDialog.querySelector('#edit-due-date');
            const editTaskComplete = editTaskDialog.querySelector('#edit-task-done');
           
            editTitle.value = this.title;
            editDescription.value = this.description;
            editDue_date.value = this.due_date.toISOString().split('T')[0];
            editTaskComplete.checked = this.completed;
            editTaskComplete.disabled = this.completed;

            const ul = editTaskDialog.querySelector('#edit-todo-list')

            this.to_do.forEach((val, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<input checked=${val.checked} type="checkbox"><span>${val.objective}</span>`
                li.querySelector('input').onchange = (ev) => {
                    this.to_do[index].checked = ev.target.checked;
                }

                ul.appendChild(li);
            })

            editTaskDialog.querySelector('#edit-task-dialog-form').onsubmit = async (ev) => {
                ev.preventDefault();
                this.title = editTitle.value;
                this.description = editDescription.value;
                this.due_date = editDue_date.value;
                this.completed = editTaskComplete.checked;

                await updateUserTask(this);
                editTaskDialog.close();
                location.reload();
            }
            editTaskDialog.showModal();
            
            editTaskDialog.onclose = () => { // Reseta modal quando fechada ou cancelada (esc).
                editTaskDialog.querySelector('form').reset();
                ul.replaceChildren();
            }

            editTaskDialog.querySelectorAll('.edit-close').forEach((el) => {
                el.onclick = () => {
                    editTaskDialog.close()
                };
            })
        }

        this.completed ? article.classList.add('completed') : article.classList.remove('completed');

        return article;
    }

    renderLi() {
        const li = document.createElement('li');
        li.innerHTML = `<span class="txt-accent txt-bold">${taskState.taskLength} ${this.title}</span> | <span>${this.description}</span>`
        return li;
    }



}