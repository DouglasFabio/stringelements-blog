'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import PerfilAtualizacao from "./atualizarperfil"
import { BsPencilSquare } from "react-icons/bs";

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
                let finalGrid = data.map((p) =>
                    <tr key={p.id}>
                        <td>{p.email}</td>
                        <td>{p.dtnascimento}</td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle>Opção</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setOperacao({ id: p.email, action: "update" })}>Atualizar</Dropdown.Item>
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
            <Stack gap={2} className="col-md-5 mx-auto" >
            <p></p>
            <Alert variant="secondary"><Alert.Heading>Atualizar perfil:</Alert.Heading></Alert>
            <AtualizarPerfilContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
                {modal}
            </AtualizarPerfilContext.Provider>

            <Table striped hover>
                <thead>
                    <tr>
                        <th><b>NOME</b></th>
                        <th><b>DATA DE NASCIMENTO</b></th>
                        <th><b>EDITAR</b></th>
                    </tr>
                </thead>
                <tbody>
                    {grid}
                </tbody>
            </Table>
            </Stack>
        </>
    )
}