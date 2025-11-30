import {
  getTodayTodos,
  getNext7DaysTodos,
  getImportantTodos,
} from '../logic/todo';

import { createTodoElementsFromArray } from './todo';

import { replace } from 'feather-icons';

// categories are nav buttons: Today, Next 7 Days, Important

function createCategoryHeading(category) {
  const heading = document.createElement('h2');
  heading.classList.add('category-heading');
  heading.textContent = category;
  return heading;
}

function createCategoryContent(heading, todosArray) {
  let contentContainer = document.querySelector('#content');
  contentContainer.replaceChildren();

  let headingContent = createCategoryHeading(heading);
  let todosContent = createTodoElementsFromArray(todosArray);

  contentContainer.appendChild(headingContent);
  contentContainer.appendChild(todosContent);

  feather.replace();
}

const todayTodosButton = document.querySelector('.today-todo-icon-and-btn');

todayTodosButton.addEventListener('click', () => {
  let todayTodosArray = getTodayTodos();
  createCategoryContent('Today', todayTodosArray);
});

const next7DaysTodosButton = document.querySelector(
  '.next-7-days-todo-icon-and-btn'
);

next7DaysTodosButton.addEventListener('click', () => {
  let next7DaysTodosArray = getNext7DaysTodos();
  createCategoryContent('Next 7 Days', next7DaysTodosArray);
});

const importantTodosButton = document.querySelector(
  '.important-todo-icon-and-btn'
);

importantTodosButton.addEventListener('click', () => {
  let importantTodosArray = getImportantTodos();
  createCategoryContent('Important', importantTodosArray);
});

export { createCategoryContent };
