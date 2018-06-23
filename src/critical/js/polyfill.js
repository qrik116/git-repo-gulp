/**
 * Polifyll v1.0.0
 * Copyright 2018 Evgeniy Kozirev
 */

/**
 * Polifyll Object.assign
 *
 * @param {object} Объект, в который произойдет копирование
 *
 * @param {object} ...arg Объекты, которые будут скопированны
 *
 * @return {object} Новый объект
 */
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}

/**
 * Element hasClass
 *
 * @param {string} className селектор
 *
 * @return {boolean}
 *  - Возвращает true, если есть класс с указанным именем,
 *  - Возвращает false, если нет класса с указанным именем
 */
if (!Element.hasClass) {
    Object.defineProperty(Element.prototype, 'hasClass', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function (className) {
            if (this.classList)
                return this.classList.contains(className);
            else
                return new RegExp('(^|\\s)' + className.split(' ').join('|') + '(\\s|$)', 'gi').test(this.className);
        }
    })
}

/**
 * Element addClass
 *
 * @param {string} className селектор
 *
 * @return {Element} Element, Возвращает элемент, которому был(и) добавлен(ы) класс(ы)
 */
if (!Element.addClass) {
    Object.defineProperty(Element.prototype, 'addClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (className) {
            if (this.classList)
                this.classList.add(className);
            else
                this.className += ' ' + className;

            return this;
        }
    })
}

/**
 * NodeList addClass
 *
 * @param {string} className селектор
 *
 * @return {NodeList} NodeList, Возвращает элементы, которому был(и) добавлен(ы) класс(ы)
 */
if (!NodeList.addClass) {
    Object.defineProperty(NodeList.prototype, 'addClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (className) {
            Array.prototype.forEach.call(this, function(item) {
                if (item.classList)
                    item.classList.add(className);
                else
                    item.className += ' ' + className;
            });
            return this;
        }
    })
}

/**
 * Element removeClass
 *
 * @param {string} className селектор
 *
 * @return {Element} Element, Возвращает элемент, в котором был(и) удален(ы) класс(ы)
 */
if (!Element.removeClass) {
    Object.defineProperty(Element.prototype, 'removeClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (className) {
            if (this.classList)
                this.classList.remove(className);
            else
                this.className = this.className.replace(new RegExp('(^|\\s)(' + className.split(' ').join('|') + ')(\\s|$)', 'gi'), '');

            return this;
        }
    })
}

/**
 * NodeList removeClass
 *
 * @param {string} className селектор
 *
 * @return {NodeList} NodeList, Возвращает элементы, в котором был(и) удален(ы) класс(ы)
 */
if (!NodeList.removeClass) {
    Object.defineProperty(NodeList.prototype, 'removeClass', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (className) {
            Array.prototype.forEach.call(this, function(item) {
                if (item.classList)
                    item.classList.remove(className);
                else
                    item.className = this.className.replace(new RegExp('(^|\\s)(' + className.split(' ').join('|') + ')(\\s|$)', 'gi'), '');
            });
            return this;
        }
    })
}

/**
 * NodeList addEventListener
 * Добавляет возможность подписаться на события из NodeList
 *
 * @param {string} _event Event name, 'click', 'mouseup' ...
 *
 * @param {function} fn обработчик события
 *
 * @return {Element} Element, Возвращает элемент, в котором произошло событие
 */
if (!NodeList.addEventListener) {
    Object.defineProperty(NodeList.prototype, 'addEventListener', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function addEventListener(_event, fn) {
            Array.prototype.forEach.call(this, function(item) {
                item.addEventListener(_event, fn);
            })
            return this;
        }
    })
}

/**
 * Element offset
 * Определение смещения
 *
 * @return {Element} Element, Возвращает объект с длинами. { top: 10, left: 10 }
 */
if (!Element.offset) {
    Object.defineProperty(Element.prototype, 'offset', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function () {
            var rect = this.getBoundingClientRect();
            return {
                top: rect.top + (window.pageYOffset || document.body.scrollTop),
                left: rect.left + (window.pageYOffset || document.body.scrollLeft)
            }
        }
    })
}

/**
 * Element closest
 * Определение смещения
 *
 * @return {Element} Element, Возвращает найденный элемент или null
 */
if (!Element.closest) {
    Element.prototype.matches = Element.prototype.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

    Object.defineProperty(Element.prototype, 'closest', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function closest(selector) {
            if (!this) return null;
            if (this.matches(selector)) return this;
            if (!this.parentElement) {return null}
            else return this.parentElement.closest(selector)
        }
    })
}
