# Banco de Dados - Vitrine Virtual

Este diretório contém os scripts necessários para inicializar e popular o banco de dados MySQL para a **Vitrine Virtual** (Vitrine de Tacos de Sinuca).

## Estrutura do Banco de Dados (`vitrine_virtual`)

O banco é composto por 4 tabelas principais:
1. `usuarios`: Administradores e colaboradores com acesso ao painel administrativo.
2. `categorias`: Categorias de tacos (ex: Iniciante, Entusiasta, Profissional).
3. `produtos`: Detalhes dos tacos de sinuca (madeira, peso, tamanho, virola, preço, estoque, etc.).
4. `orcamentos`: Mensagens e solicitações de orçamento recebidas pelo formulário de contato do site.
5. `imagem`: Imagens dos tacos de sinuca.

---

## Como Configurar

Você pode importar os arquivos usando a linha de comando do MySQL, o MySQL Workbench, o DBeaver ou qualquer outro cliente SQL.

### Opção 1: Via Linha de Comando (CLI)

1. **Criar a estrutura do banco de dados:**
   ```bash
   mysql -u seu_usuario -p < schema.sql
   ```

2. **Popular o banco de dados com dados iniciais (Seed):**
   ```bash
   mysql -u seu_usuario -p < seed.sql
   ```

### Opção 2: Via MySQL Workbench ou DBeaver

1. Abra seu cliente MySQL e conecte-se ao seu servidor local.
2. Abra o arquivo [schema.sql](schema.sql) e execute todo o script (geralmente clicando no ícone do raio ⚡).
3. Abra o arquivo [seed.sql](seed.sql) e execute todo o script para gerar os dados de testes.

---

## Credenciais Padrão de Teste (Criado no Seed)

* **Usuário / E-mail:** `admin@vitrinevirtual.com`
* **Senha:** `admin123` *(Armazenada no banco como hash Bcrypt)*
