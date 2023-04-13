'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import PerfilAtualizacao from "./atualizarperfil"
import { BsPencilSquare } from "react-icons/bs";
import NavBar from "../componentes/NavBar"

export const metadata = {
    title: 'Atualizar Perfil'
}

export const AtualizarPerfilContext = createContext(null);

export default function Page() {

    const [grid, setGrid] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modal = null;

    if(operacao.action === "update"){
        modal = <PerfilAtualizacao id={operacao.id}/>
    }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Usuarios').then((result) => {
            result.json().then((data) => {
                let i = 1;
                let finalGrid = data.map((p) =>
                    <tr key={p.idusuario}>
                        <td>{i++}</td>
                        <td>{p.email}</td>
                        <td>{p.dtnascimento}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.idusuario, action: "update" })}><BsPencilSquare/> Atualizar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                );
                setGrid(finalGrid);
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
            <NavBar modo="semLogin"/>
            <Stack gap={2} className="col-md-5 mx-auto" >
            <p></p>
            <Alert variant="secondary"><Alert.Heading>Atualizar perfil:</Alert.Heading></Alert>
            <AtualizarPerfilContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
                {modal}
           

            <Table striped hover>
                <thead>
                    <tr>
                        <th><b>#</b></th>
                        <th><b>EMAIL</b></th>
                        <th><b>DATA DE NASCIMENTO</b></th>
                        <th><b>EDITAR</b></th>
                    </tr>
                </thead>
                <tbody>
                    {grid}
                </tbody>
            </Table>
            </AtualizarPerfilContext.Provider>
            </Stack>
        </>
    )
}