'use strict';
(function () {
  var WIZARD_QUANTITY = 4;

  var setup = document.querySelector('.setup');
  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardCoatInput = setupPlayer.querySelector('.wizard-coat-input');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('.wizard-eyes-input');
  var wizardFireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var wizardFireballInput = setupPlayer.querySelector('.wizard-fireball-input');

  var changeCoatColor = function () {
    var notCurrentColors = wizardData.coatColorList.filter(function (color) {
      return color !== wizardCoat.style.fill;
    });
    wizardCoat.style.fill = getRandomElement(notCurrentColors);
    wizardCoatInput.value = wizardCoat.style.fill;
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

  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARD_QUANTITY; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
  });
})();

