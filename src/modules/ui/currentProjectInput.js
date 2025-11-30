import { getProject } from '../logic/project';

// for: editTodoFrom & editProjectForm

function createCurrentProjectInput(projectId, htmlInputId) {
  let project = getProject(projectId);

  let inputElement = document.querySelector(htmlInputId);
  inputElement.setAttribute('data-project-id', project.id);
  inputElement.setAttribute('value', project.projectName);
  inputElement.textContent = project.projectName;
}

export { createCurrentProjectInput };
