-- Listar todos os usuários
SELECT * FROM usuarios;

-- Buscar usuário por email
SELECT * FROM usuarios WHERE email = 'maria@email.com';

-- Listar todos os artigos
SELECT * FROM artigos;

-- Buscar artigo por palavra
SELECT * FROM artigos WHERE titulo LIKE '%ansiedade%';
