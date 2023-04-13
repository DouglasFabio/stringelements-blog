'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Dropdown, Stack, Table } from "react-bootstrap"
import { BsPersonFillCheck, BsPersonFillLock } from "react-icons/bs";

import NavBar from "@/app/componentes/NavBar"
import BloquearLeitor from "./bloquear"
import LiberarLeitor from "./liberar"

export const metadata = {
    title: 'Gerenciar Leitores'
}

export const AtualizarLeitorContext = createContext(null);

export default function Page() {

    const [gridLeitores, setGridLeitores] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modalLock = null;
    let modalUnlock = null;

    if(operacao.action === "lock"){
      modalLock = <BloquearLeitor id={operacao.id}/>
    }else if(operacao.action === "unlock"){
      modalUnlock = <LiberarLeitor id={operacao.id}/>
    }else{
        modalLock = null;
        modalUnlock = null;
  }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Leitores').then((result) => {
            result.json().then((data) => {
                if(data.statusConta == "V")
                  data.statusConta = "Verificada";
                let i = 0;
                let finalGrid = data.map((p) =>
                    <tr key={p.idusuario}>
                        <td><b>{i+=1}</b></td>
                        <td>{p.nome}</td>
                        <td>{p.email}</td>
                        <td>{p.statusConta == "V"?p.statusConta="Verificada": "Não"}</td>
                        <td>{p.statusSenha == "B"?p.statusSenha="Sim": "Não"}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "lock" })}><BsPersonFillLock/> Bloquear acesso</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "unlock" })}><BsPersonFillCheck/> Liberar acesso</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                );
                setGridLeitores(finalGrid);
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
      <NavBar modo="loginADM"/>
      <Stack gap={2} className="col-md-5 mx-auto">
        <p></p>
        <AtualizarLeitorContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
          {modalLock}
          {modalUnlock}
        </AtualizarLeitorContext.Provider>
         
        <div>
          <Alert variant="secondary"><Alert.Heading>Gerenciamento de Leitores:</Alert.Heading></Alert>
          <Table responsive="md" className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th><b>#</b></th>
                <th><b>NOME</b></th>
                <th><b>EMAIL</b></th>
                <th><b>STATUS</b></th>
                <th><b>BLOQUEADA?</b></th>
                <th><b>GERENCIAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridLeitores}
            </tbody>
          </Table>
          
        </div>
      </Stack>
    </>
  );
}