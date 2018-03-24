/**
 * LazyLoadImg v0.1.0
 * Copyright 2018 Evgeniy Kozirev
 *
 * Ленивая загрузка изображений. На данный момент реализована загрузка по расстоянию.
 * Пример ожно посмотреть в конце.
 *
 */


'use strict';

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['lazyloadimg'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, LazyLoadImg ) {
            if ( LazyLoadImg === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    LazyLoadImg = require('lazyloadimg');
                }
                else {
                    LazyLoadImg = require('lazyloadimg')(root);
                }
            }
            factory(LazyLoadImg);
            return LazyLoadImg;
        };
    } else {
        // Browser globals
        factory(LazyLoadImg);
    }
}(function (fn) {
    LazyLoadImg = fn;
    if (typeof jQuery !== 'undefined') {
        $.fn.extend({
            LazyLoadImg: function(_options, _fn) {
                if (this.length) {
                    fn(this, _options, _fn);
                }
                return this;
            }
        });
    }
}));


function LazyLoadImg(selector, options) {

    var _document = document,
        ERROR_MESSAGE = 'Невозможно обработать переданный селектор, используйте текстовый селектор или ' +
         'jquery.';

    var options = Object.assign({}, {
        offsetStartLoad: 0, // сдвиг, чтобы загрузить изображение раньше
        initLoad: false,
        afterLoad: false,
        fullLoading: false
    }, options || {}),
        elements = [],
        arrImg = [];

    selector = selector || 'img[data-src]';

    // Обработка селектора
    switch(typeof selector) {
        case 'string':
            elements = _document.querySelectorAll(selector); // <--- обычный селектор
            break;

        case 'object': 
            if ('jquery' in selector) { // <--- объект jquery
                selector.each(function(index, item) {
                    elements.push(item);
                });
            }
            break;

        default:
            throw new TypeError(ERROR_MESSAGE); // <--- Не соответствие типу данных
            break;
    }

    function init() {
        if (elements.length) {
            initialArrImg();

            loadImg();
            window.addEventListener('scroll', function() {
                loadImg();
            });

            checkFullLoadingImg();
        }
    }

    function initialArrImg () {
        arrImg = Array.prototype.map.call(elements, function(item, i) {
            return {
                offset: item.offset(),
                imgDOM: item,
                load: false,
                fullLoading: false
            };
        });
    }

    function loadImg() {
        var scrollTop = window.pageYOffset;
        var offsetWindow = scrollTop + window.innerHeight,
            offsetStartLoad = 100; // сдвиг, чтобы начать грузить раньше
        arrImg.forEach(function(item) {
            if ((offsetWindow) >= item.offset.top - options.offsetStartLoad) {
                if (!item.load) {
                    item.imgDOM.setAttribute('src', item.imgDOM.getAttribute('data-src'));
                    if (options.initLoad) 
                        options.initLoad.call(item.imgDOM); // <----- начало загрузки
                    item.imgDOM.setAttribute('data-src', '');
                    item.load = true;
                    item.imgDOM.addEventListener('load', function() { // фиксация полной загрузки
                        item.fullLoading = true;
                        if (options.afterLoad) options.afterLoad.call(item.imgDOM); // <----- конец загрузки
                    });
                }
            }
        });
    }

    function checkFullLoadingImg() { // Проверка на полную загрузку всех изображений, которые попали в список

        if (typeof options.fullLoading === 'function') {
            var timerid = setInterval(function() {
                var check = false;
                arrImg.forEach(function(item) {
                    check = item.fullLoading;
                });
                if (check) {
                    options.fullLoading();
                    clearInterval(timerid);
                }
            }, 500);
        }
    }

    init();

    return elements;
}

/******************************** E X A M P L E ********************************/

// document.addEventListener('DOMContentLoaded', function() {
//     $('img[data-src]').LazyLoadImg({
//         offsetStartLoad: 300,
//         initLoad: function() {
//             console.log('Начало загрузки >> ', this);
//         },
//         afterLoad: function() {
//             console.log('Завершение загрузки >>', this);
//         },
//         fullLoading: function() {
//             console.log('Загрузка изображений завершена');
//         }
//     });

//     LazyLoadImg('img[data-src]', {
//         offsetStartLoad: 300,
//         initLoad: function() {
//             console.log('Начало загрузки >> ', this);
//         },
//         afterLoad: function() {
//             console.log('Завершение загрузки >>', this);
//         },
//         fullLoading: function() {
//             console.log('Загрузка изображений завершена');
//         }
//     });
// })