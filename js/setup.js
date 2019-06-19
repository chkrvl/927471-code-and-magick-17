'use strict';

var WIZARD_QUANTITY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== userNameInput) {
    closePopup();
  }
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var setupPlayer = document.querySelector('.setup-player');
var wizardCoat = setupPlayer.querySelector('.wizard-coat');
var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
var wizardEyesInput = document.querySelector('.wizard-eyes-input');
var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
var wizardFireballInput = setupPlayer.querySelector('.wizard-fireball-input');

var changeCoatColor = function () {
  var notCurrentColors = wizardData.coatColorList.filter(function (color) {
    return color !== wizardCoat.style.fill;
  });
  wizardCoat.style.fill = getRandomElement(notCurrentColors);
};

var changeEyesColor = function () {
  var notCurrentColors = wizardData.eyesColorList.filter(function (color) {
    return color !== wizardEyesInput.value;
  });
  wizardEyesInput.value = getRandomElement(notCurrentColors);
  wizardEyes.style.fill = wizardEyesInput.value;
};

var changeFireballColor = function () {
  var notCurrentColors = wizardData.fireballColorList.filter(function (color) {
    return color !== wizardFireballInput.value;
  });
  wizardFireballInput.value = getRandomElement(notCurrentColors);
  wizardFireball.style.backgroundColor = wizardFireballInput.value;
};

wizardCoat.addEventListener('click', function () {
  changeCoatColor();
});

wizardEyes.addEventListener('click', function () {
  changeEyesColor();
});

wizardFireball.addEventListener('click', function () {
  changeFireballColor();
});

var wizardData = {
  firstNameList: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  secondNameList: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColorList: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColorList: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColorList: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomElement = function (arr) {
  var random = getRandomInt(0, arr.length);

  return arr[random];
};

var getRandomWizard = function (arr) {
  return {
    name: getRandomElement(arr.firstNameList) + ' ' + getRandomElement(arr.secondNameList),
    coatColor: getRandomElement(arr.coatColorList),
    eyesColor: getRandomElement(arr.eyesColorList)
  };
};

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


var getWizards = function (quantity) {
  var wizards = [];

  for (var i = 0; i < quantity; i++) {
    wizards.push(getRandomWizard(wizardData));
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = getWizards(WIZARD_QUANTITY);
var fragment = document.createDocumentFragment();

for (var i = 0; i < WIZARD_QUANTITY; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
