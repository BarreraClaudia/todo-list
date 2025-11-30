import { getLibrary } from '../logic/library';

import { createIcon } from './icon';
import { createProjectContent } from './projectContent';
import { toggleActiveButton } from './activeContent';

const feather = require('feather-icons');

function createProjectsIconAndButtonList() {
  let library = getLibrary();

  let projectsList = document.querySelector('.projects-list');
  projectsList.replaceChildren();

  library.projects.forEach((project) => {
    let listItem = document.createElement('li');

    listItem.setAttribute('data-project-id', project.id);
    listItem.classList.add('project-icon-and-btn', 'active-btn-container');

    let folderIcon = createIcon('folder-icon-container', 'folder');
    listItem.appendChild(folderIcon);

    let button = document.createElement('button');
    button.textContent = project.projectName;
    listItem.appendChild(button);

    projectsList.appendChild(listItem);

    listItem.addEventListener('click', () => createProjectContent(project.id));
    listItem.addEventListener('click', toggleActiveButton);
  });

  // Replaces all elements that have a data-feather attribute with SVG markup corresponding to the element's data-feather attribute value.
  feather.replace();
}

export { createProjectsIconAndButtonList };
