// used for projectNav, projectContent(header) and todo
function createIcon(containerClass, dataFeatherAttribute) {
  let iconContainer = document.createElement('div');
  iconContainer.classList.add(containerClass);

  let icon = document.createElement('i');
  icon.setAttribute('data-feather', dataFeatherAttribute);
  icon.classList.add('feather-icon');

  iconContainer.appendChild(icon);

  return iconContainer;
}

export { createIcon };
