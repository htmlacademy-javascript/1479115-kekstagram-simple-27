import {
  MAX_SCALE_IMAGE,
  MIN_SCALE_IMAGE,
  SCALE_STEP,
  MIN_SLIDER_VALUE,
  MAX_SLIDER_VALUE,
  START_SLIDER_VALUE,
  STEP_SLIDER_DEFAULT,
  START_SLIDER_MARVIN
} from './constants.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const scaleSmallerButtonElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueButtonElement = uploadFormElement.querySelector('.scale__control--value');
const imagePreviewContainerElement = uploadFormElement.querySelector('.img-upload__preview');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const sliderEffectElement = uploadFormElement.querySelector('.effect-level__slider');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const effectRangeValueElement = uploadFormElement.querySelector('.effect-level__value');
let slider;


function setScale(scale) {
  if(scale > MAX_SCALE_IMAGE) {scale = MAX_SCALE_IMAGE;}
  if(scale < MIN_SCALE_IMAGE) {scale = MIN_SCALE_IMAGE;}
  scaleValueButtonElement.value = `${scale}%`;
  imagePreviewElement.style.transform = `scale(${scale / 100})`;
}

scaleSmallerButtonElement.addEventListener('click', () => {
  setScale(parseInt(scaleValueButtonElement.value, 10) - SCALE_STEP);
});

scaleBiggerButtonElement.addEventListener('click', () => {
  setScale(parseInt(scaleValueButtonElement.value, 10) + SCALE_STEP);
});

function clearEffect() {
  imagePreviewContainerElement.style.filter = '';
}

function setEffect() {
  const effect = uploadFormElement.querySelector('.effects__radio:checked').value;
  const value = effectRangeValueElement.value;
  let filter = 'none';
  switch (effect) {
    case 'chrome':
      filter = `grayscale(${value / 100})`;
      break;
    case 'sepia':
      filter = `sepia(${value / 100})`;
      break;
    case 'marvin':
      filter = `invert(${value}%)`;
      break;
    case 'phobos':
      filter = `blur(${value / 100 * 3}px)`;
      break;
    case 'heat':
      filter = `brightness(${value / 100 * 2 + 1})`;
      break;
    default:
      break;
  }
  imagePreviewContainerElement.style.filter = filter;
}

function initialSlider() {
  noUiSlider.create(sliderEffectElement, {
    range: {
      'min': MIN_SLIDER_VALUE,
      'max': MAX_SLIDER_VALUE,
    },
    start: START_SLIDER_VALUE,
    connect: 'lower',
    step: STEP_SLIDER_DEFAULT,
  });
  sliderEffectElement.noUiSlider.on('update', () => {
    effectRangeValueElement.value = sliderEffectElement.noUiSlider.get();
    setEffect();
  });

  return sliderEffectElement;
}

export function clearSliderSettings() {
  if(slider){
    slider.noUiSlider.destroy();
    slider = null;
  }
  setScale(MAX_SCALE_IMAGE);
  clearEffect();

}

function visibleSlider(sliderElement) {
  sliderElement.classList.remove('hidden');
}

function hiddenSlider(sliderElement) {
  sliderElement.classList.add('hidden');
}

function onChangeEffect (evt) {
  if (!slider) {slider = initialSlider();}
  if(evt.target.value === 'marvin') {
    slider.noUiSlider.updateOptions({
      step: START_SLIDER_MARVIN
    });
  } else {
    slider.noUiSlider.updateOptions({
      step: STEP_SLIDER_DEFAULT
    });
  }
  slider.noUiSlider.set(START_SLIDER_VALUE);
  visibleSlider(slider);
  if(evt.target.value === 'none') {hiddenSlider(slider);}
  setEffect();
}

effectsListElement.addEventListener('change', onChangeEffect);
