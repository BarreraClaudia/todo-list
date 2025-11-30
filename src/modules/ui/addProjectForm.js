import { Project, addProject } from '../logic/project';

import { createProjectsIconAndButtonList } from './projectNav';
import { createCurrentActiveContent } from './activeContent';

const addProjectDialog = document.querySelector('.project-dialog');

const addProjectButton = document.querySelector('.add-project-icon-and-btn');

addProjectButton.addEventListener('click', () => {
  addProjectDialog.showModal();
});

const submitProjectButton = document.querySelector('.submit-project-btn');

submitProjectButton.addEventListener('click', (e) => {
  e.preventDefault();

  let name = document.querySelector('#project-name').value;

  let newProject = new Project(name);

  addProject(newProject);

  let currentActive = document.querySelector('.active');

  if (currentActive) {
    currentActive.classList.remove('active');
  }

  createProjectsIconAndButtonList();

  let projectsList = document.querySelector('.projects-list');
  let newProjectButtonContainer = projectsList.lastChild;
  newProjectButtonContainer.classList.add('active');

  createCurrentActiveContent();

  addProjectDialog.close();
  document.querySelector('#project-form').reset(); // clear form inputs
});

const cancelProjectButton = document.querySelector('.cancel-project-btn');

cancelProjectButton.addEventListener('click', () => {
  addProjectDialog.close();
  document.querySelector('#project-form').reset();
});

export { addProjectDialog };
