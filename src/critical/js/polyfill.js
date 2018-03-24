/**
 * Polifyll v0.0.01
 * Copyright 2018 Evgeniy Kozirev
 */

/*
 * Polifyll Objec.assign
 *
 * @param type (object)
 *  - Объект, в который произойдет копирование
 *
 * @param type (object) ...arg
 *  - Объекты, которые будут скопированны
 *
 * @return type (object)
 *  - Полученный объект
 *
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

/*
 * Element hasClass
 *
 * @param type (string)
 *  - className
 *
 * @return type (boolean)
 *  - Возвращает true, если есть класс с указанным именем,
 *  - Возвращает false, если нет класса с указанным именем
 *
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

/*
 * Element addClass
 *
 * @param type (string)
 *  - className
 *
 * @return type (Element)
 *  - Возвращает элемент, которому был(и) добавлен(ы) класс(ы)
 *
 */
if (!Element.addClass) {
    Object.defineProperty(Element.prototype, 'addClass', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function (className) {
            if (this.classList)
                this.classList.add(className);
            else
                this.className += ' ' + className;

            return this;
        }
    })
}

/*
 * Element removeClass
 *
 * @param type (string)
 *  - className
 *
 * @return type (Element)
 *  - Возвращает элемент, в котором был(и) удален(ы) класс(ы)
 *
 */
if (!Element.removeClass) {
    Object.defineProperty(Element.prototype, 'removeClass', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function (className) {
            if (this.classList)
                this.classList.remove(className);
            else
                this.className = this.className.replace(new RegExp('(^|\\s)(' + className.split(' ').join('|') + ')(\\s|$)', 'gi'), '');

            return this;
        }
    })
}

/*
 * NodeList addEventListener
 * Добавляет возможность подписаться на события из NodeList
 *
 * @param type (string)
 *  - Event name, 'click', 'mouseup' ...
 *
 * @param type (function)
 *  - обработчик события
 *
 * @return type (Element)
 *  - Возвращает элемент, в котором произошло событие
 *
 */
if (!NodeList.addEventListener) {
    Object.defineProperty(NodeList.prototype, 'addEventListener', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function addEventListener(_event, fn) {
            Array.prototype.forEach.call(this, function(item) {
                item.addEventListener(_event, fn);
            })
            return this;
        }
    })
}