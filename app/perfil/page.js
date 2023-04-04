'use client'
import Link from 'next/link';
import { createContext,  useEffect,  useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import AtualizarPerfil from './atualizarPerfil';

export const AtualizarPerfilContext = createContext(null);

export default function Perfil() {
    const [grid, setGrid] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [operacao, setOperacao] = useState({ id: null, action: null });

    let modal = null;

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

    const pesquisar = () => {
        fetch('/api/Usuarios').then((result) => {
            result.json().then((data) => {
                let finalGrid = data.map((p) =>
                    <ul key={p.IdUsuario}>
                        <li> {p.Nome}</li>
                        <li> {p.Email}</li>
                        <li>{p.DtNascimento}</li>
                    </ul>
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
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>MEU PERFIL</Alert.Heading></Alert>
        {grid}
        <AtualizarPerfilContext.Provider value={{fechar: fecharModals}}>
            <AtualizarPerfil />
            {modal}
        </AtualizarPerfilContext.Provider>
        <div className="btn btn-primary mt-2 col-12 text-white bg-black" htmlFor="voltar"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      
    </Stack>
  );
}