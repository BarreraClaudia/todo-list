import {
  getTodayTodos,
  getNext7DaysTodos,
  getImportantTodos,
} from '../logic/todo';

import { createCategoryContent } from './categoryContent';
import { createProjectContent } from './projectContent';

const activeButtonContainers = document.querySelectorAll(
  '.active-btn-container'
);

activeButtonContainers.forEach((button) => {
  button.addEventListener('click', toggleActiveButton);
});

function toggleActiveButton(eventOrProjectId) {
  let currentActive = document.querySelector('.active');

  if (currentActive) {
    currentActive.classList.remove('active');
  }

  if (eventOrProjectId instanceof Event) {
    let projectButtonContainer = eventOrProjectId.target.closest(
      '.active-btn-container'
    );
    projectButtonContainer.classList.add('active');
  } else {
    let projectButtonContainer = document.querySelector(
      `li[data-project-id="${eventOrProjectId}"]`
    );
    projectButtonContainer.classList.add('active');
  }
}

// will create either project content or category content depending on which button is active
function createCurrentActiveContent() {
  let currentActive = document.querySelector('.active');

  if (currentActive.classList.contains('category-todos')) {
    let button = currentActive.lastElementChild;

    if (button.textContent === 'Today') {
      createCategoryContent(button.textContent, getTodayTodos());
    } else if (button.textContent === 'Next 7 Days') {
      createCategoryContent(button.textContent, getNext7DaysTodos());
    } else if (button.textContent === 'Important') {
      createCategoryContent(button.textContent, getImportantTodos());
    }
  } else if (currentActive.hasAttribute('data-project-id')) {
    createProjectContent(currentActive.dataset.projectId);
  }
}

export { toggleActiveButton, createCurrentActiveContent };
