# Frontend Kit
### PUG(html) + Stylus(css) + JS(Babel)
## Installing:

``` console
    npm i
```

## Run

#### develop
``` console
    npm run start || gulp || gulp default
```

#### build
``` console
    npm run build || gulp build --build true
```

## Dependencies:

* git
* nodejs v.6

## Установка зависимостей
> сперва необходимо установить [NodeJs](https://nodejs.org/en/)

После установки NodeJs открываем консоль

``` console
npm i -g gulp-cli
npm i -g gulp@next
```
---
``` console
npm i
```
---
*Запуск dev сборки*
``` console
npm run start
```
*Запуск build сборки*
``` console
npm run build
```
---
## Краткий обзор проекта
* **_./build_** - собраные файлы
* **_./node_modules_** - установленые пакеты
* **_./config_** - конфигурации проекта
* **_./src_** - файлы проекта
    * **_/critical_** - критические файлы, встраиваются inline
    * **_/default_** - файлы использующиеся по всему проекту (общие картинки, шрифты, javascript, стили, шаблоны pug, svg спрайт)
    * **_/handlebars_** - настройки для спрайтов
    * **_/main_** - основные локальные файлы, по мере расширения проекта повторяющиеся части можно перенести в /default
* **_./gulpfile.babel.js_** - файл настроек таск менеджера Gulp
* **_./package.json_** - пакеты зависимостей проекта
