const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


export const createPicture = (data) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imageElement = pictureElement.querySelector('.picture__img');
  const commentElement = pictureElement.querySelector('.picture__comments');
  const likesElement = pictureElement.querySelector('.picture__likes');

  imageElement.src = data.url;
  commentElement.textContent = data.comments;
  likesElement.textContent = data.likes;

  return pictureElement;
};
