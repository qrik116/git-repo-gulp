'use strict';

// object-fit polyfill (for img)
if ('objectFit' in document.documentElement.style === false) {
    document.addEventListener('DOMContentLoaded', function () {
        Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
            (image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

            image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
        });
    });
}

// include sprite SVG from localStorage
// (function (window, document) {
//     'use strict';

//     var file = 'images/sprite.svg',
//         revision = 1;

//     if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
//         return true;

//     var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
//         request,
//         data,
//         insertIT = function () {
//             document.body.insertAdjacentHTML('afterbegin', data);
//         },
//         insert = function () {
//             if (document.body) insertIT();
//             else document.addEventListener('DOMContentLoaded', insertIT);
//         };

//     if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
//         data = localStorage.getItem('inlineSVGdata');
//         if (data) {
//             insert();
//             return true;
//         }
//     }

//     try {
//         request = new XMLHttpRequest();
//         request.open('GET', file, true);
//         request.onload = function () {
//             if (request.status >= 200 && request.status < 400) {
//                 data = request.responseText;
//                 insert();
//                 if (isLocalStorage) {
//                     localStorage.setItem('inlineSVGdata', data);
//                     localStorage.setItem('inlineSVGrev', revision);
//                 }
//             }
//         }
//         request.send();
//     }
//     catch (e) {
//     }

// }(window, document));

installVendor('js/vendors.js', () => {

svg4everybody();

DOMLoad(() => {

});

});

WinLoad(() => {
    installVendor('js/LazyLoadImg.js', () => {
        LazyLoadImg('img[data-src]');
    });
});