import { handleEsqKeydown as handleEsqKeydownPopupEditor } from './picture-viewer.js';
import { isEscapeKey } from './util.js';

const pageContainerElement = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const activeMessageElement = document.querySelector('.message-popup');
    if(activeMessageElement) {closeMessage(activeMessageElement);}
  }
}

function openMessage(container, messageElement) {
  container.append(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('keydown', handleEsqKeydownPopupEditor);
}

function closeMessage(messageElement) {
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('keydown', handleEsqKeydownPopupEditor);
}

function createSuccessMessage() {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  openMessage(pageContainerElement, successMessageElement);

  successMessageElement.addEventListener('click', (e) => {
    const target = e.target;
    if(target.classList.contains('button-close') || target.classList.contains('message-popup')) {
      closeMessage(successMessageElement);
    }
  });
}

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

function createErrorMessage() {
  const errorMessageElement = errorMessageTemplate.cloneNode(true);
  const errorMessageElementTitle = errorMessageElement.querySelector('.error__title');
  errorMessageElementTitle.textContent = 'Ошибка загрузки файла';
  openMessage(pageContainerElement, errorMessageElement);

  errorMessageElement.addEventListener('click', (e) => {
    const target = e.target;
    if(target.classList.contains('button-close') || target.classList.contains('message-popup')) {
      closeMessage(errorMessageElement);
    }
  });
}

export { createSuccessMessage, createErrorMessage };
