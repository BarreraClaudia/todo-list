import {
  toggleIsCompleted,
  toggleIsImportant,
  deleteTodo,
} from '../logic/todo';

import { createProjectHeader } from './projectContent';
import { createIcon } from './icon';
import { createCurrentActiveContent } from './activeContent';
import { editTodoDialog, fillEditTodoForm } from './editTodoForm';

function createTodoElementsFromArray(arr) {
  let todosContainer = document.createElement('div');
  todosContainer.classList.add('todos-container');

  let todosArray = arr;

  todosArray.forEach((project) => {
    let projectHeader = createProjectHeader(project.id);
    todosContainer.appendChild(projectHeader);

    project.todos.forEach((todo) => {
      let todoContainer = document.createElement('div');
      todoContainer.classList.add('todo-container');

      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'todo-checkbox');
      todoContainer.appendChild(checkbox);

      if (todo.isCompleted === true) {
        checkbox.checked = true;
        todoContainer.classList.add('completed');
      }

      checkbox.addEventListener('click', () => {
        todoContainer.classList.toggle('completed');
        toggleIsCompleted(project.id, todo.id);
      });

      let titlePara = document.createElement('p');
      titlePara.textContent = todo.title;
      todoContainer.appendChild(titlePara);

      let datePara = document.createElement('p');
      datePara.textContent = todo.dueDate;
      todoContainer.appendChild(datePara);

      let iconsContainer = document.createElement('div');
      iconsContainer.classList.add('todo-icons-container');

      let chevronIcon = createIcon('chevron-icon-container', 'chevron-down');
      iconsContainer.appendChild(chevronIcon);

      chevronIcon.addEventListener('click', () => {
        descriptionContainer.classList.toggle('hide');
        chevronIcon.classList.toggle('flip-icon');
      });

      let starIcon = createIcon('star-icon-container', 'star');
      iconsContainer.appendChild(starIcon);

      if (todo.isImportant === true) todoContainer.classList.add('important');

      starIcon.addEventListener('click', () => {
        todoContainer.classList.toggle('important');
        toggleIsImportant(project.id, todo.id);
        createCurrentActiveContent();
      });

      let editIcon = createIcon('edit-icon-container', 'edit-2');
      iconsContainer.appendChild(editIcon);

      editIcon.addEventListener('click', () => {
        editTodoDialog.showModal();
        fillEditTodoForm(project.id, todo);
      });

      let trashIcon = createIcon('trash-icon-container', 'trash');
      iconsContainer.appendChild(trashIcon);

      trashIcon.addEventListener('click', () => {
        deleteTodo(project.id, todo.id);
        createCurrentActiveContent();
      });

      todoContainer.appendChild(iconsContainer);

      let descriptionContainer = document.createElement('div');
      descriptionContainer.classList.add('description-container', 'hide');
      let descriptionPara = document.createElement('p');
      descriptionPara.textContent =
        todo.description === ''
          ? 'No description here. (╥﹏╥) Click the edit button to add a description.'
          : `Description: ${todo.description}`;
      descriptionContainer.appendChild(descriptionPara);

      todosContainer.appendChild(todoContainer);
      todosContainer.appendChild(descriptionContainer);
    });
  });

  return todosContainer;
}

export { createTodoElementsFromArray };
