export function saveLibrary(library) {
  localStorage.setItem('Project Library', JSON.stringify(library));
}
