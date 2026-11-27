# Сервис учета заявок и товаров

Учебный проект: API каталога товаров на Express с документацией.

## Технологии
Node.js, Express, MySQL, Python, JSDoc, OpenAPI.

## Требования
- Ubuntu Server, Node.js, npm, Python 3, MySQL
- Git

## Установка
1. Клонируйте репозиторий: `git clone git@github.com:julia2716/shop.git`
2. Установите зависимости: `npm install`
3. Создайте виртуальное окружение Python: `python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`

## Настройка
1. Создайте базу данных и пользователя MySQL.
2. Скопируйте `.env.example` в `.env` и укажите свои значения.
3. Примените миграции из `db/migrations/` и `db/seed.sql`.

## Запуск
`npm start` — сервер на порту из `.env` (по умолчанию 3000).

## API
| Метод | Путь | Описание |
|---|---|---|
| GET | /health | Проверка работоспособности |
| GET | /version | Версия API |
| GET | /products | Список товаров |
| GET | /products/{id} | Товар по идентификатору |

Интерактивная документация: `/docs`.

## Команда
Julia (GitHub: julia2716)
Проверено: README позволяет развернуть проект.
