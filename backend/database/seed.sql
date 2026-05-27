USE VITRINE_NORMITH;

DELETE FROM ORCAMENTOS;
DELETE FROM PRODUTOS;
DELETE FROM CATEGORIAS;
DELETE FROM USUARIOS;

-- Colocando o usuário admin para teste
INSERT INTO USUARIOS (NOME, EMAIL, SENHA, TIPO) VALUES
('Administrador', 'admin@vitrinevirtual.com', '$2b$10$rP5n8b9VexF1Y2HmWgBvJuQ7QG8yWzB2z/c0R.QG5u0CgW0p8N5Jq', 'admin'); -- Senha: admin123

-- Colocando as categorias do front
INSERT INTO CATEGORIAS (ID_CATEGORIA, NOME, DESCRICAO, ICONE, IMAGEM_URL) VALUES
(1, 'TACOS PARA INICIANTES', 'Modelos com excelente custo-benefício para quem está começando.', 'GraduationCap', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600'),
(2, 'TACOS PARA ENTUSIASTAS', 'Mais tecnologia e controle para elevar seu nível de jogo.', 'Star', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600'),
(3, 'TACOS PARA PROFISSIONAIS', 'Desempenho máximo com materiais selecionados e acabamento premium.', 'Crown', 'https://images.unsplash.com/photo-1609137144813-90d1bf3b867c?q=80&w=600'),
(4, 'PERSONALIZE SEU TACO', 'Crie um taco único com sua escolha de madeira, peso e detalhes.', 'Wrench', 'https://images.unsplash.com/photo-1577416418012-7474b291d95a?q=80&w=600');

-- 3. Colocando dois tacos como placeholder para começar
INSERT INTO PRODUTOS (NOME, DESCRICAO, PRECO, IMAGEM_URL, ESTOQUE, MADEIRA, PESO, TAMANHO, VIROLA, CATEGORIA_ID) VALUES
-- Iniciantes
('Taco Ipê Clássico', 'Excelente taco para quem está iniciando na sinuca. Madeira de alta durabilidade e balanceamento perfeito.', 189.90, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400', 10, 'Ipê', '540g', '1.45m', 'Metal 11mm', 1),
('Taco Goiabão Standard', 'O queridinho dos salões de sinuca brasileiros. Madeira Goiabão tratada para evitar empeno.', 220.00, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400', 15, 'Goiabão', '550g', '1.45m', 'Celerom 11mm', 1),

-- Entusiastas
('Taco Ash Pro-Series', 'Confeccionado em Ash importado, oferece excelente rigidez e controle nas tacadas de efeito.', 450.00, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400', 5, 'Ash Importado', '560g', '1.47m', 'Latão 10mm', 2),
('Taco Maple Carbon-Core', 'Alma de fibra de carbono envolta por Maple canadense selecionado. Redução de vibração excepcional.', 590.00, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400', 4, 'Maple Canadense', '570g', '1.47m', 'Celerom 10.5mm', 2),

-- Profissionais
('Taco Masterpiece Ébano', 'A obra de arte da nossa vitrine. Base em Ébano imperial com marchetaria artesanal em Jacarandá.', 1250.00, 'https://images.unsplash.com/photo-1609137144813-90d1bf3b867c?q=80&w=400', 2, 'Ébano Imperial & Jacarandá', '580g', '1.50m', 'Metal 10mm', 3),
('Taco Champion Gold Edition', 'Edição especial assinada por campeões. Seleção ultra rigorosa de madeira e balanceamento milimétrico.', 1500.00, 'https://images.unsplash.com/photo-1609137144813-90d1bf3b867c?q=80&w=400', 1, 'Goiabão Especial', '565g', '1.48m', 'Celerom 10mm', 3);

-- 4. Colocando uma mensagem de exemplo para teste
INSERT INTO ORCAMENTOS (NOME, EMAIL, WHATSAPP, MENSAGEM, PRODUTO_DESEJADO_ID, STATUS) VALUES
('Carlos Silva', 'carlos@gmail.com', '11999998888', 'Gostaria de saber se o Taco Masterpiece Ébano tem frete grátis para São Paulo.', 5, 'NOVO'),
('Mariana Costa', 'mariana.costa@hotmail.com', '21988887777', 'Quero encomendar um taco personalizado com peso de 590g e madeira Goiabão.', NULL, 'EM_ATENDIMENTO');
