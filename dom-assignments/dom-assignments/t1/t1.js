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
  const html = `
    <li>
      <input type="checkbox" id="todo-${item.id}" ${item.completed ? 'checked' : ''}>
      <label for="todo-${item.id}">${item.task}</label>
    </li>
  `;
  ulElement.insertAdjacentHTML('beforeend', html);
});
