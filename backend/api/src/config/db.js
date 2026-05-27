// Importamos o driver do MySQL na versão "promise".
// "Promise" em JavaScript significa que o código pode rodar de forma assíncrona, 
// ou seja, a nossa aplicação não fica "travada" esperando o banco responder.
import mysql from 'mysql2/promise';

// Importamos a biblioteca "dotenv" para carregar as configurações salvas no arquivo .env
import dotenv from 'dotenv';

// Executamos o dotenv para ler as variáveis de ambiente e disponibilizá-las em "process.env"
dotenv.config();

// Criamos uma "Pool" (piscina) de conexões. 
// Por que uma Pool e não uma conexão única?
// Em produção, vários usuários podem acessar o site ao mesmo tempo. 
// A Pool mantém várias conexões abertas e prontas para uso, distribuindo-as sob demanda.
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Pega o 'localhost' configurado no .env
  user: process.env.DB_USER,       // Pega o 'root' configurado no .env
  password: process.env.DB_PASSWORD, // Pega a senha configurada no .env
  database: process.env.DB_NAME,   // Pega 'VITRINE_NORMITH' configurado no .env
  waitForConnections: true,        // Se todas as conexões estiverem ocupadas, espera liberar uma
  connectionLimit: 10,             // Limite máximo de conexões simultâneas criadas pela Pool
  queueLimit: 0                    // Sem limite de requisições na fila de espera
});

// Fazemos um teste rápido assim que o servidor inicia para avisar se a conexão deu certo ou se falhou!
pool.getConnection()
  .then((conn) => {
    console.log('✅ Banco de dados MySQL conectado com sucesso!');
    conn.release(); // Sempre liberamos a conexão de volta para a Pool depois de testar
  })
  .catch((err) => {
    console.error('❌ Erro crítico: Não foi possível conectar ao MySQL!');
    console.error('Por favor, certifique-se de que o seu MySQL está rodando e de que as credenciais no .env estão corretas.');
    console.error('Detalhe do erro:', err.message);
  });

// Exportamos a Pool de conexão para podermos usá-la em outros arquivos (como nas rotas de produtos)
export default pool;
