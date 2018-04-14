//= polyfill.js

/**
 * Установка зависимостей
 *  - Ассинхронная загрузка зависимостей, после которых можно выполнить callback - функцию
 *    или подписаться на событие 'vendorinstall', которое срабатывает после загрузки.
 *
 * @param type (string|array)
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

    if (vendor.forEach) {
        vendor.forEach(function(el, i, arr) {
            var vendorScript = document.createElement('script');
            vendorScript.type = "text/javascript";
            vendorScript.src = el;
            if (i == arr.length) {
                vendorScript.onload = function() {
                    if (typeof fn === 'function')
                        fn();
                    EventLoad(vendorScript);
                };
            }
            document.head.appendChild(vendorScript);
        });
    } else {
        var vendorScript = document.createElement('script');
        vendorScript.type = "text/javascript";
        vendorScript.src = vendor;
        vendorScript.onload = function() {
            if (typeof fn === 'function')
                fn();
            EventLoad(vendorScript);
        };
        document.head.appendChild(vendorScript);
    }

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

function WinLoad(fn) {
    window.addEventListener('load', fn);
}

DOMLoad(() => {

    let _document = document;

    // Ассинхронная загрузка стилей
    (styleFiles => {
        if (styleFiles && styleFiles.length) {
            Array.prototype.forEach.call(styleFiles, styleFile => {
                let vendorCss = document.createElement('link');
                vendorCss.rel = 'stylesheet';
                vendorCss.href = styleFile.getAttribute('asynccss');
                _document.head.insertBefore(vendorCss, styleFile);
                _document.head.removeChild(styleFile.nextElementSibling);
                _document.head.removeChild(styleFile);
            });
        }
    })(_document.head.querySelectorAll('script[asynccss]'));

});