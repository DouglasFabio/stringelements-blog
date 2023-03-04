CREATE TABLE TB_Usuarios(

-- LEGENDA StatusSenha:
-- - V: Verificada
-- - N: Não Verificada

-- LEGENDA StatusConta:
-- - B: Bloqueada (somente admin)
-- - V: Verificada
-- - N: Não Verificada

-- LEGENDA TipoUsuario:
-- - M: Administrador
-- - A: Autor
-- - L: Leitor

IDUsuario int primary key identity NOT NULL,
Nome varchar(50) NOT NULL,
Email varchar(50) unique NOT NULL,
Senha varchar(max) NOT NULL,
DTNascimento date,
CodAtivacao varchar(max) NOT NULL,
StatusSenha varchar(1) NOT NULL,
StatusConta varchar(1) NOT NULL,
TipoUsuario varchar(1) NOT NULL
)

CREATE TABLE TB_Autores(

IDAutor int primary key identity NOT NULL,
ApelidoAutor varchar(25) NOT NULL,
SenhaProvisoria varchar(max) NOT NULL,
CODUsuario int,
FOREIGN KEY (CODUsuario) REFERENCES TB_Usuarios(IDUsuario)
)

CREATE TABLE TB_Noticias(

-- LEGENDA Situacao:
-- - P: Publicada
-- - N: Não Publicada

IDNoticia int primary key identity NOT NULL,
Titulo varchar(25) NOT NULL,
SubTitulo varchar(50) NOT NULL,
DataPublicacao date	NOT NULL,
Texto varchar(max) NOT NULL,
Situacao varchar(1) NOT NULL,
DataAlteracao date,
CODAutor int,
FOREIGN KEY (CODAutor) REFERENCES TB_Autores(IDAutor)
)

CREATE TABLE TB_StatusNoticias(

-- LEGENDA StatusNoticia:
-- - 0: Sem curtida
-- - 1: Gostei
-- - 2: Não Gostei

IDStatusNoticia int primary key identity NOT NULL,
StatusNoticia int NOT NULL,
Comentario varchar(max),
CODNoticia int,
CODLeitor int,
FOREIGN KEY (CODNoticia) REFERENCES TB_Noticias(IDNoticia),
FOREIGN KEY (CODLeitor) REFERENCES TB_Usuarios(IDUsuario)
)

