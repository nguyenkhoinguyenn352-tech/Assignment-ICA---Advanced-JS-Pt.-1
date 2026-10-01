// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
'use strict';

// Initial todoList array
const todoList = [
  { id: 1, task: 'Buy milk', completed: true },
  { id: 2, task: 'Buy eggs', completed: false },
  { id: 3, task: 'Buy bread', completed: false },
];

const ulElement = document.querySelector('ul');

// Render TODO list
function renderList() {
  ulElement.innerHTML = '';

  todoList.forEach((item) => {
    const li = document.createElement('li');

    // 1. Checkbox
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `todo-${item.id}`;
    input.checked = item.completed;

    // Update completed property on change
    input.addEventListener('change', () => {
      item.completed = input.checked;
      console.log('Updated todoList:', todoList);
    });

    // 2. Label
    const label = document.createElement('label');
    label.htmlFor = `todo-${item.id}`;
    label.textContent = item.task;

    // 3. Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      const index = todoList.findIndex((t) => t.id === item.id);
      if (index !== -1) {
        todoList.splice(index, 1);
      }
      ulElement.removeChild(li);
      console.log('Updated todoList after deletion:', todoList);
    });

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    ulElement.appendChild(li);
  });
}

// Initial render
renderList();

// 4. Modal and Form handling
const dialog = document.querySelector('dialog');
const openModalBtn = document.querySelector('#add-btn') || document.querySelector('button.add-btn');
const form = document.querySelector('form');
const inputField = document.querySelector('form input[type="text"]');

if (openModalBtn && dialog) {
  openModalBtn.addEventListener('click', () => {
    dialog.showModal();
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTaskText = inputField.value.trim();

    if (newTaskText !== '') {
      const newItem = {
        id: Date.now(),
        task: newTaskText,
        completed: false,
      };

      todoList.push(newItem);
      console.log('Updated todoList after addition:', todoList);

      renderList();
      inputField.value = '';
      if (dialog) dialog.close();
    }
  });
}
