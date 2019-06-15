'use strict';

var WIZARD_QUANTITY = 4;

var wizardData = {
  firstNameList: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  secondNameList: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColorList: ['rgb(101, 137, 164', 'rgb(241, 43, 107', 'rgb(146, 100, 161', 'rgb(56, 159, 117', 'rgb(215, 210, 55', 'rgb(0, 0, 0'],
  eyesColorList: ['black', 'red', 'blue', 'yellow', 'green']
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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

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

var fragment = document.createDocumentFragment();
for (var i = 0; i < getWizards(WIZARD_QUANTITY).length; i++) {
  fragment.appendChild(renderWizard(getWizards(WIZARD_QUANTITY)[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
