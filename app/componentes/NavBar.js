'use client';
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';

export default function NavBar(props) {
    if(props.modo === "semLogin"){
        return(
            /*NAVBAR - TELA INICIAL - SEM LOGIN*/
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            StringElements
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Inicio
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Leitor VIP">
                                <Link href="/leitores" passHref legacyBehavior>
                                    <NavDropdown.Item>Cadastre-se</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Link href="/login" passHref legacyBehavior>
                                <Nav.Link>
                                    Login 
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            )
    }else if(props.modo ==="semLoginADM"){
        return(
            /*NAVBAR - PRIMEIRA EXECUÇÃO - SEM ADM*/
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            StringElementsADM
                        </Navbar.Brand>
                    </Link>
                </Container>
            </Navbar>);
    }
    else if(props.modo ==="loginADM"){
        return(
            /*NAVBAR - FUNÇÕES ADMINISTRADOR*/
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            StringElements
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Inicio
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Cadastrar">
                                <Link href="/admin/autor" passHref legacyBehavior>
                                    <NavDropdown.Item>Autor</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                            <NavDropdown title="Gerenciamento">
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Listar Usuários</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Sair 
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>);
    }
    else if(props.modo ==="loginADM"){
        return(
            /*NAVBAR - FUNÇÕES LEITOR*/
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            StringElements
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Inicio
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Cadastrar">
                                <Link href="/admin/autor" passHref legacyBehavior>
                                    <NavDropdown.Item>Autor</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                            <NavDropdown title="Gerenciamento">
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Listar Usuários</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Sair 
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>);
    }
    else if(props.modo ==="loginADM"){
        return(
            /*NAVBAR - FUNÇÕES AUTOR*/
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Link href="/" passHref legacyBehavior>
                        <Navbar.Brand>
                            StringElements
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Inicio
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Cadastrar">
                                <Link href="/noticias/cadastrar" passHref legacyBehavior>
                                    <NavDropdown.Item>Nova Notícia</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                            <NavDropdown title="Gerenciamento">
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Notícias pendentes</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Sair 
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>);
    }
                        /*
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                    Inicio
                                </Nav.Link>
                            </Link>
                            <NavDropdown title="Ações">
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Ação 1</NavDropdown.Item>
                                </Link>
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Ação 2</NavDropdown.Item>
                                </Link>
                                <NavDropdown.Divider />
                                <Link href="/" passHref legacyBehavior>
                                    <NavDropdown.Item>Ação 3</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>
                                     Sair 
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                    */
                


             /*
             ----------------------------------------------------------------------------------------------------------------------------------
             NAVBAR - PAINEL ADMINISTRADOR 
                - CADASTRO DE AUTORES
                - BLOQUEAR AUTORES, EDITAR APENAS O NOME DO AUTOR, EXCLUIR AUTOR (SEM NOTICIAS PUBLICADAS)
                - BLOQUEAR LEITORES
                - EXCLUIR COMENTÁRIOS
                - REDEFINIR SENHA
            */



            /*
             ----------------------------------------------------------------------------------------------------------------------------------
             NAVBAR - PAINEL AUTORES
                - CADASTRO DE NOTICIAS
                    - APOS CADASTRAR, ENVIAR PARA TELA DE PUBLICAÇÕES (BOTÃO DE PUBLICAR)
                    - ALTERAR SOMENTE O TEXTO DA NOTÍCIA
                    - EXCLUIR NOTICIA SÓ É PERMITIDO SE ELA AINDA NÃO ESTIVER PUBLICADA
                    - A DATA DE ALTERAÇÃO DEVE SER INFORMADA JUNTO COM A DATA DE PUBLICAÇÃO (ATUALIZAR A DATA)
                - EDITAR PERFIL
                    - EMAIL (SEMPRE EMAIL UNICO NO SISTEMA, CONFIRMAR NOVO EMAIL ENVIANDO UM CÓDIGO PARA ELE)
                    - DATA NASCIMENTO
                - REDEFINIR SENHA
                    - ENVIAR CÓDIGO PARA EMAIL (CODIGO UTILIZADO PARA CRIAÇÃO DA NOVA SENHA)
                    - NOVA SENHA DEVE SER DIFERENTE DA ÚLTIMA SENHA
            */


            /*
             ----------------------------------------------------------------------------------------------------------------------------------
             NAVBAR - PAINEL LEITORES                                                                                       (NAVBAR PRINCIPAL)
                - CADASTRO DE LEITOR
                    - APENAS LEITORES QUE CONFIRMARAM O CÓDIGO DO EMAIL RECEBIDO PODEM ACESSAR AS FUNÇÕES DO SISTEMA
                - LISTA DE AUTORES (NÃO BLOQUEADOS) - APENAS LEITORES CADASTRADOS
                    - NOME E QTD DE NOTICIAS PUBLICADAS
                    - LINK PARA AS NOTICIAS DO AUTOR SELECIONADO (USAR APELIDO COMO ROTA)
                - EDITAR PERFIL
                    - EMAIL (SEMPRE EMAIL UNICO NO SISTEMA, CONFIRMAR NOVO EMAIL ENVIANDO UM CÓDIGO PARA ELE)
                    - DATA NASCIMENTO
                - REDEFINIR SENHA
                    - ENVIAR CÓDIGO PARA EMAIL (CODIGO UTILIZADO PARA CRIAÇÃO DA NOVA SENHA)
- NOVA SENHA DEVE SER DIFERENTE DA ÚLTIMA SENHA*/
}