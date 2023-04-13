'use client'
import { useEffect } from "react"
import { createContext } from "react"
import { useState } from "react"
import { Alert, Button, Dropdown, Stack, Table } from "react-bootstrap"
import { BsEye, BsFillFileTextFill } from "react-icons/bs";

import NavBar from "@/app/componentes/NavBar"
import Link from "next/link"

export const metadata = {
    title: 'Gerenciar Autores'
}

export const CadastrarAutorContext = createContext(null);
export const AtualizarAutorContext = createContext(null);

export default function Page() {

    const [gridListaAutores, setGridListaAutores] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    const pesquisar = () => {
        fetch('/api/ListaAutores').then((result) => {
            result.json().then((data) => {
                if(data.statusConta == "V")
                  data.statusConta = "Verificada";
                let i = 0;
                let finalGrid = data.map((p) =>
                    <tr key={p.idusuario}>
                        <td><b>{i+=1}</b></td>
                        <td>{p.nome}</td>
                        <td>0</td>
                        <td>
                            <Link href={`/noticias/${p.apelidoAutor}`} passHref legacyBehavior>
                                <Button variant="success" title="VER"><BsEye size={20}/></Button>
                            </Link>
                        </td>
                    </tr>
                );
                setGridListaAutores(finalGrid);
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
        <div>
          <Alert variant="secondary"><Alert.Heading>Autores disponíveis:</Alert.Heading></Alert>
          <Table responsive="md" className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th><b>#</b></th>
                <th><b>NOME</b></th>
                <th><b>QTD NOTÍCIAS</b></th>
                <th><b>VISUALIZAR</b></th>
              </tr>
            </thead>
            <tbody>
              {gridListaAutores}
            </tbody>
          </Table>
          
        </div>
      </Stack>
    </>
  );
}