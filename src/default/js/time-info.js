/**
 * TimeInfo v0.0.01
 * Copyright 2018 Evgeniy Kozirev
 */

;var TimeInfo = function TimeInfo(options, callback) {
    var self = this;
    var options = extend({}, {
        debugmode: true
    }, options || {});

    self.start = 0;
    self.end = 0;
    self.difference = 0;

    /**
     * Начало инициализации
     * 
     * @param type (function)
     *  - Callback функция, выполняемая после инициализации
     *
     */
    function initial(callback) {
        self.setStart(0);
        DOMready(differenceTime);
        if (typeof callback === 'function') {
            callback.call(self);
        }
        return self;
    }

    /**
     * Ожидание загрузки DOM
     * 
     * @param type (function)
     *  - Обработчик после загрузки DOM
     *
     * @param document
     *
     */
    function DOMready(fn) {
        // Обертка над функцией, для того чтобы поставить выполнение обработчика в конец цепочки
        var fn_wrap = function() {
            setTimeout(function() {
                fn();
            }, 0);
        }

        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn_wrap();
        } else {
            document.addEventListener('DOMContentLoaded', fn_wrap);
        }
    }

    /**
     * Разница между началом загрузки и концом
     */
    function differenceTime() {
        self.setEnd();
        self.difference = Math.floor(self.end - self.start);

        if (options.debugmode) {
            // console.log('Начало загрузки страницы \t>>> \t' + self.start);
            // console.log('Конец загрузки страницы \t>>> \t' + self.end);
            console.log('Время загрузки страницы \t>>> \t' + self.difference + ' мс.');
        }
    }

    /**
     * Расширение объекта
     * 
     * @param type (object)
     *  - пустой объект в который будет все сложено
     *
     */
    function extend(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    }


    initial(callback);
}

/**
 * Время создания
 */
TimeInfo.prototype.timestamp = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

/**
 * Установка начального времени
 *
 * @param type (number)
 *  - значение времени, в мс.
 *
 * @return false
 *
 */
TimeInfo.prototype.setStart = function setStart(value) {
    this.start = value !== undefined ? value : window.performance.now();
    return false;
}

/**
 * Получение начального времени
 *
 * @return type (number)
 *
 */
TimeInfo.prototype.getStart = function getStart() {
    return this.start;
}

/**
 * Установка конечного времени
 *
 * @param type (number)
 *  - значение времени, в мс.
 *
 * @return false
 *
 */
TimeInfo.prototype.setEnd = function setEnd(value) {
    this.end = value !== undefined ? value : window.performance.now();
    return false;
}

/**
 * Получение конечного времени
 *
 * @return type (number)
 *
 */
TimeInfo.prototype.getEnd = function getEnd() {
    return this.end;
}