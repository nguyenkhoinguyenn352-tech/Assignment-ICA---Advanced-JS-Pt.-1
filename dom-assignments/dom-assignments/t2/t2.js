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
const todoList = [
  { id: 1, task: 'Buy milk', completed: true },
  { id: 2, task: 'Buy eggs', completed: false },
  { id: 3, task: 'Buy bread', completed: false },
];

const ulElement = document.querySelector('ul');

todoList.forEach((item) => {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = `todo-${item.id}`;
  input.checked = item.completed;

  const label = document.createElement('label');
  label.htmlFor = `todo-${item.id}`;
  label.textContent = item.task;

  li.appendChild(input);
  li.appendChild(label);
  ulElement.appendChild(li);
});
