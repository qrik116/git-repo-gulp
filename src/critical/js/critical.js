//= polyfill.js

/**
 * Установка зависимостей
 *  - Ассинхронная загрузка зависимостей, после которых можно выполнить callback - функцию
 *    или подписаться на событие 'vendorinstall', которое срабатывает после загрузки.
 *
 * @param type (string)
 *  - путь к зависимости
 *
 * @param type (function)
 *  - callback - функция
 *
 * @return type (Element)
 *  - возращает script элемент, к которому можно подписаться на событие
 *
 */
function installVendor(vendor, fn) {

    var vendorScript = document.createElement('script');
    vendorScript.src = vendor;
    vendorScript.onload = function() {
        if (typeof fn === 'function')
            fn();
        EventLoad(vendorScript);
    };
    document.body.appendChild(vendorScript);

    function EventLoad(el) {
        try {
            var event = new Event('vendorinstall', {
              cancelable: true
            });
            if (!el.dispatchEvent(event)) {}
        } catch(e) {
            var event = document.createEvent("Event");
            event.initEvent('vendorinstall', false, true);
            if (!el.dispatchEvent(event)) {}
        }
    }

    return vendorScript;
}
/*******************************************************************************************************/

function DOMLoad(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}