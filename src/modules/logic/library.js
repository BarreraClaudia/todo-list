export class Library {
  constructor() {
    this.projects = [];
  }
}

export function getLibrary() {
  let library = JSON.parse(localStorage.getItem('Project Library'));
  return library;
}
