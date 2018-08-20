/**
 * LazyLoadImg v0.2.0
 * Copyright 2018 Evgeniy Kozirev
 *
 * Ленивая загрузка изображений.
 * Реализованно 2 режима работы:
 *  - 'ondemand' (default) — загрузка изображения по требованию
 *  - 'progressive' — загрузка изображений фоном по очереди
 * Пример можно посмотреть в конце.
 *
 */

;'use strict';

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        if (typeof window['LazyLoadImg'] === 'undefined') {
            window['LazyLoadImg'] = factory;
        }

        if (typeof jQuery !== 'undefined') {
            if (!(LazyLoadImg in $.fn)) {
                $.fn.extend({
                    LazyLoadImg: factory
                });
            }
        }
    }
})(
    /*
     *  - набор опций:
     *     #debug (bollean)
     *       - Отображение информации о загрузке
     *     #mode (string): 
     *       - 'ondemand' (default) — загрузка изображения по требованию
     *       - 'progressive' — загрузка изображений фоном по очереди
     *     #offsetStartLoad (number): 0 (default) 
     *       - сдвиг, чтобы загрузить изображение раньше
     *     #initLoad (function): false (default) 
     *       - callback, при старте загрузки изображения из набора
     *     #afterLoad (function): false (default) 
     *       - callback, при окончании загрузки изображения из набора
     *     #fullLoading (function): false (default) 
     *       - callback, при окончании загрузки всех изображений
     */
    /**
     * 
     * @param {string|object} selector селектор
     * @param {object} options набор опций
     * @return {NodeList} набор всех элементов
     */
    function LazyLoadImg(selector, options) {

        var MESSAGES = {
            typeError: 'Невозможно обработать переданный селектор, используйте текстовый селектор или ' +
            'jquery.',
            initLoad: 'Начало загрузки >> ',
            afterLoad: 'Завершение загрузки >> ',
            fullLoading: 'Загрузка всех изображений завершена.'
        };
        var DEBUGERS = {
            initLoad: function (item) {
                console.log(MESSAGES.initLoad, item || '');
            },
            afterLoad: function (item) {
                console.log(MESSAGES.afterLoad, item || '');
            },
            fullLoading: function () {
                console.log(MESSAGES.fullLoading);
            }
        };

        var options = Object.assign({}, {
            debug: false,
            mode: 'ondemand',
            offsetStartLoad: 0,
            initLoad: null,
            afterLoad: null,
            fullLoading: null
        }, options || {});

        var _document = document,
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
                throw new TypeError(MESSAGES.typeError); // <--- Не соответствие типу данных
                break;
        }

        function init() {
            if (elements.length) {
                initialArrImg();

                // обработка режима загрузки
                switch(options.mode) {
                    case 'ondemand':
                        loadImgOndemand();
                        window.addEventListener('scroll', function() {
                            loadImgOndemand();
                        });
                        break;
                    case 'progressive':
                        loadImgProgressive();
                        break;
                }
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

        function loadImgOndemand() {
            var scrollTop = window.pageYOffset;
            var offsetWindow = scrollTop + window.innerHeight;

            arrImg.forEach(function(item) {
                if ((offsetWindow) >= item.offset.top - options.offsetStartLoad) {
                    loadImg(item); // загрузка изображения
                }
            });
        }

        function loadImgProgressive(count) {
            count = typeof count === 'number' ? count : 0;
            if (count < arrImg.length) {
                loadImg(arrImg[count]).addEventListener('load', function onloadprogressive() {
                    loadImgProgressive(++count);
                    this.removeEventListener('load', onloadprogressive);
                });
            }
        }

        function loadImg(item) { // загрузка изображения
            if (!item.load) {
                clearImage(item);
                item.load = true;
                if (options.debug) DEBUGERS.initLoad(item.imgDOM); // <----- начало загрузки
                if (typeof options.initLoad === 'function') options.initLoad.call(item.imgDOM); 
                item.imgDOM.addEventListener('load', function() { // фиксация полной загрузки
                    item.fullLoading = true;
                    if (options.debug) DEBUGERS.afterLoad(item.imgDOM); // <----- конец загрузки
                    if (typeof options.afterLoad === 'function') options.afterLoad.call(item.imgDOM); 
                    var _check = arrImg.every(function(item) {
                        return item.fullLoading;
                    });
                    if (_check) { // <----- конец загрузки всех изображений
                        if (options.debug) DEBUGERS.fullLoading();
                        if (typeof options.fullLoading === 'function') options.fullLoading();
                    }
                });
            }
            return item.imgDOM;
        }

        function clearImage(item) { // очистка изображения от лишних атрибутов
            item.imgDOM.setAttribute('src', item.imgDOM.getAttribute('data-src'));
            item.imgDOM.removeAttribute('data-src');
        }

        init();

        return elements;
    }
);
/******************************** E X A M P L E ********************************/

// document.addEventListener('DOMContentLoaded', function() { // or window.addEventListener('load')
//     var options = {
//         mode: 'ondemand',
//         offsetStartLoad: 300,
//         initLoad: function() {

//         },
//         afterLoad: function() {

//         },
//         fullLoading: function() {

//         }
//     }

//     $('img[data-src]').LazyLoadImg(options);

//     LazyLoadImg('img[data-src]', options);
// })