'use strict';
(function () {
  var URL = 'https://js.dump.academy/code-and-magick';

  // var setXHR = function (onLoad, onError, data, timeout, requestMethod, requestURL) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'json';

  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === 200) {
  //       onLoad(xhr.response);
  //     } else {
  //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
  //     }
  //   });
  //   xhr.addEventListener('error', function () {
  //     onError('Произошла ошибка соединения');
  //   });
  //   xhr.addEventListener('timeout', function () {
  //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  //   });

  //   xhr.timeout = timeout;

  //   xhr.open(requestMethod, requestURL);
  //   xhr.send(data);
  // };

  // var load = setXHR(undefined, undefined, undefined, 10000, 'GET', URL + '/data');
  // var load = setXHR(undefined, undefined, undefined, 10000, 'POST', URL);

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
