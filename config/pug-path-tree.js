import fs from 'fs';
import path from 'path';

module.exports = function(pathTemplate) {

  pathTemplate = pathTemplate.replace(/\/\*\.pug/, '') || 'src/main';
  /**
   * Нормализация пути
   *
   * В файле путь до другого файла может иметь вид `sidebar` или `partials/header`
   * поэтому каждый путь должен быть обработан.
   *
   * Эта функция добавляет к пути контекст или, проще говоря родительскую директорию.
   */
  function normalizePath(filepath, context) {
    if (context) {
      return path.join(context, filepath).replace(/\\/g, '/');
    }

    return filepath;
  }

  /**
   * Получение путей
   *
   * С помощью регулярного выражения, забираем из файла все пути из конструкций
   * extends и include.
   */
  function getPaths(source) {
    const match = source.match(/^\s*(include|extends)\s(.*)/gm);

    if (match) {
      return match.map((match) => {
        // Удаляем include, extends, а также расширение .pug если присутствует
        let _firstInitial = match.replace(/\s*(include|extends)\s([\w\/\.\-\_]+?)(\.pug|$)/g, '$2');
        // Проверяем имя файла, вдруг это не pug файл, тогда не добавляем ему .pug
        let _anotherPug = /\.(svg|css|html|js|styl)$/.test(_firstInitial);
        if (!_anotherPug) {
          _firstInitial += '.pug';
        }
        // console.log(match);
        // console.log(match.replace(/\s*(include|extends)\s([\w\/\.\-\_]+?)(\.pug|$)/g, '$2') + '.pug');
        // console.log(match.replace(/\s*(include|extends)./g, '') + '.pug');
        return _firstInitial;
      });
    }

    return null;
  }

  /**
   * Получение всех страниц из директории `app/templates`
   */
  function getPages() {
    return fs.readdirSync(pathTemplate).filter((filepath) => /pug$/.test(filepath));
  }

  /**
   * Чтение файла
   */
  function getPage(name) {
    const filepath = path.join(pathTemplate, name);

    try {
      return fs.readFileSync(filepath).toString();
    } catch (err) {
      return false;
    }
  }

  /**
   * Вычисление древа зависимостей
   * 
   * Функция рекурсивно проходит по всем зависимостям и заносит их в массив.
   */
  function calculateTree(target, context, tree) {
    const page = getPage(target);
    if (!page) {
      return tree;
    }

    let paths = getPaths(page);

    if (!paths) {
      return tree;
    }

    paths = paths.map((filepath) => normalizePath(filepath, path.dirname(target)));
    paths.forEach((filepath) => {
      tree = calculateTree(filepath, path.dirname(target), tree);
    });

    return tree.concat(paths);
  }

  /**
   * Получение зависимостей для каждой из страниц
   */
    const cacheTree = {};
    getPages().forEach((page) => {
      cacheTree[page] = calculateTree(page, null, [page]);
    });

    return cacheTree;
}