import os
import bcrypt
import mysql.connector
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

# Importamos a Pool de conexão e helpers de consulta que criamos
from config.db import execute_query, test_connection

# Inicializa a leitura das variáveis de ambiente do .env
load_dotenv()

# Criamos a nossa aplicação Flask
app = Flask(__name__)

# Ativamos o CORS. Isso diz ao servidor: "Tudo bem se um frontend rodando em outra porta (ex: 5173 do React) me chamar".
CORS(app)

# ==========================================
# DEFINIÇÃO DAS ROTAS (ENDPOINTS)
# ==========================================

# Rota 1: Rota raiz (Health Check). Serve para testarmos direto no navegador se a API está online!
# Se você abrir 'http://localhost:5000/' no seu navegador, vai ver essa resposta JSON.
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "mensagem": "Bem-vindo à API da Vitrine Virtual de Tacos de Sinuca! 🎱",
        "documentacao": "Acesse /api/categorias ou /api/produtos para ver os dados."
    }), 200

# Rota 2: Listar todas as Categorias
# Quando o frontend fizer uma chamada para 'http://localhost:5000/api/categorias'
@app.route('/api/categorias', methods=['GET'])
def get_categorias():
    try:
        # Executamos a consulta no banco de dados. O helper já nos devolve uma lista de dicionários.
        linhas = execute_query('SELECT * FROM CATEGORIAS')
        return jsonify(linhas), 200
    except Exception as error:
        print('Erro ao buscar categorias:', error)
        # Se der algum problema no MySQL, avisamos o frontend com status 500 (Erro Interno do Servidor)
        return jsonify({"error": "Erro ao buscar categorias no banco de dados."}), 500

# Rota 3: Listar todos os Produtos (com opção de filtrar por Categoria)
# Exemplo de uso: 'http://localhost:5000/api/produtos' ou 'http://localhost:5000/api/produtos?categoriaId=1'
@app.route('/api/produtos', methods=['GET'])
def get_produtos():
    try:
        # Pegamos o "categoriaId" que pode ter sido passado na URL (Query Parameter)
        categoria_id = request.args.get('categoriaId')

        query_sql = 'SELECT * FROM PRODUTOS'
        query_params = []

        # Se o frontend passou um id de categoria na URL, filtramos os produtos
        if categoria_id:
            query_sql = 'SELECT * FROM PRODUTOS WHERE CATEGORIA_ID = %s'
            query_params.append(categoria_id)

        # Executamos a consulta passando o SQL e os parâmetros de filtro de forma segura (previne SQL Injection)
        linhas = execute_query(query_sql, query_params)
        return jsonify(linhas), 200
    except Exception as error:
        print('Erro ao buscar produtos:', error)
        return jsonify({"error": "Erro ao buscar produtos no banco de dados."}), 500

# Rota 4: Criar um novo Produto (Útil para o seu Painel Administrativo futuramente!)
# Usamos o método POST porque estamos enviando novos dados para salvar no banco.
@app.route('/api/produtos', methods=['POST'])
def create_produto():
    try:
        # Pegamos os dados enviados pelo corpo da requisição (req.json)
        dados = request.get_json() or {}
        
        nome = dados.get('NOME')
        descricao = dados.get('DESCRICAO')
        preco = dados.get('PRECO')
        imagem_url = dados.get('IMAGEM_URL')
        estoque = dados.get('ESTOQUE', 1)
        madeira = dados.get('MADEIRA')
        peso = dados.get('PESO')
        tamanho = dados.get('TAMANHO')
        virola = dados.get('VIROLA')
        categoria_id = dados.get('CATEGORIA_ID')

        # Validação simples: campos obrigatórios precisam estar preenchidos
        if not nome or not descricao or preco is None or not imagem_url:
            return jsonify({"error": "Por favor, preencha todos os campos obrigatórios (nome, descrição, preço e imagem)."}), 400

        sql = """
            INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO, IMAGEM_URL, ESTOQUE, MADEIRA, PESO, TAMANHO, VIROLA, CATEGORIA_ID)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        valores = [nome, descricao, preco, imagem_url, estoque, madeira, peso, tamanho, virola, categoria_id]

        # Executa a inserção no banco
        resultado = execute_query(sql, valores, is_write=True)

        # Retorna o produto recém-criado com status 201 (Criado com Sucesso)
        return jsonify({
            "mensagem": "Produto cadastrado com sucesso!",
            "id_produto": resultado["insertId"],  # Retorna o ID gerado automaticamente pelo AUTO_INCREMENT
            "dados": dados
        }), 201
    except Exception as error:
        print('Erro ao cadastrar produto:', error)
        return jsonify({"error": "Erro ao salvar produto no banco de dados."}), 500

# ==========================================
# ROTAS DE GERENCIAMENTO DE USUÁRIOS
# ==========================================

# 1. Listar Usuários (GET)
@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    try:
        # IMPORTANTE: Selecionamos apenas os campos necessários, OMITINDO o hash da senha por segurança!
        linhas = execute_query('SELECT ID_USUARIO, NOME, EMAIL, TIPO, CRIADO_EM FROM USUARIOS')
        return jsonify(linhas), 200
    except Exception as error:
        print('Erro ao buscar usuários:', error)
        return jsonify({"error": "Erro ao buscar usuários no banco de dados."}), 500

# 2. Cadastrar Novo Usuário (POST)
@app.route('/api/usuarios', methods=['POST'])
def create_usuario():
    try:
        dados = request.get_json() or {}
        nome = dados.get('NOME')
        email = dados.get('EMAIL')
        senha = dados.get('SENHA')
        tipo = dados.get('TIPO', 'colaborador')

        if not nome or not email or not senha:
            return jsonify({"error": "Preencha todos os campos obrigatórios (nome, e-mail e senha)."}), 400

        # Geramos o hash seguro Bcrypt da senha digitada
        senha_bytes = senha.encode('utf-8')
        salt = bcrypt.gensalt(10)
        senha_criptografada = bcrypt.hashpw(senha_bytes, salt).decode('utf-8')

        sql = 'INSERT INTO USUARIOS (NOME, EMAIL, SENHA, TIPO) VALUES (%s, %s, %s, %s)'
        resultado = execute_query(sql, [nome, email, senha_criptografada, tipo], is_write=True)

        return jsonify({
            "mensagem": "Usuário cadastrado com sucesso!",
            "id_usuario": resultado["insertId"]
        }), 201
    except mysql.connector.Error as error:
        print('Erro de banco ao cadastrar usuário:', error)
        # Trata erro de e-mail duplicado
        if error.errno == 1062:  # Código de erro MySQL para chave duplicada
            return jsonify({"error": "Este e-mail já está cadastrado no sistema."}), 400
        return jsonify({"error": "Erro ao salvar usuário no banco de dados."}), 500
    except Exception as error:
        print('Erro geral ao cadastrar usuário:', error)
        return jsonify({"error": "Erro interno ao cadastrar usuário."}), 500

# 3. Deletar Usuário (DELETE)
@app.route('/api/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    try:
        sql = 'DELETE FROM USUARIOS WHERE ID_USUARIO = %s'
        resultado = execute_query(sql, [id], is_write=True)

        if resultado["affectedRows"] == 0:
            return jsonify({"error": "Usuário não encontrado."}), 404

        return jsonify({"mensagem": "Usuário removido com sucesso!"}), 200
    except Exception as error:
        print('Erro ao deletar usuário:', error)
        return jsonify({"error": "Erro ao remover usuário do banco de dados."}), 500

# 4. Login do Usuário (POST)
@app.route('/api/login', methods=['POST'])
def login_usuario():
    try:
        dados = request.get_json() or {}
        email = dados.get('EMAIL')
        senha = dados.get('SENHA')

        if not email or not senha:
            return jsonify({"error": "E-mail e senha são obrigatórios."}), 400

        # Busca o usuário pelo e-mail
        sql = 'SELECT * FROM USUARIOS WHERE EMAIL = %s'
        usuarios = execute_query(sql, [email])

        # Se não encontrar o usuário, retorna erro 401 (Credenciais inválidas)
        if not usuarios:
            return jsonify({"error": "E-mail ou senha incorretos."}), 401

        usuario = usuarios[0]

        # Compara a senha informada com o hash salvo no banco de dados
        senha_bytes = senha.encode('utf-8')
        hash_salvo_bytes = usuario['SENHA'].encode('utf-8')

        if not bcrypt.checkpw(senha_bytes, hash_salvo_bytes):
            return jsonify({"error": "E-mail ou senha incorretos."}), 401

        # Login bem-sucedido! Retorna os dados básicos do usuário (omitindo a senha por segurança)
        return jsonify({
            "mensagem": "Login realizado com sucesso!",
            "usuario": {
                "ID_USUARIO": usuario['ID_USUARIO'],
                "NOME": usuario['NOME'],
                "EMAIL": usuario['EMAIL'],
                "TIPO": usuario['TIPO']
            }
        }), 200
    except Exception as error:
        print('Erro ao realizar login:', error)
        return jsonify({"error": "Erro interno ao realizar o login."}), 500

# ==========================================
# INICIALIZAÇÃO DO SERVIDOR
# ==========================================
if __name__ == '__main__':
    # Fazemos um teste rápido de conexão assim que o servidor inicia
    test_connection()
    
    # Pega a porta configurada no .env (ou usa a 5000 caso não exista)
    PORT = int(os.getenv("PORT", 5000))
    
    # O servidor começa a escutar (ouvir) requisições na rede
    print(f"[RUNNING] Servidor da API rodando em: http://localhost:{PORT}")
    print("[INFO] Pronto para receber conexões!")
    app.run(host="0.0.0.0", port=PORT, debug=True)
