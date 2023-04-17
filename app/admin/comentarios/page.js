'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import NavBar from "@/app/componentes/NavBar"
import DeletarComentario from "./remover"
import { BsXCircleFill } from "react-icons/bs"

export const metadata = {
    title: 'Gerenciar Comentários'
}

export const CadastrarAutorContext = createContext(null);
export const AtualizarComentarioContext = createContext(null);

export default function Page() {

    const [gridComentarios, setGridComentarios] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modalDelete = null;

    if(operacao.action === "delete"){
      modalDelete = <DeletarComentario id={operacao.id}/>
    }else{
      modalDelete = null;
  }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Comentarios').then((result) => {
            result.json().then((data) => {
                let i = 0;
                let finalGrid = data.map((p) =>
                    <tr key={p.idstatusNoticia}>
                        <td><b>{i+=1}</b></td>
                        <td>{p.comentario}</td>
                        <td>{p.codleitor}</td>
                        
                        <td>
                            <Button onClick={() => setOperacao({ id: p.idstatusNoticia, action: "delete" })} variant="danger" title="DELETAR"><BsXCircleFill size={20}/></Button>
                        </td>
                    </tr>
                );
                setGridComentarios(finalGrid);
            })
        }
        );
    }

    useEffect(() => {
        if (atualizarGrid === null)
            setAtualizarGrid(true);
            modalDelete = null;
        if (atualizarGrid) {
            setAtualizarGrid(false);
            pesquisar();  
        }
    }, [atualizarGrid])

  return (
    <>
      <NavBar modo="loginADM"/>
      <Stack gap={2} className="col-md-5 mx-auto">
        <p></p>
        <AtualizarComentarioContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalDelete}
        </AtualizarComentarioContext.Provider>
         
        <div>
          <Alert variant="secondary"><Alert.Heading>Gerenciamento de Comentários:</Alert.Heading></Alert>
          <Table responsive="md" className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th><b>#</b></th>
                <th><b>COMENTÁRIO</b></th>
                <th><b>LEITOR</b></th>
                <th><b>DELETAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridComentarios}
            </tbody>
          </Table>
          
        </div>
      </Stack>
    </>
  );
}