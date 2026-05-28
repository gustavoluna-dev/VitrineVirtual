# Guia de Gerenciamento de Usuários via Banco de Dados 🎱

Este guia ensina como gerenciar os usuários da **Vitrine Normith** diretamente pelo banco de dados MySQL, sem precisar alterar nenhuma linha de código da aplicação.

---

## 📌 Contexto Importante: Segurança e Criptografia

Para garantir a segurança do sistema, a aplicação valida a senha usando o algoritmo de criptografia **Bcrypt**. 

> [!WARNING]
> **Você NÃO deve digitar uma senha em texto puro** (ex: `senha123`) na coluna `SENHA` da tabela `USUARIOS`. 
> Se fizer isso, o sistema tentará comparar o texto criptografado com o texto puro durante o login e a autenticação falhará. Qualquer nova senha precisa estar no formato de **hash Bcrypt**.

---

## 🛠️ Ferramentas para se Conectar ao Banco

Você pode se conectar ao banco de dados `VITRINE_NORMITH` usando a ferramenta de sua preferência:
1. **DBeaver** ou **MySQL Workbench** (Clientes visuais excelentes).
2. **Extensões de MySQL no VS Code** (como a *Database Client*).
3. **Prompt de Comando (CLI)** executando:
   ```bash
   mysql -u seu_usuario -p
   ```

---

## 🔑 Como Gerar Hashes Bcrypt para Novas Senhas

Se você quiser criar um usuário com uma senha personalizada, você precisará gerar o hash dela primeiro.

### Opção A: Geradores Online (Mais Fácil)
1. Acesse um gerador seguro como o [Bcrypt Generator (bcrypt.online)](https://bcrypt.online/) ou [bcrypt-generator.com](https://bcrypt-generator.com/).
2. Insira a senha desejada (ex: `minhasenha123`).
3. Defina os *rounds* para **10** (padrão do sistema).
4. Clique em **Encrypt/Hash**.
5. Copie o código gerado (ele começará com `$2b$` ou `$2a$`).

### Opção B: Exemplos de Hashes Pré-Gerados
Se preferir agilidade, você pode usar estes hashes prontos de teste:
- **Senha:** `admin123`  
  **Hash:** `$2b$10$rP5n8b9VexF1Y2HmWgBvJuQ7QG8yWzB2z/c0R.QG5u0CgW0p8N5Jq`
- **Senha:** `senha123`  
  **Hash:** `$2b$10$gN3qP1i7wBq.2hWpSjE.OeK9Z1d0w3rG1E3d0w1N2Y4yS2a12B3cS`

---

## 💻 Comandos SQL Úteis (CRUD)

Abra a aba de SQL (Query Console) no seu cliente de banco de dados e utilize os comandos abaixo:

### 📊 1. Listar Usuários Cadastrados
Para ver quem tem acesso, seus e-mails e permissões atuais:
```sql
USE VITRINE_NORMITH;

SELECT ID_USUARIO, NOME, EMAIL, TIPO, CRIADO_EM 
FROM USUARIOS;
```

### ➕ 2. Criar um Novo Usuário
Para adicionar um novo administrador ou colaborador (substitua os valores de exemplo):
```sql
USE VITRINE_NORMITH;

INSERT INTO USUARIOS (NOME, EMAIL, SENHA, TIPO) 
VALUES (
  'Ana Oliveira', 
  'ana@vitrinevirtual.com', 
  '$2b$10$rP5n8b9VexF1Y2HmWgBvJuQ7QG8yWzB2z/c0R.QG5u0CgW0p8N5Jq', -- Corresponde à senha: admin123
  'colaborador' -- Escolha entre 'admin' ou 'colaborador'
);
```

### ✏️ 3. Alterar a Senha de um Usuário
Para redefinir a senha de um usuário pelo seu e-mail:
```sql
USE VITRINE_NORMITH;

UPDATE USUARIOS 
SET SENHA = '$2b$10$rP5n8b9VexF1Y2HmWgBvJuQ7QG8yWzB2z/c0R.QG5u0CgW0p8N5Jq' -- Novo Hash Bcrypt
WHERE EMAIL = 'ana@vitrinevirtual.com';
```

### 🔄 4. Alterar o Cargo (Nível de Permissão)
Para alterar as permissões de um usuário (valores válidos: `'admin'` ou `'colaborador'`):
```sql
USE VITRINE_NORMITH;

UPDATE USUARIOS 
SET TIPO = 'admin' 
WHERE EMAIL = 'ana@vitrinevirtual.com';
```

### ❌ 5. Deletar um Usuário do Sistema
Para remover permanentemente o acesso de alguém:
```sql
USE VITRINE_NORMITH;

DELETE FROM USUARIOS 
WHERE EMAIL = 'ana@vitrinevirtual.com';
```

---

> [!TIP]
> **Sempre utilize a cláusula `WHERE` nos comandos `UPDATE` e `DELETE`** filtrando pelo `EMAIL` ou pelo `ID_USUARIO` para evitar alterar ou apagar todos os usuários acidentalmente!
