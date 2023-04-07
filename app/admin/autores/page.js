'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import CadastrarAutor from "./cadastrarautor";
import { BsPencilSquare } from "react-icons/bs";
import AtualizarAutor from "./atualizar"

export const metadata = {
    title: 'Gerenciar Autores'
}

export const CadastrarAutorContext = createContext(null);
export const AtualizarAutorContext = createContext(null);

export default function Page() {

    const [gridAutores, setGridAutores] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modalCreate = null;
    let modalUpdate = null;

    if(operacao.action === "create"){
        modalCreate = <CadastrarAutor id={operacao.id}/>
    }else if(operacao.action === "update"){
        modalUpdate = <AtualizarAutor id={operacao.id}/>
    }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Usuarios').then((result) => {
            result.json().then((data) => {
                let finalGrid = data.map((p) =>
                    <tr key={p.id}>
                        <td></td>
                        <td>{p.nome}</td>
                        <td>{p.tipoUsuario}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.id, action: "update" })}><BsPencilSquare/>Atualizar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                );
                setGridAutores(finalGrid);
            })
        }
        );
    }

    useEffect(() => {
        if (atualizarGrid === null)
            setAtualizarGrid(true);
        if (atualizarGrid) {
            setAtualizarGrid(false);
            pesquisar();
        }
    }, [atualizarGrid])

  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
        <p></p>
        <CadastrarAutorContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalCreate}
        </CadastrarAutorContext.Provider>
        <AtualizarAutorContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalUpdate}
        </AtualizarAutorContext.Provider>
        <div>
          <Alert variant="secondary"><Button variant="success" onClick={() => setOperacao({ action: "create" })}>CADASTRAR AUTOR</Button></Alert>
          <Table responsive="md" striped bordered hover>
            <thead>
              <tr>
                <th><b>#</b></th>
                <th><b>NOME</b></th>
                <th><b>TIPO</b></th>
                <th><b>GERENCIAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridAutores}
            </tbody>
          </Table>
        </div>
      </Stack>
    </>
  );
}