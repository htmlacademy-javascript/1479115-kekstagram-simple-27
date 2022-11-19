import './picture-viewer.js';
import {createPhoto} from './data.js';
import { createPhotoElement } from './picture-creation.js';

const picturesContainer = document.querySelector('.pictures');

const resultArray = Array.from({length: 25}, createPhoto);
const similarListFragment = document.createDocumentFragment();

resultArray.forEach((dataPic) => {
  similarListFragment.append(createPhotoElement(dataPic));
});

picturesContainer.append(similarListFragment);
