# Vitrine Virtual - Tacos de Sinuca

Uma plataforma completa de vitrine virtual interativa para a comercialização de tacos de sinuca personalizados e profissionais. O sistema é composto por uma vitrine moderna voltada para os clientes finais, um painel administrativo seguro para controle de estoque, gerenciamento de produtos, categorias, usuários e customizações visuais do site, além de uma API REST desenvolvida em Flask integrada a um banco de dados relacional MySQL.

---

## Estrutura do Projeto

O repositório está estruturado em uma arquitetura monorepo com as seguintes pastas e componentes principais:

```text
VitrineVirtual/
├── backend/
│   ├── api/                 # API REST em Flask (Python)
│   │   ├── src/             # Código-fonte da API (Rotas, Controladores e Helpers)
│   │   │   ├── config/      # Configurações de sistema (ex: Pool de Conexão MySQL)
│   │   │   └── app.py       # Ponto de entrada do servidor Flask
│   │   ├── requirements.txt # Dependências e bibliotecas do backend Python
│   │   └── .env             # Variáveis de ambiente da API (configurações locais e credenciais)
│   │
│   ├── admin_panel/         # Painel Administrativo em React + Vite + Tailwind CSS
│   │   ├── src/             # Componentes, templates e visualizações de gerência (Dashboard, EditSite, etc.)
│   │   ├── package.json     # Dependências do painel administrativo
│   │   └── vite.config.js   # Configuração do bundler Vite para a aplicação admin
│   │
│   └── database/            # Scripts SQL e de inicialização do Banco de Dados
│       ├── schema.sql       # Estrutura física das tabelas no MySQL
│       ├── seed.sql         # Dados iniciais e registros fictícios para demonstração
│       └── init_db.py       # Script Python automatizado para criação e população do banco
│
├── frontend/                # Vitrine Virtual do Cliente (Apresentação Principal)
│   ├── src/                 # Componentes visuais da vitrine interativa
│   ├── package.json         # Dependências do frontend do cliente
│   └── vite.config.js       # Configuração do bundler Vite para a aplicação principal
└── README.md                # Documentação geral do ecossistema do projeto (Este arquivo)
```

---

## Tecnologias e Bibliotecas Utilizadas

### 1. Frontend & Painel Administrativo (Interface do Usuário)
As interfaces do cliente e do administrador foram construídas com o que há de mais moderno no ecossistema JavaScript/React:

*   **React 19 & React DOM 19**: Biblioteca declarativa e eficiente para construção de interfaces reativas baseadas em componentes reutilizáveis.
*   **Vite 8**: Ferramenta de build extremamente rápida com suporte a Hot Module Replacement (HMR) instantâneo durante o desenvolvimento.
*   **Tailwind CSS v4 (com integração `@tailwindcss/vite`)**: Framework utilitário de estilização altamente otimizado para layouts limpos, modernos e responsivos.
*   **Splide.js (`@splidejs/react-splide` / `@splidejs/splide`)**: Biblioteca leve e responsiva para a criação de carrosséis e sliders dinâmicos de exibição de produtos.
*   **Base UI (`@base-ui/react`)**: Biblioteca de componentes primitivos não estilizados focada em acessibilidade e facilidade de integração estrutural.
*   **Lucide React**: Conjunto de ícones vetoriais modernos e altamente personalizáveis utilizados na navegação e nos botões de ação.
*   **clsx, tailwind-merge & class-variance-authority (CVA)**: Utilitários para criação e composição dinâmica de classes Tailwind CSS, garantindo códigos limpos e evitando conflitos de estilo.

### 2. Backend API (Servidor de Aplicação)
O servidor localizado em `backend/api/` gerencia a inteligência de negócios, persistência de dados, autenticação de usuários e upload seguro de mídias:

*   **Flask 3.0.3**: Micro-framework Python robusto, leve e ideal para a construção de APIs RESTful de alta performance.
*   **Flask-CORS 4.0.1**: Middleware para habilitar o compartilhamento de recursos entre origens distintas (CORS), permitindo comunicações seguras entre os frontends locais e a API.
*   **MySQL Connector Python 9.0.0**: Driver oficial para comunicação segura entre Python e MySQL. O projeto implementa um **Pool de Conexões** (`pooling.MySQLConnectionPool`) para reutilizar conexões ativas e otimizar recursos sob alta concorrência.
*   **Bcrypt 4.1.3**: Biblioteca criptográfica de ponta para hash seguro e verificação de senhas de usuários usando algoritmos resistentes a ataques de força bruta.
*   **Python-dotenv 1.0.1**: Carregador automatizado de variáveis de ambiente do arquivo `.env` para proteção de dados sensíveis e credenciais de banco de dados.
*   **Werkzeug (Embutido no Flask)**: Utilizado na manipulação e salvamento seguro de arquivos de upload físico (`secure_filename`) prevenindo vulnerabilidades de navegação de diretórios.

### 3. Banco de Dados (MySQL)
Armazena a estrutura relacional do sistema e o conteúdo dinâmico:
*   **Tabela de Categorias**: Classificação de tacos de sinuca (Ex: Profissional, Amador, Acessórios).
*   **Tabela de Produtos**: Informações completas dos itens com especificações técnicas (tipo de madeira, peso do taco, tamanho, tipo de virola, preço, estoque e imagem).
*   **Tabela de Usuários**: Armazenamento de credenciais administrativas e colaboradores com criptografia Bcrypt.
*   **Tabela de Configurações do Site**: Modelo chave-valor que permite ao painel de administração alterar dinamicamente o comportamento e o visual da vitrine (títulos, recursos visuais em destaque, banners de exibição).

---

## Como Executar o Projeto Localmente

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
1.  **Node.js** (versão 18.x ou superior recomendada)
2.  **Python** (versão 3.10.x ou superior recomendada)
3.  **MySQL Server** (rodando localmente na porta padrão 3306)

---

### Passo 1: Inicialização do Banco de Dados

1. Abra um terminal e acesse a pasta de banco de dados:
   ```bash
   cd backend/database
   ```
2. Crie e configure o arquivo `.env` localizado na pasta da API (`backend/api/.env`) com as credenciais do seu banco de dados MySQL local. Exemplo:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha_mysql
   DB_NAME=VITRINE_NORMITH
   PORT=5000
   ```
3. Execute o script de inicialização automática para criar a base de dados, tabelas e inserir registros de teste:
   ```bash
   python init_db.py
   ```
   *O script se encarrega de executar o `schema.sql` (estrutura) e o `seed.sql` (dados de demonstração).*

---

### Passo 2: Executar o Servidor Backend (API Flask)

1. Vá para a pasta da API:
   ```bash
   cd backend/api
   ```
2. Crie um ambiente virtual Python para isolar as dependências (recomendado):
   ```bash
   python -m venv venv
   
   # Para ativar o ambiente virtual:
   # No Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # No Windows (CMD):
   .\venv\Scripts\activate.bat
   # No Linux/macOS:
   source venv/bin/activate
   ```
3. Instale todas as dependências do projeto listadas no arquivo `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
4. Certifique-se de que o arquivo `.env` criado no Passo 1 está preenchido corretamente na pasta `backend/api/`.
5. Execute a API Flask:
   ```bash
   python src/app.py
   ```
   *A API iniciará localmente na porta configurada e estará disponível para testes em `http://localhost:5000`.*

---

### Passo 3: Executar o Painel Administrativo (Admin Panel)

1. Vá para a pasta do painel de administração:
   ```bash
   cd backend/admin_panel
   ```
2. Instale os pacotes e dependências do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
   *Por padrão, o painel administrativo estará acessível no navegador em `http://localhost:5174`.*

---

### Passo 4: Executar a Vitrine Virtual (Frontend)

1. Vá para a pasta raiz do frontend do cliente:
   ```bash
   cd frontend
   ```
2. Instale as dependências necessárias do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor local de desenvolvimento do Vite:
   ```bash
   npm run dev
   ```
   *A vitrine de produtos estará ativa e visível no navegador em `http://localhost:5173`.*

---

## Segurança e Boas Práticas Implementadas

*   **Proteção Contra SQL Injection**: Todas as consultas ao banco de dados são parametrizadas de forma segura via driver do MySQL, usando placeholders `%s` ao invés de interpolação direta de strings.
*   **Criptografia Bcrypt**: Nenhuma senha administrativa é gravada em formato legível. O sistema utiliza Bcrypt com sal gerado automaticamente (`bcrypt.gensalt(10)`) para salvar e verificar senhas.
*   **Segurança de Upload de Arquivos**: O sistema de upload valida o tipo de arquivo recebido com base em extensões permitidas (`png, jpg, jpeg, webp, gif`) e higieniza o nome dos arquivos via `secure_filename` contra vulnerabilidades de escalada de diretórios (*Path Traversal*).
*   **Pool de Conexões de Banco de Dados**: A API gerencia conexões usando `MySQLConnectionPool`, o que evita vazamentos de recursos de rede e otimiza a latência das consultas ao reusar instâncias abertas de conexão com o banco.
*   **Tratamento de Erros e Logs**: Estrutura robusta de blocos `try/except` na API para registrar mensagens de erro no console e retornar respostas JSON padronizadas com códigos de status HTTP apropriados para o frontend.
