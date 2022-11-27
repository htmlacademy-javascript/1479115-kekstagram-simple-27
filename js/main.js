import './picture-viewer.js';
import './picture-editor.js';
import { createPicture } from './picture-creation.js';
import { makeRequest } from './api.js';
import { closeModal, setFormSubmit } from './picture-viewer.js';
import { createErrorMessage } from './message.js';

const containerPicturesElement = document.querySelector('.pictures');

const renderSimilarPictures = (similarPicrure) => {
  const similarListFragment = document.createDocumentFragment();
  similarPicrure.forEach((dataPic) => {
    similarListFragment.append(createPicture(dataPic));
  });
  containerPicturesElement.append(similarListFragment);
};

const onSuccessData = (pictures) => {
  renderSimilarPictures(pictures);
};

setFormSubmit(closeModal);

makeRequest({endpoint: 'data', onSuccess:onSuccessData, onFail: createErrorMessage});
