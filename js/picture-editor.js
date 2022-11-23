const uploadFormElement = document.querySelector('#upload-select-image');
const scaleSmallerButton = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueButton = uploadFormElement.querySelector('.scale__control--value');
const imagePreviewContainer = uploadFormElement.querySelector('.img-upload__preview');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const sliderEffect = uploadFormElement.querySelector('.effect-level__slider');
const effectsList = uploadFormElement.querySelector('.effects__list');
const effectRangeValue = uploadFormElement.querySelector('.effect-level__value');
let slider;


function setScale(scale) {
  if(scale > 100) scale = 100;
  if(scale < 25) scale = 25;
  scaleValueButton.value = `${scale}%`;
  imagePreviewContainer.style.transform = `scale(${scale / 100})`;
};

scaleSmallerButton.addEventListener('click', () => {
  setScale(parseInt(scaleValueButton.value) - 25)
});

scaleBiggerButton.addEventListener('click', () => {
  setScale(parseInt(scaleValueButton.value) + 25)
});

function setEffect() {
  const effect = uploadFormElement.querySelector('.effects__radio:checked').value;
  const value = effectRangeValue.value;
  let filter = 'none';
  switch (effect) {
    case 'chrome':
      filter = `grayscale(${value/100})`
      break;
    case 'sepia':
      filter = `sepia(${value/100})`
      break;
    case 'marvin':
      filter = `invert(${value}%)`
      break;
    case 'phobos':
      filter = `blur(${value/100 * 3}px)`
      break;
    case 'heat':
      filter = `brightless(${value/100 * 2 + 1})`
      break;
    default:
      break;
}
imagePreviewContainer.style.filter = filter;
}

function initialSlider() {
  noUiSlider.create(sliderEffect, {
    range: {
      'min': 0,
      'max': 100,
    },
    start: 100,
    connect: 'lower',
    step: 0.1,
});
  sliderEffect.noUiSlider.on('update', () => {
    effectRangeValue.value = sliderEffect.noUiSlider.get();
    setEffect();
});

  return sliderEffect;
}

function visibledSlider(slider) {
  slider.classList.remove('hidden');
}
function hiddedSlider(slider) {
    slider.classList.add('hidden');
  }

function onChangeEffect (evt) {
  if (!slider) slider = initialSlider();
  if(evt.target.value === 'marvin') {
    slider.noUiSlider.updateOptions({
      step: 1
    });
} else {
    slider.noUiSlider.updateOptions({
      step: 0.1
});
}
  slider.noUiSlider.set(100);
  visibledSlider(slider)
  if(evt.target.value === 'none') hiddedSlider(slider);
  setEffect();
}

effectsList.addEventListener('change', onChangeEffect);
