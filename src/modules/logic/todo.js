import { getLibrary } from './library';
import { saveLibrary } from '../storage';
import { addDays, compareAsc, format, isWithinInterval } from 'date-fns';

export class Todo {
  constructor(title, description, dueDate, isImportant) {
    this.title = title;
    this.description = description;
    this.dueDate = format(dueDate, 'MM/dd/yyyy');
    this.isImportant = isImportant;
    this.isCompleted = false;
    this.id = crypto.randomUUID();
  }
}

export function addTodo(projectId, newTodo) {
  let library = getLibrary();

  library.projects.forEach((project) => {
    if (project.id === projectId) {
      let currentTodos = project.todos || [];

      let updatedTodos = [...currentTodos, newTodo];

      project.todos = sortTodosByDate(updatedTodos);
    }
  });

  saveLibrary(library);
}

export function updateTodo(projectId, todoId, updatedData) {
  let library = getLibrary();
  let project = library.projects.filter((proj) => proj.id === projectId);
  let oldTodo = project[0].todos.filter((todo) => todo.id === todoId);

  Object.assign(oldTodo[0], updatedData);

  saveLibrary(library);
}

export function deleteTodo(projectId, todoId) {
  let library = getLibrary();
  let project = library.projects.filter((proj) => proj.id === projectId);
  let index = project[0].todos.findIndex((todo) => todo.id === todoId);

  project[0].todos.splice(index, 1);

  saveLibrary(library);
}

export function toggleIsImportant(projectId, todoId) {
  let library = getLibrary();
  let project = library.projects.filter((proj) => proj.id === projectId);
  let todo = project[0].todos.filter((todo) => todo.id === todoId);

  todo[0].isImportant = !todo[0].isImportant;

  saveLibrary(library);
}

export function toggleIsCompleted(projectId, todoId) {
  let library = getLibrary();
  let project = library.projects.filter((proj) => proj.id === projectId);

  let todo = project[0].todos.filter((todo) => todo.id === todoId);

  todo[0].isCompleted = !todo[0].isCompleted;

  saveLibrary(library);
}

function sortTodosByDate(todos) {
  return todos.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
}

// Logic for nav buttons "category todos"

export function getTodayTodos() {
  const currentDate = format(new Date(), 'MM/dd/yyyy');

  let library = getLibrary();

  let todayTodos = library.projects
    .map((project) => {
      project.todos = project.todos.filter(
        (todo) => todo.dueDate === currentDate
      );
      return project;
    })
    .filter((project) => project.todos.length !== 0);

  return todayTodos;
}

export function getNext7DaysTodos() {
  const now = format(new Date(), 'MM/dd/yyyy');

  const sevenDaysFromNow = format(addDays(now, 7), 'MM/dd/yyyy');

  let library = getLibrary();

  let next7DaysTodos = library.projects
    .map((project) => {
      project.todos = project.todos.filter((todo) =>
        isWithinInterval(todo.dueDate, { start: now, end: sevenDaysFromNow })
      );
      return project;
    })
    .filter((project) => project.todos.length !== 0);

  return next7DaysTodos;
}

export function getImportantTodos() {
  let library = getLibrary();

  let importantTodos = library.projects
    .map((project) => {
      project.todos = project.todos.filter((todo) => todo.isImportant === true);
      return project;
    })
    .filter((project) => project.todos.length !== 0);

  return importantTodos;
}
