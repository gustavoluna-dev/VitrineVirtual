// Importamos os módulos necessários:
import express from 'express'; // O Express é o framework que cria o servidor HTTP e gerencia as rotas
import cors from 'cors';       // O CORS permite que seu frontend React acesse este servidor sem bloqueio de segurança
import dotenv from 'dotenv';   // Carrega as variáveis de ambiente do arquivo .env
import db from './config/db.js'; // Importa a nossa Pool de conexão com o banco MySQL que criamos
import bcrypt from 'bcryptjs'; // Fazemos o Hash da senha -> Pegamos a senha do usuário e escondemos ela numa senha fake maior

// Inicializa a leitura das variáveis de ambiente do .env
dotenv.config();

// Criamos a nossa aplicação Express
const app = express();

// ==========================================
// CONFIGURAÇÃO DE MIDDLEWARES (INTERCEPTADORES)
// ==========================================

// Ativamos o CORS. Isso diz ao servidor: "Tudo bem se um frontend rodando em outra porta (ex: 5173 do React) me chamar".
app.use(cors());

// Habilitamos o Express a entender dados enviados no formato JSON.
// Quando o frontend enviar dados (como criar um novo produto), o Express vai ler o texto JSON e convertê-lo em objeto JS.
app.use(express.json());

// ==========================================
// DEFINIÇÃO DAS ROTAS (ENDPOINTS)
// ==========================================

// Rota 1: Rota raiz (Health Check). Serve para testarmos direto no navegador se a API está online!
// Se você abrir 'http://localhost:5000/' no seu navegador, vai ver essa resposta JSON.
app.get('/', (req, res) => {
  res.json({
    status: "online",
    mensagem: "Bem-vindo à API da Vitrine Virtual de Tacos de Sinuca! 🎱",
    documentacao: "Acesse /api/categorias ou /api/produtos para ver os dados."
  });
});

// Rota 2: Listar todas as Categorias
// Quando o frontend fizer uma chamada para 'http://localhost:5000/api/categorias'
app.get('/api/categorias', async (req, res) => {
  try {
    // Usamos await porque a consulta ao banco de dados leva tempo. 
    // O array retornado contém: [as_linhas_do_banco, os_metadados_das_colunas]. Só nos interessam as linhas!
    const [linhas] = await db.query('SELECT * FROM CATEGORIAS');
    
    // Retornamos as linhas para o frontend no formato JSON com status HTTP 200 (Sucesso)
    res.status(200).json(linhas);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error.message);
    // Se der algum problema no MySQL, avisamos o frontend com status 500 (Erro Interno do Servidor)
    res.status(500).json({ error: 'Erro ao buscar categorias no banco de dados.' });
  }
});

// Rota 3: Listar todos os Produtos (com opção de filtrar por Categoria)
// Exemplo de uso: 'http://localhost:5000/api/produtos' ou 'http://localhost:5000/api/produtos?categoriaId=1'
app.get('/api/produtos', async (req, res) => {
  try {
    // Pegamos o "categoriaId" que pode ter sido passado na URL (Query Parameter)
    const { categoriaId } = req.query;

    let querySQL = 'SELECT * FROM PRODUTOS';
    let queryParams = [];

    // Se o frontend passou um id de categoria na URL, filtramos os produtos
    if (categoriaId) {
      querySQL = 'SELECT * FROM PRODUTOS WHERE CATEGORIA_ID = ?';
      queryParams.push(categoriaId);
    }

    // Executamos a consulta passando o SQL e os parâmetros de filtro de forma segura (previne SQL Injection)
    const [linhas] = await db.query(querySQL, queryParams);

    res.status(200).json(linhas);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados.' });
  }
});

// Rota 4: Criar um novo Produto (Útil para o seu Painel Administrativo futuramente!)
// Usamos o método POST porque estamos enviando novos dados para salvar no banco.
app.post('/api/produtos', async (req, res) => {
  try {
    // Pegamos os dados enviados pelo corpo da requisição (req.body)
    const { NOME, DESCRICAO, PRECO, IMAGEM_URL, ESTOQUE, MADEIRA, PESO, TAMANHO, VIROLA, CATEGORIA_ID } = req.body;

    // Validação simples: campos obrigatórios precisam estar preenchidos
    if (!NOME || !DESCRICAO || !PRECO || !IMAGEM_URL) {
      return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios (nome, descrição, preço e imagem).' });
    }

    const sql = `
      INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO, IMAGEM_URL, ESTOQUE, MADEIRA, PESO, TAMANHO, VIROLA, CATEGORIA_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const valores = [NOME, DESCRICAO, PRECO, IMAGEM_URL, ESTOQUE || 1, MADEIRA, PESO, TAMANHO, VIROLA, CATEGORIA_ID];

    // Executa a inserção no banco
    const [resultado] = await db.query(sql, valores);

    // Retorna o produto recém-criado com status 201 (Criado com Sucesso)
    res.status(201).json({
      mensagem: 'Produto cadastrado com sucesso!',
      id_produto: resultado.insertId, // Retorna o ID gerado automaticamente pelo AUTO_INCREMENT
      dados: req.body
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error.message);
    res.status(500).json({ error: 'Erro ao salvar produto no banco de dados.' });
  }
});

// ==========================================
// ROTAS DE GERENCIAMENTO DE USUÁRIOS
// ==========================================

// 1. Listar Usuários (GET)
app.get('/api/usuarios', async (req, res) => {
  try {
    const [linhas] = await db.query('SELECT ID_USUARIO, NOME, EMAIL, TIPO, CRIADO_EM FROM USUARIOS');
    res.status(200).json(linhas);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.message);
    res.status(500).json({ error: 'Erro ao buscar usuários no banco de dados.' });
  }
});

// 2. Cadastrar Novo Usuário (POST)
app.post('/api/usuarios', async (req, res) => {
  try {
    const { NOME, EMAIL, SENHA, TIPO } = req.body;

    if (!NOME || !EMAIL || !SENHA) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios (nome, e-mail e senha).' });
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(SENHA, saltRounds);

    const sql = 'INSERT INTO USUARIOS (NOME, EMAIL, SENHA, TIPO) VALUES (?, ?, ?, ?)';
    const [resultado] = await db.query(sql, [NOME, EMAIL, senhaCriptografada, TIPO || 'colaborador']);

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      id_usuario: resultado.insertId
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado no sistema.' });
    }
    res.status(500).json({ error: 'Erro ao salvar usuário no banco de dados.' });
  }
});

// 3. Deletar Usuário (DELETE)
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM USUARIOS WHERE ID_USUARIO = ?';
    const [resultado] = await db.query(sql, [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({ mensagem: 'Usuário removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error.message);
    res.status(500).json({ error: 'Erro ao remover usuário do banco de dados.' });
  }
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================

// Pega a porta configurada no .env (ou usa a 5000 caso não exista)
const PORT = process.env.PORT || 5000;

// O servidor começa a escutar (ouvir) requisições na rede
app.listen(PORT, () => {
  console.log(`🚀 Servidor da API rodando em: http://localhost:${PORT}`);
  console.log(`🎱 Pronto para receber conexões!`);
});
