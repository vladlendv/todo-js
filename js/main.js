'use strict';

const todoContainer = document.querySelector('.todo-list');
const addBtn = document.querySelector('.add-btn');
const focusInput = document.querySelector('.add-input')

let addTodoState = true;
startRender();

function startRender() {
    const items = {...localStorage};
    for (let key in items) {
        if (key === 'local-key') continue
        todoContainer.insertAdjacentHTML('beforeend', `
            <div class="todo-item" data-key=${key}>
            <input type="checkbox" class="remove-btn">${localStorage.getItem(key)}
            </div>
        `);
    }
}

if (localStorage.length === 1) localStorage.setItem('local-key', 0)
if (!localStorage.getItem('local-key')) {
    localStorage.setItem('local-key', 0)
}

addBtn.onclick = (e) => {
    if (addTodoState) {
        createNewTodo();
    } else {
        addTodo();
    }
}

document.onkeydown = e => {
    if (e.key === 'Enter' && (e.target.className === 'add-input' && (e.target.value !== '' && e.target.value != false))) {
        addTodo();
    }
}

document.onclick = (e) => {
    if (e.target.className == 'remove-btn') {
        setTimeout(() => {
            localStorage.removeItem(e.target.parentNode.dataset.key);
            e.target.parentNode.remove();   
        }, 400)
    }
}

function createNewTodo() {
    let todoInput = document.createElement('input');
    todoInput.classList.add('add-input');
    todoContainer.append(todoInput);
    document.querySelector('.add-input').focus();
    addTodoState = false;
}

function addTodo() {
    let elem = document.createElement('div');
    let doneBtn = document.createElement('input');
    doneBtn.type = 'checkbox';
    doneBtn.classList.add('remove-btn');
    elem.classList.add('todo-elem');
    let inputValue = document.querySelector('.add-input').value;
    elem.innerHTML = inputValue;
    elem.prepend(doneBtn);
    let currentKey = localStorage.getItem('local-key');
    localStorage.setItem('local-key', Number(currentKey) + 1);
    localStorage.setItem(localStorage.getItem('local-key'), inputValue);
    elem.dataset.key = Number(currentKey) + 1;
    todoContainer.append(elem);
    addTodoState = true;
    document.querySelector('.add-input').remove();
}
