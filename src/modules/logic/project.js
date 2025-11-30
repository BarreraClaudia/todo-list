import { getLibrary } from './library';
import { saveLibrary } from '../storage';

export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.todos = [];
    this.id = crypto.randomUUID();
  }
}

export function addProject(newProject) {
  let library = getLibrary();

  let currentProjects = library.projects || [];

  let updatedProjects = [...currentProjects, newProject];

  library.projects = updatedProjects;

  saveLibrary(library);
}

export function getProject(projectId) {
  let library = getLibrary();
  let project = library.projects.filter((proj) => proj.id === projectId);
  return project[0];
}

export function updateProjectName(projectId, updatedName) {
  let library = getLibrary();
  let oldProject = library.projects.filter((proj) => proj.id === projectId);

  Object.assign(oldProject[0], updatedName);

  saveLibrary(library);
}

export function deleteProject(projectId) {
  let library = getLibrary();

  let index = library.projects.findIndex((proj) => proj.id === projectId);

  library.projects.splice(index, 1);

  saveLibrary(library);
}
