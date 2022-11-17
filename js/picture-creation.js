import { createPhoto } from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

export function createPhotoElement(data){
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageNode = pictureElement.querySelector('.picture__img');
  const commentsNode = pictureElement.querySelector('.picture__comments');
  const likesNode = pictureElement.querySelector('.picture__likes');
        commentsNode.textContent = data.likes;
        likesNode.textContent = data.comments;
        imageNode.src = data.url;
  return pictureElement;
}

const picturesContainer = document.querySelector('.pictures');
const similarPictures = createPhotoArray();
const similarListFragment = document.createDocumentFragment();

similarPictures.forEach((dataPic) => {
  similarListFragment.append(createPhotoElement(dataPic));
});

picturesContainer.append(similarListFragment);