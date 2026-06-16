import os
import mysql.connector
from dotenv import load_dotenv

# Carregar o .env do backend/api/.env
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'api', '.env')
load_dotenv(dotenv_path)

password = os.getenv("DB_PASSWORD")
if password and (password.startswith("'") and password.endswith("'") or password.startswith('"') and password.endswith('"')):
    password = password[1:-1]

print("Conectando ao MySQL...")
try:
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=password
    )
    cursor = conn.cursor()
    print("[OK] Conectado ao MySQL com sucesso!")

    # Executar o schema.sql
    schema_path = os.path.join(os.path.dirname(__file__), 'schema.sql')
    print(f"Executando {schema_path}...")
    with open(schema_path, 'r', encoding='utf-8') as f:
        schema_sql = f.read()

    results = cursor.execute(schema_sql, multi=True)
    for result in results:
        # Precisamos consumir os resultados de todas as queries para evitar erros de comando fora de sincronia
        result.fetchall() if result.with_rows else None
    
    conn.commit()
    print("[OK] Schema criado com sucesso!")

    # Executar o seed.sql
    seed_path = os.path.join(os.path.dirname(__file__), 'seed.sql')
    print(f"Executando {seed_path}...")
    with open(seed_path, 'r', encoding='utf-8') as f:
        seed_sql = f.read()

    results = cursor.execute(seed_sql, multi=True)
    for result in results:
        result.fetchall() if result.with_rows else None

    conn.commit()
    print("[OK] Dados iniciais (Seed) inseridos com sucesso!")

    cursor.close()
    conn.close()
    print("[OK] Banco de dados inicializado com sucesso!")
except Exception as e:
    print(f"[ERRO] Erro ao inicializar o banco de dados: {e}")
