import { updateProjectName } from '../logic/project';

import { createProjectsIconAndButtonList } from './projectNav';
import { createProjectContent } from './projectContent';

const editProjectDialog = document.querySelector('.edit-project-dialog');

const submitEditProjectButton = document.querySelector(
  '.submit-edit-project-btn'
);

submitEditProjectButton.addEventListener('click', (e) => {
  e.preventDefault();

  let currentProjectInputElement = document.querySelector(
    '#edit-current-project'
  );
  let projectId = currentProjectInputElement.dataset.projectId;

  let projectName = document.querySelector('#edit-new-project').value;

  let updatedName = { projectName };

  updateProjectName(projectId, updatedName);

  editProjectDialog.close();
  document.querySelector('#edit-project-form').reset();

  createProjectContent(projectId);
  createProjectsIconAndButtonList();
});

const cancelEditProjectButton = document.querySelector(
  '.cancel-edit-project-btn'
);

cancelEditProjectButton.addEventListener('click', () => {
  editProjectDialog.close();
  document.querySelector('#edit-project-form').reset();
});

export { editProjectDialog };
