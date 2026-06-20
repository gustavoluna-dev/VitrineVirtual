import os
import mysql.connector
from mysql.connector import pooling
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Criamos uma "Pool" (piscina) de conexões com o MySQL.
# A Pool mantém várias conexões abertas e prontas para uso, distribuindo-as sob demanda.
try:
    # IMPORTANTE: Pegamos a senha contendo caracteres especiais sem as aspas se vierem do .env
    password = os.getenv("DB_PASSWORD")
    if password and (password.startswith("'") and password.endswith("'") or password.startswith('"') and password.endswith('"')):
        password = password[1:-1]

    db_pool = mysql.connector.pooling.MySQLConnectionPool(
        pool_name="vitrine_pool",
        pool_size=10,  # Limite máximo de conexões simultâneas criadas pela Pool
        pool_reset_session=True,
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=password,
        database=os.getenv("DB_NAME", "VITRINE_NORMITH")
    )
    print("[OK] Pool de conexões MySQL configurada com sucesso!")
except mysql.connector.Error as err:
    print("[ERRO] Erro crítico ao configurar a Pool de conexões:")
    print(err)
    db_pool = None

# Helper para executar consultas SQL de forma segura e elegante.
# Essa função gerencia a abertura e o fechamento de conexões e cursores automaticamente.
def execute_query(query, params=None, is_write=False):
    """
    Executa uma consulta no banco de dados utilizando uma conexão da Pool.
    Retorna as linhas como dicionários (para compatibilidade fácil com JSON).
    Se is_write for True (INSERT, UPDATE, DELETE), realiza o commit e retorna o ID inserido ou linhas afetadas.
    """
    if not db_pool:
        raise Exception("A pool de conexões não está ativa.")
    
    conn = None
    cursor = None
    try:
        # Pega uma conexão disponível da Pool
        conn = db_pool.get_connection()
        # dictionary=True faz com que os registros retornados sejam dicionários, ex: {'ID_USUARIO': 1, 'NOME': 'Admin'}
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute(query, params or ())
        
        if is_write:
            conn.commit()
            # Retorna o ID gerado pelo AUTO_INCREMENT se for inserção, ou linhas afetadas
            return {
                "insertId": cursor.lastrowid,
                "affectedRows": cursor.rowcount
            }
        else:
            return cursor.fetchall()
            
    except mysql.connector.Error as err:
        print(f"[ERRO] Erro na execução da consulta: {err}")
        if conn and is_write:
            conn.rollback()  # Cancela as alterações caso ocorra um erro
        raise err
    finally:
        # Sempre fechamos o cursor e a conexão para devolvê-los à Pool
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Executamos um teste rápido de conexão assim que o servidor inicia
def test_connection():
    if not db_pool:
        print("[ERRO] Erro crítico: Pool de conexões não inicializada!")
        return False
    try:
        conn = db_pool.get_connection()
        print("[OK] Banco de dados MySQL conectado com sucesso!")
        conn.close()
        return True
    except mysql.connector.Error as err:
        print("[ERRO] Erro crítico: Não foi possível conectar ao MySQL!")
        print("Por favor, certifique-se de que o seu MySQL está rodando e de que as credenciais no .env estão corretas.")
        print(f"Detalhe do erro: {err}")
        return False
