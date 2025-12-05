import { getProject, deleteProject } from '../logic/project';

import { createIcon } from './icon';
import { editProjectDialog } from './editProjectForm';
import { createCurrentProjectInput } from './currentProjectInput';
import { createTodoElementsFromArray } from './todo';

const feather = require('feather-icons');

function createProjectHeader(projectId) {
  let project = getProject(projectId);

  let header = document.createElement('header');
  header.classList.add('project-header');

  let heading = document.createElement('h2');
  heading.classList.add('project-heading');
  heading.textContent = project.projectName;
  header.appendChild(heading);

  let iconsContainer = document.createElement('div');
  iconsContainer.classList.add('project-header-icons-container');

  let editIcon = createIcon('edit-icon-container', 'edit-2');
  editIcon.addEventListener('click', () => {
    editProjectDialog.showModal();
    createCurrentProjectInput(project.id, '#edit-current-project');
  });
  iconsContainer.appendChild(editIcon);

  let trashIcon = createIcon('trash-icon-container', 'trash');
  trashIcon.addEventListener('click', () => {
    deleteProject(project.id);
    window.location.reload();
  });
  iconsContainer.appendChild(trashIcon);

  header.appendChild(iconsContainer);

  return header;
}

function createProjectContent(projectId) {
  let contentContainer = document.querySelector('#content');
  contentContainer.replaceChildren();

  let project = getProject(projectId);

  let todosContent = createTodoElementsFromArray([project]);

  let todoContainer = todosContent.querySelector('.todo-container');
  if (!todoContainer) {
    let emptyTodosDiv = document.createElement('div');
    emptyTodosDiv.textContent = "No to do's here! ┐( ˘_˘ )┌";
    emptyTodosDiv.classList.add('empty');
    todosContent.appendChild(emptyTodosDiv);
  }

  if (todosContent) contentContainer.appendChild(todosContent);

  // Replaces all elements that have a data-feather attribute with SVG markup corresponding to the element's data-feather attribute value.
  feather.replace();
}

export { createProjectHeader, createProjectContent };
