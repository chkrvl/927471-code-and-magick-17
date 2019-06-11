'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var COLUMN_GAP = 50;
var COLUMN_WIDTH = 40;
var COLUMN_MAX_HEIGHT = 150;
var FONT_SIZE = 16;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var paintStatisticBar = function (namePlayer) {
  var colorBar;
  var opacityBar = Math.random();

  if (namePlayer === 'Вы') {
    colorBar = 'rgba(255, 0, 0, 1)';
  } else {
    colorBar = 'rgba(0, 0, 255, ' + opacityBar + ')';
  }

  return colorBar;
};

var renderHystogram = function (ctx, namePlayer, timePlayer) {
  var maxTime = getMaxElement(timePlayer);

  for (var i = 0; i < namePlayer.length; i++) {
    var time = Math.round(timePlayer[i]);
    var columnHeight = (time * COLUMN_MAX_HEIGHT) / maxTime;

    ctx.fillStyle = paintStatisticBar(namePlayer[i]);
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - FONT_SIZE - GAP, COLUMN_WIDTH, -columnHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(namePlayer[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(time, CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - FONT_SIZE - GAP - FONT_GAP - columnHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  renderHystogram(ctx, names, times);
};
