-- //////////////////////////////////////////////////////////////// --
-- =============== PARA APRESENTAÇÃO DIA 16/06/2026 =============== --
-- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ --

-- ================================================================ --
--    DISCLAIMER -> TODOS OS TACOS SÃO PLACEHOLDER, POR ENQUANTO    --
-- ================================================================ ==
USE VITRINE_NORMITH;

-- -------------------------------------------------------------------------
-- OBJETIVO: Pegar da tabela produtos tacos com a palavra 'Clássico' no nome
-- e o tipo de madeira que utiliza, depois ordernar por preço começando
-- do mais barato.
-- -------------------------------------------------------------------------
SELECT ID_PRODUTO, NOME, MADEIRA, PRECO 
FROM PRODUTOS 
WHERE NOME LIKE '%Clássico%' AND MADEIRA = 'Ipê'
ORDER BY PRECO ASC;

-- -------------------------------------------------------------------------
-- OBJETIVO: Pegar produtos no intervalo de 150 a 600 reais em categorias
-- específicas descritas (Iniciante e Entusiasta).  
-- -------------------------------------------------------------------------
SELECT ID_PRODUTO, NOME, PRECO, CATEGORIA_ID 
FROM PRODUTOS 
WHERE PRECO BETWEEN 150.00 AND 600.00 
  AND CATEGORIA_ID IN (1, 2);

-- -------------------------------------------------------------------------
-- OBJETIVO: Pega os tacos, preços e suas categorias através da combinação
-- das tabelas por INNER JOIN
-- -------------------------------------------------------------------------
SELECT P.NOME AS 'Nome_Produto', P.PRECO, C.NOME AS 'Nome_Categoria'
FROM PRODUTOS P
INNER JOIN CATEGORIAS C ON P.CATEGORIA_ID = C.ID_CATEGORIA;

-- -------------------------------------------------------------------------
-- OBJETIVO: Listar todos os orçamentos recebidos. Se o cliente tiver
-- escolhido um produto, exibe o nome dele, se não, mostra "Não Especificado".
-- -------------------------------------------------------------------------
SELECT O.ID_ORCAMENTO, O.NOME AS 'Cliente', O.EMAIL, 
       COALESCE(P.NOME, 'Não Especificado') AS Produto_Interesse
FROM ORCAMENTOS O
LEFT JOIN PRODUTOS P ON O.PRODUTO_DESEJADO_ID = P.ID_PRODUTO;

-- -------------------------------------------------------------------------
-- OBJETIVO: Ver a quantidade total de tacos cadastrados por categoria
-- -------------------------------------------------------------------------
SELECT C.NOME AS Categoria, COUNT(P.ID_PRODUTO) AS Total_De_Produtos
FROM CATEGORIAS C
LEFT JOIN PRODUTOS P ON C.ID_CATEGORIA = P.CATEGORIA_ID
GROUP BY C.ID_CATEGORIA, C.NOME
ORDER BY Total_De_Produtos DESC;


-- -------------------------------------------------------------------------
-- OBJETIVO: Soma o valor total de tacos em estoque e depois a média de valor
-- dos mesmos.
-- -------------------------------------------------------------------------
SELECT
    SUM(PRECO * ESTOQUE) AS 'Valor_Total_Estoque',
    ROUND(AVG(PRECO), 2) AS 'Preco_Medio_Produtos'
FROM PRODUTOS;

-- -------------------------------------------------------------------------
-- OBJETIVO: Listar apenas as categorias onde a média de preço dos produtos
-- seja maior que 300 reais.
-- -------------------------------------------------------------------------
SELECT C.NOME AS 'Categoria', ROUND(AVG(P.PRECO), 2) AS 'Media_Preco'
FROM CATEGORIAS C
INNER JOIN PRODUTOS P ON C.ID_CATEGORIA = P.CATEGORIA_ID
GROUP BY C.ID_CATEGORIA, C.NOME
HAVING AVG(P.PRECO) > 300.00;

-- -------------------------------------------------------------------------
-- OBJETIVO: Filtra a descrição completa do item que recebeu um orçamento
-- -------------------------------------------------------------------------
SELECT * FROM PRODUTOS 
WHERE ID_PRODUTO IN (
    SELECT DISTINCT PRODUTO_DESEJADO_ID 
    FROM ORCAMENTOS 
    WHERE PRODUTO_DESEJADO_ID IS NOT NULL
);

-- -------------------------------------------------------------------------
-- OBJETIVO: Pega os orçamentos criados no ano presente e formatando para
-- o padrão brasileiro
-- -------------------------------------------------------------------------
SELECT ID_ORCAMENTO, NOME AS 'Cliente', 
       DATE_FORMAT(CRIADO_EM, '%d/%m/%Y %H:%i') AS 'Data'
FROM ORCAMENTOS
WHERE YEAR(CRIADO_EM) = YEAR(NOW());

-- -------------------------------------------------------------------------
-- OBJETIVO: Quanto tempo existe um usuário ativo.
-- -------------------------------------------------------------------------
SELECT NOME, EMAIL, TIPO, DATEDIFF(NOW(), CRIADO_EM) AS 'Dias_Desde_Cadastro'
FROM USUARIOS
ORDER BY Dias_Desde_Cadastro DESC;

-- -------------------------------------------------------------------------
-- OBJETIVO: Usamos CASE para enquadrar tacos de forma dinâmica
-- -------------------------------------------------------------------------
SELECT NOME, PRECO,
    CASE 
        WHEN PRECO < 250.00 THEN 'Econômico'
        WHEN PRECO BETWEEN 250.00 AND 800.00 THEN 'Intermediário'
        ELSE 'Premium'
    END AS 'Classificacao_Preco'
FROM PRODUTOS;

-- -------------------------------------------------------------------------
-- OBJETIVO: Retornar as categorias que possuem pelo menos um produto
-- ativo em estoque.
-- -------------------------------------------------------------------------
SELECT C.ID_CATEGORIA, C.NOME AS 'Categoria'
FROM CATEGORIAS C
WHERE EXISTS (
    SELECT 1 
    FROM PRODUTOS P 
    WHERE P.CATEGORIA_ID = C.ID_CATEGORIA AND P.ESTOQUE > 0
);
