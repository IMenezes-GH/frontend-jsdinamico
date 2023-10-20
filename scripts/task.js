import { taskState } from "./api.js";

export class Task{

    constructor({title, description, to_do, due_date, type, completed, creationDate}){
        this.title = title;
        this.description = description || "";
        this.to_do = to_do;
        this.type = type;
        this.creationDate = creationDate || new Date();
        this.due_date = due_date;
    }

    renderArticle(){
        const article = document.createElement('article');
        article.classList.add('task');

        article.innerHTML =
        `
        <h2 class="task-title">${this.title} <span>${taskState.taskLength}</span></h2>
        <hr>
        <p class="task-description">${this.description}</p>
        
        <p class="task-creation-date">Data de criação: <span class="txt-accent">${this.creationDate.toLocaleDateString()}</span> às <span class="txt-accent">${this.creationDate.toLocaleTimeString()}</span></p>
        <p class="task-due-date">Data de prazo: <span class="txt-accent">${this.due_date ? this.due_date.toLocaleDateString() : 'Sem prazo'}</span></p>
                    
        <p class="task-objetivos">Objetivos:</p>
        <ul>
        </ul>
        `
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


        return article;
    }

    renderLi(){
        const li = document.createElement('li');
        li.innerHTML = `<span class="txt-accent txt-bold">${taskState.taskLength} ${this.title}</span> | <span>${this.description}</span>`
        return li;
    }
}