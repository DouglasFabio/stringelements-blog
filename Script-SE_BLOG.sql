/*API CAMPOS NotMapped*/
-- TbUsuario: Token, SenhaInicial

------------------------------------------------------
CREATE TABLE TB_Usuarios(

-- LEGENDA StatusSenha:
-- - V: Verificada
-- - N: N�o Verificada

-- LEGENDA StatusConta:
-- - B: Bloqueada (somente admin)
-- - V: Verificada
-- - N: N�o Verificada

-- LEGENDA TipoUsuario:
-- - M: Administrador
-- - A: Autor
-- - L: Leitor

IDUsuario int primary key identity NOT NULL,
Nome varchar(50) NOT NULL,
Email varchar(50) unique NOT NULL,
Senha varchar(max) NOT NULL,
DTNascimento date,
CodAtivacao varchar(max),
StatusSenha varchar(1),
StatusConta varchar(1),
TipoUsuario varchar(1),
CodSenha varchar(max),
DTAltSenha datetime,
ApelidoAutor varchar(25)
)

CREATE TABLE TB_Noticias(

-- LEGENDA Situacao:
-- - P: Publicada
-- - N: N�o Publicada

IDNoticia int primary key identity NOT NULL,
Titulo varchar(25) NOT NULL,
Subtitulo varchar(50) NOT NULL,
DataPublicacao datetime,
Texto varchar(max) NOT NULL,
Situacao varchar(1) NOT NULL,
DataAlteracao datetime,
CODAutor int,
FOREIGN KEY (CODAutor) REFERENCES TB_Usuarios(IDUsuario)
)

CREATE TABLE TB_Status(

-- LEGENDA StatusNoticia:
-- - 1: Sem curtida
-- - 2: Gostei
-- - 3: N�o Gostei

IDStatus int primary key identity NOT NULL,
NomeStatus varchar(50) NOT NULL,
)

INSERT INTO TB_Status
    VALUES( 'Não há reações'),
          ( 'Gostei'),
          ( 'Não gostei');        

CREATE TABLE TB_StatusNoticias(

IDStatusNoticia int primary key identity NOT NULL,
Comentario varchar(max),
DtComentario datetime,
CODNoticia int,
CODLeitor int,
CODStatus int,
FOREIGN KEY (CODNoticia) REFERENCES TB_Noticias(IDNoticia),
FOREIGN KEY (CODLeitor) REFERENCES TB_Usuarios(IDUsuario),
FOREIGN KEY (CODStatus) REFERENCES TB_Status(IDStatus)
)

