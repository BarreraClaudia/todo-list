import { getLibrary } from '../logic/library';
import { Todo, addTodo } from '../logic/todo';

import { parseISO, isValid } from 'date-fns';

import { createProjectContent } from './projectContent';
import { toggleActiveButton } from './activeContent';

const addTodoDialog = document.querySelector('.add-todo-dialog');

const addTodoButton = document.querySelector('.add-todo-icon-and-btn');

addTodoButton.addEventListener('click', () => {
  addTodoDialog.showModal();
  createProjectOptions();
});

function createProjectOptions() {
  let library = getLibrary();

  let todoFormSelect = document.querySelector('#project');
  todoFormSelect.replaceChildren(); //reset to avoid duplicates

  let chooseOptionEl = document.createElement('option');
  chooseOptionEl.setAttribute('value', '');
  chooseOptionEl.textContent = '-Choose a project-';
  todoFormSelect.appendChild(chooseOptionEl);

  library.projects.forEach((project) => {
    let optionEl = document.createElement('option');
    optionEl.setAttribute('data-project-id', project.id);
    optionEl.setAttribute('value', project.projectName);
    optionEl.textContent = project.projectName;

    todoFormSelect.appendChild(optionEl);
  });
}

const submitTodoButton = document.querySelector('.submit-todo-btn');

submitTodoButton.addEventListener('click', (e) => {
  e.preventDefault();

  let projectSelectEl = document.querySelector('#project');
  let selectedProject = projectSelectEl.options[projectSelectEl.selectedIndex];
  let projectId = selectedProject.dataset.projectId;

  let title = document.querySelector('#title').value;
  let description = document.querySelector('#description').value;
  // make sure to use parseISO, otherwise it would change date to previous day after formatting it
  let dueDate = parseISO(document.querySelector('#due-date').value);

  let importantCheckbox = document.querySelector('#important');
  let important;
  importantCheckbox.checked ? (important = true) : (important = false);

  if (title === '' || selectedProject.value === '') {
    alert('Please fill all required (*) fields.');
    return;
  }

  if (!isValid(dueDate)) {
    alert('Please input a valid date.');
    return;
  }

  let newTodo = new Todo(title, description, dueDate, important);

  addTodo(projectId, newTodo);

  addTodoDialog.close();
  document.querySelector('#add-todo-form').reset();

  createProjectContent(projectId);
  toggleActiveButton(projectId);
});

const cancelTodoButton = document.querySelector('.cancel-todo-btn');

cancelTodoButton.addEventListener('click', () => {
  addTodoDialog.close();
  document.querySelector('#add-todo-form').reset();
});

export { addTodoDialog };
