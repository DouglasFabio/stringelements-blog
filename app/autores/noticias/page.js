'use client'

import NavBar from "@/app/componentes/NavBar";
import { createContext, useEffect, useState } from "react";
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap";
import { BsFileEarmarkCheck, BsFillFileTextFill, BsPencilSquare, BsXCircle } from "react-icons/bs";
import AtualizarNoticia from "./atualizar";
import CadastrarNoticia from "./cadastrar";
import DeletarNoticia from "./remover";

export const metadata = {
    title: 'Gerenciar Notícias'
}

export const CadastrarNoticiaContext = createContext(null);
export const AtualizarNoticiaContext = createContext(null);

export default function Page() {

    const [gridNoticias, setGridNoticias] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modalCreate = null;
    let modalUpdate = null;
    let modalDelete = null;

    if(operacao.action === "create"){
        modalCreate = <CadastrarNoticia/>
    }else if(operacao.action === "update"){
        modalUpdate = <AtualizarNoticia id={operacao.id}/>
    }else if(operacao.action === "delete"){
      modalDelete = <DeletarNoticia id={operacao.id}/>
    }else{
      modalCreate = null;
      modalUpdate = null;
  }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Noticias').then((result) => {
            result.json().then((data) => {
                let i = 0;
                let finalGrid = data.map((p) =>
                    <tr key={p.idnoticia}>
                        <td><b>{i+=1}</b></td>
                        <td>{p.titulo}</td>
                        <td>{p.subtitulo}</td>
                        <td>{p.texto}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idnoticia, action: "update" })}><BsPencilSquare/>  Editar</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idnoticia, action: "updateSituacao" })}><BsFileEarmarkCheck/>  PUBLICAR</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idnoticia, action: "delete" })}><BsXCircle/>  Deletar notícia</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                );
                setGridNoticias(finalGrid);
            })
        }
        );
    }

    useEffect(() => {
        if (atualizarGrid === null)
            setAtualizarGrid(true);
            modalCreate = null;
            modalUpdate = null;
            modalDelete = null;
        if (atualizarGrid) {
            setAtualizarGrid(false);
            pesquisar();  
        }
    }, [atualizarGrid])

  return (
    <>
      <NavBar modo="autor"/>
      <Stack gap={2} className="col-md-5 mx-auto">
        <p></p>
        <CadastrarNoticiaContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalCreate}
        </CadastrarNoticiaContext.Provider>
        <AtualizarNoticiaContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalUpdate}
          {modalDelete}
        </AtualizarNoticiaContext.Provider>
         
        <div>
          <Alert variant="secondary"><Alert.Heading>Gerenciamento de Notícias (Pendentes):</Alert.Heading></Alert>
          <Button variant="success" onClick={() => setOperacao({id: null, action: "create" })} style={{float: 'right', margin: 5}} title="CADASTRAR"><BsFillFileTextFill size={20}/></Button>
          <Table responsive="md" className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th><b>#</b></th>
                <th><b>TÍTULO</b></th>
                <th><b>SUBTÍTULO</b></th>
                <th><b>CONTEÚDO</b></th>
                <th><b>GERENCIAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridNoticias}
            </tbody>
          </Table>   
        </div>
        
      </Stack>
    </>
  );
}