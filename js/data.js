import {getRandomPositiveInteger} from './util.js';


let indexID = 0;
const createID = function() {
  indexID++;
  return indexID;
};

export function createPhoto() {
  return {
    id: createID(),
    url: `photos/${indexID}.jpg`,
    description: 'Описание фото',
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomPositiveInteger(0, 200),
  };
}
