function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (string, length) {
  return string.length <= length;
}

let indexID = 0;

const createID = function() {
  indexID++;
  return indexID;
}

function createPhoto() {
  return {
    id: createID(),
    url: 'photos/${indexID}.jpg',
    description: 'Описание фото',
    likes: getRandomPositiveInteger(15, 200),
    comments: getRandomPositiveInteger(0, 200),
  }
}

const resultArray = Array.from({length: 25}, createPhoto);
