const form = document.querySelector('.img-upload__form');
const formInput = document.querySelector('#upload-file');
const openFormModalElement = document.querySelector('.img-upload__overlay');
const closeFormModalElement = document.querySelector('#upload-cancel');
const mainPage = document.querySelector('body');

const openModal = () => {
  openFormModalElement.classList.remove('hidden');
  mainPage.classList.add('modal-open');
};


//Открытие формы при загрузке файла
formInput.addEventListener('change', openModal);


// //Закрытие формы
// closeFormModalElement.addEventListener('click', () => {
//   openFormModalElement.classList.add('hidden');
//   mainPage.classList.remove('modal-open');
// });

// document.addEventListener('keydown', (evt) => {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     openFormModalElement.classList.add('hidden');
//   }
// });

// //Валидация комментария в форме
// const pristine = new Pristine(form, {
//   classTo: 'img-upload__text',
//   errorTextParent: 'img-upload__text',
//   errorTextClass: 'text__description--text',
// });

// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid) {
//     form.submit();
//   }
// });