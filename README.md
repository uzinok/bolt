# Для верстки с нуля BOLT

Подготовил: [Александр Зиновьев](https://uzinok.ru/)

## Краткое описание

Сборка предназначена для верстки проектов с использованием препроцессора SCSS и шаблонизатора NUNJUCKS. JavaSript код обрабатывается Babel. В данной сборке предполагается подготовка графики, шрифтов заранее. То есть во время сборки проекта графика, шрифты и тому подобные фалы не конвертируются в необходимые форматы. .js, .css, .html фалы минифицируются

## Таски и их описание
1.	`gulp build` - сборка проекта. (исходные файлы (.scss, .njk, .js) не копируются в сборку)
2.	`gulp start` - сборка проекта и запуск сервера
3.	`gulp optiImg` - оптимизация графики ('src/img/')
4.	`gulp createRastr` - конвертирует графику в webp и делает ритину
5.	`gulp fonts` конвертация шрифтов из формата .ttf в форматы .woff и .woff2. (исходные файлы для конвертации в папке 'src/resource/img/', .ttf не попадает в сборку)
6.	`gulp sprite` - создание .svg-спрайта (исходные .svg для спрайта папке 'src/resource/svg/'). Подключить спрайт можно так: `{% include 'img/sprite.svg' %}`

## Файлы и папки
1.	`dest/` - готовая сборка (находится в списке .gitignore)
2.	`src/` - исходные файлы для сборки проекта
3.	`src/resource/` - папка для файлов требующих дополнительных действий, напимер, конвертацию в другие форматы
4.	`.jsbeautifyrc` - файл настройки для плагина [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) VSC
5.	`postcss-sorting.json` - файл настройки для плагина [PostCSS Sorting](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-postcss-sorting) VSC. Файл взят из репозитория [htmlacademy](https://github.com/htmlacademy/codeguide/blob/master/.postcss-sorting.json), за что им отдельная благодарность.

## Перед установкой сборщика необходимо:

* [устнаовить node.js](https://nodejs.org/) используется пакет npm
* [глобально установить gulp](https://gulpjs.com/) для работы команд gulp
* [глобально установить browser-sync](https://browsersync.io/) для работы виртуального сервера

`$ node -v
v20.10.0`

`$ npm -v
10.2.3`
