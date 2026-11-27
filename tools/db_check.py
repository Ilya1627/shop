import os
import pymysql
from dotenv import load_dotenv

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
        cur.execute("SELECT COUNT(*) FROM requests")
        print("Requests:", cur.fetchone()[0])
finally:
    conn.close()
