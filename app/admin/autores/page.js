'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import CadastrarAutor from "./cadastrarautor";
import { BsFillPersonXFill, BsPencilSquare, BsPersonAdd, BsXCircle } from "react-icons/bs";
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
        modalCreate = <CadastrarAutor/>
    }else if(operacao.action === "update"){
        modalUpdate = <AtualizarAutor id={operacao.id}/>
    }else if(operacao.action === "updateStatusConta"){
        modalUpdateStatusConta = <AtualizarStatusConta id={operacao.id}/>
    }else if(operacao.action === "delete"){
      modalDelete = <DeletarAutor id={operacao.id}/>
    }else{
      modalCreate = null;
      modalUpdate = null;
  }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Autores').then((result) => {
            result.json().then((data) => {
                let i = 0;
                let finalGrid = data.map((p) =>
                    <tr key={p.idusuario}>
                        <td><b>{i+=1}</b></td>
                        <td>{p.nome}</td>
                        <td>{p.apelidoAutor}</td>
                        <td>{p.statusConta}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "update" })}><BsPencilSquare/>  Editar Nome</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "updateStatusConta" })}><BsFillPersonXFill/>  Bloquear acesso</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "delete" })}><BsXCircle/>  Deletar autor</Dropdown.Item>
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
            modalCreate = false;
            modalUpdate = false;
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
        
        <AtualizarAutorContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          
         
        <div>
          <Alert variant="secondary"><Alert.Heading>Gerenciamento de Autores:</Alert.Heading></Alert>
          <Button variant="success" onClick={() => setOperacao({id: null, action: "create" })} style={{float: 'right', margin: 5}} title="CADASTRAR"><BsPersonAdd size={20}/></Button>
          <Table responsive="md" className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th><b>#</b></th>
                <th><b>NOME</b></th>
                <th><b>APELIDO</b></th>
                <th><b>STATUS</b></th>
                <th><b>GERENCIAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridAutores}
            </tbody>
          </Table>
          
        </div>
         {modalUpdate}
        </AtualizarAutorContext.Provider>
        </CadastrarAutorContext.Provider>
      </Stack>
    </>
  );
}