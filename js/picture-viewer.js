import { makeRequest } from './api.js';
import { createErrorMessage, createSuccessMessage } from './message.js';
import { isEscapeKey } from './util.js';

const formElement = document.querySelector('.img-upload__form');
const formInputElement = document.querySelector('#upload-file');
const openFormModalElement = document.querySelector('.img-upload__overlay');
const closeFormModalElement = document.querySelector('#upload-cancel');
const mainPageElement = document.querySelector('body');

const openModal = () => {
  openFormModalElement.classList.remove('hidden');
  mainPageElement.classList.add('modal-open');
  document.addEventListener('keydown', handleEsqKeydown);
};

export const closeModal = () => {
  openFormModalElement.classList.add('hidden');
  mainPageElement.classList.remove('modal-open');
  formElement.reset();
  document.removeEventListener('keydown', handleEsqKeydown);
};

//Открытие формы при загрузке файла
formInputElement.addEventListener('change', openModal);


// //Закрытие формы
closeFormModalElement.addEventListener('click',closeModal);

function handleEsqKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// //Валидация комментария в форме
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__description--text',
});

const setFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const onSuccessForm = () => {
      onSuccess();
      createSuccessMessage();
    };

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      makeRequest({ onSuccess: onSuccessForm, body: formData, method: 'POST', onFail: createErrorMessage });
    }
  });
};

export { setFormSubmit };
