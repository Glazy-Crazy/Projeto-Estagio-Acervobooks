-- =============================================
-- Script para Limpar e Recriar Dados
-- =============================================

-- Limpar todas as tabelas (CASCADE para remover dependências)
TRUNCATE TABLE emprestimos CASCADE;
TRUNCATE TABLE desejos CASCADE;
TRUNCATE TABLE transacoes CASCADE;
TRUNCATE TABLE livros CASCADE;
TRUNCATE TABLE usuarios CASCADE;

-- Resetar sequences
ALTER SEQUENCE seq_usuario RESTART WITH 1;
ALTER SEQUENCE seq_livro RESTART WITH 1;
ALTER SEQUENCE seq_emprestimo RESTART WITH 1;
ALTER SEQUENCE seq_transacao RESTART WITH 1;

-- Confirmação
SELECT 'Banco de dados limpo com sucesso! Reinicie o backend para recriar os dados.' as mensagem;
