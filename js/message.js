import { isEscapeKey } from './util.js';

const pageContainer = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const activeMessage = document.querySelector('.message-popup');
    if(activeMessage) {closeMessage(activeMessage);}
  }
}

function openMessage(container, messageElement) {
  container.append(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown);
}

function closeMessage(messageElement) {
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
}

function createSuccessMessage() {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  openMessage(pageContainer, successMessageElement);

  successMessageElement.addEventListener('click', () => {
    closeMessage(successMessageElement);
  });
}

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

function createErrorMessage(err) {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  const errorMessageElementTitle = errorMessageElement.querySelector('.error__title');
  errorMessageElementTitle.textContent = err?.message || 'Ошибка загрузки файла';
  openMessage(pageContainer, errorMessageElement);

  errorMessageElement.addEventListener('click', () => {
    closeMessage(errorMessageElement);
  });
}

export { createSuccessMessage, createErrorMessage };
