import './styles/styles.css';

import { saveLibrary } from './modules/storage.js';

import { Library } from './modules/logic/library.js';
import { Project, addProject } from './modules/logic/project.js';
import { Todo, addTodo } from './modules/logic/todo.js';

import { createProjectsIconAndButtonList } from './modules/ui/projectNav.js';
import { createCurrentActiveContent } from './modules/ui/activeContent.js';
import { addTodoDialog } from './modules/ui/addTodoForm.js';
import { addProjectDialog } from './modules/ui/addProjectForm.js';
import { navbarToggle } from './modules/ui/responsiveNavigation.js';

// Save library if it doesn't exist, otherwise it will be overwritten every time you load
if (!JSON.parse(localStorage.getItem('Project Library'))) {
  let myLibrary = new Library();
  saveLibrary(myLibrary);

  let myProject = new Project("My To Do's");
  addProject(myProject);

  let exampleTodo = new Todo(
    "This is a to do example. Add projects and then add to do's to them!",
    'Add more details about your to do in the description!',
    new Date(),
    false
  );
  addTodo(myProject.id, exampleTodo);

  let exampleTodo2 = new Todo(
    'Click the chevron icon to see the description.',
    'Pretend details here...',
    new Date(),
    false
  );
  addTodo(myProject.id, exampleTodo2);

  let exampleTodo3 = new Todo(
    "Click the star icon to make this to do 'important'!",
    'More pretend details here...',
    new Date(),
    false
  );
  addTodo(myProject.id, exampleTodo3);

  let exampleTodo4 = new Todo(
    'Click the circle checkbox to mark the to do as completed.',
    'Blah blah blah...',
    new Date(),
    false
  );
  addTodo(myProject.id, exampleTodo4);
}

createProjectsIconAndButtonList();

createCurrentActiveContent();
