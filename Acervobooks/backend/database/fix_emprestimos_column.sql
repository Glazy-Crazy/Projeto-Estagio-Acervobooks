-- =============================================
-- Script para corrigir a tabela emprestimos
-- Remove a coluna data_prevista_devolucao criada incorretamente pelo Hibernate
-- =============================================

-- PASSO 1: Verificar estrutura atual
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'emprestimos' 
ORDER BY ordinal_position;

-- PASSO 2: Remover a coluna incorreta (criada pelo Hibernate)
ALTER TABLE emprestimos 
DROP COLUMN IF EXISTS data_prevista_devolucao CASCADE;

-- PASSO 3: Remover a coluna data_devolucao_real se existir (nome antigo)
ALTER TABLE emprestimos 
DROP COLUMN IF EXISTS data_devolucao_real CASCADE;

-- PASSO 4: Adicionar data_efetiva_devolucao se não existir (nome correto conforme entidade)
ALTER TABLE emprestimos 
ADD COLUMN IF NOT EXISTS data_efetiva_devolucao DATE;

-- PASSO 5: Verificar estrutura final
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'emprestimos' 
ORDER BY ordinal_position;

-- RESULTADO ESPERADO:
-- As colunas devem ser:
-- - id
-- - usuario_id
-- - livro_id  
-- - data_emprestimo
-- - data_devolucao_prevista (NOT NULL) <- Esta é a correta!
-- - data_efetiva_devolucao (nullable)
-- - status
-- - observacoes
