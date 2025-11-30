import { updateTodo } from '../logic/todo';

import { parseISO, isValid, format } from 'date-fns';

import { createCurrentProjectInput } from './currentProjectInput';
import { createProjectContent } from './projectContent';

function fillEditTodoForm(projectId, todo) {
  createCurrentProjectInput(projectId, '#edit-todo-current-project');

  let title = document.querySelector('#edit-title');
  title.value = todo.title;
  title.setAttribute('data-todo-id', todo.id);

  let description = document.querySelector('#edit-description');
  description.value = todo.description;

  let dueDate = document.querySelector('#edit-due-date');
  dueDate.value = format(todo.dueDate, 'yyyy-MM-dd');

  let importantCheckbox = document.querySelector('#edit-important');
  todo.isImportant === true
    ? (importantCheckbox.checked = true)
    : (importantCheckbox.checked = false);
}

const editTodoDialog = document.querySelector('.edit-todo-dialog');

const submitEditTodoButton = document.querySelector('.submit-edit-todo-btn');

submitEditTodoButton.addEventListener('click', (e) => {
  e.preventDefault();

  let currentProjectInputElement = document.querySelector(
    '#edit-todo-current-project'
  );
  let projectId = currentProjectInputElement.dataset.projectId;

  let titleInput = document.querySelector('#edit-title');
  let todoId = titleInput.dataset.todoId;

  let title = document.querySelector('#edit-title').value;

  if (title === '') {
    alert('Please fill all required (*) fields.');
    return;
  }

  let description = document.querySelector('#edit-description').value;

  // make sure to use parseISO, otherwise it would change date to previous day after formatting it
  let dueDate = parseISO(document.querySelector('#edit-due-date').value);

  if (!isValid(dueDate)) {
    alert('Please input a valid date.');
    return;
  }

  dueDate = format(dueDate, 'MM/dd/yyyy');

  let importantCheckbox = document.querySelector('#edit-important');
  let important;
  importantCheckbox.checked ? (important = true) : (important = false);

  let updatedData = { title, description, dueDate, isImportant: important };

  updateTodo(projectId, todoId, updatedData);

  editTodoDialog.close();
  document.querySelector('#edit-todo-form').reset();
  createProjectContent(projectId);
});

const cancelEditTodoButton = document.querySelector('.cancel-edit-todo-btn');

cancelEditTodoButton.addEventListener('click', () => editTodoDialog.close());

export { fillEditTodoForm, editTodoDialog };
