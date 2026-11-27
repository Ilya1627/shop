"""Проверка подключения к MySQL: подсчёт товаров."""

import os
import pymysql
from dotenv import load_dotenv

def count_products() -> int:
    """Возвращает количество товаров в таблице products.

    Параметры подключения берутся из переменных окружения DB_HOST,
    DB_USER, DB_PASSWORD и DB_NAME (или из файла .env).

    Returns:
        int: число строк в таблице products.

    Raises:
        pymysql.err.OperationalError: если не удалось подключиться к БД.
    """
    load_dotenv()
    conn = pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        charset="utf8mb4",
    )
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM products")
            return cur.fetchone()[0]
    finally:
        conn.close()

if __name__ == "__main__":
    print("Products:", count_products())
