[![Tests](https://github.com/Suzanne-Samoilova/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/Suzanne-Samoilova/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

![JavaScript](https://img.shields.io/badge/-JavaScript-f3de35?logo=javaScript&logoColor=black)
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![Node](https://img.shields.io/badge/-Node.js-469837?logo=Node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-56a14b?logo=mongodb&logoColor=white)
![API](https://img.shields.io/badge/-API-blue)
![WebStorm](https://img.shields.io/badge/-WebStorm-blue?logo=WebStorm)


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком


## Роуты
Для пользователей:</br>
```sh
GET /users — возвращает всех пользователей из базы
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя с переданными в теле запроса name, about и avatar
PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар
```
Для карточек:</br>
```sh
GET /cards — возвращает все карточки из базы
POST /cards — создаёт карточку с переданными в теле запроса name и link. owner проставляется
DELETE /cards/:cardId — удаляет карточку по _id
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки
```


## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

###
[![Link to repository](https://img.shields.io/badge/-%D0%A0%D0%B5%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D0%B9%20%D1%81%20%D0%B1%D1%8D%D0%BA%D0%B5%D0%BD%D0%B4%D0%BE%D0%BC%20Mesto%20%D0%A1%D0%B0%D0%BC%D0%BE%D0%B9%D0%BB%D0%BE%D0%B2%D0%B0%20%D0%A1%D1%8E%D0%B7%D0%B0%D0%BD%D0%BD%D0%B0-black?logo=GitHub)](https://github.com/Suzanne-Samoilova/express-mesto-gha)

