-- SCRIPT DE VERIFICAÇÃO DO USUÁRIO ADMIN
-- Execute no pgAdmin para verificar se o usuário admin existe

-- 1. Verificar se o usuário admin existe
SELECT id, nome, email, role, senha 
FROM usuarios 
WHERE email = 'admin@acervobooks.com';

-- 2. Verificar todos os usuários cadastrados
SELECT id, nome, email, role, data_criacao 
FROM usuarios 
ORDER BY id;

-- 3. Contar total de usuários
SELECT COUNT(*) as total_usuarios FROM usuarios;

-- Se não aparecer nenhum resultado, execute o INSERT abaixo:
-- INSERT INTO usuarios (id, cpf, nome, email, senha, role, data_criacao, foto_url) 
-- VALUES (
--     nextval('seq_usuario'), 
--     '00000000000', 
--     'Administrador', 
--     'admin@acervobooks.com', 
--     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
--     'ROLE_ADMIN', 
--     CURRENT_DATE,
--     'https://ui-avatars.com/api/?name=Admin&background=60a5fa&color=fff&size=128'
-- );
