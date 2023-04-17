'use client'

import NavBar from "@/app/componentes/NavBar";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import {  Badge, Stack } from "react-bootstrap";

export const metadata = {
    title: 'Home'
}

export const CadastrarNoticiaContext = createContext(null);
export const AtualizarNoticiaContext = createContext(null);

export async function getStaticProps(){
    const data = await fetch('http://localhost:5000/api/NoticiasPublicadas')

    const noticias = await data.json()

    return {
        props: { noticias },
    }
}

export default function Noticias() {

    const [gridNoticias, setGridNoticias] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);

    const pesquisar = () => {
        fetch('/api/NoticiasPublicadas/').then((result) => {
            result.json().then((data) => {
                let finalGrid = data.map((p) =>
                    <div className="container-md" key={p.idnoticia}>
                        <hr/>
                        <h3><p className="text-bold">{p.dataPublicacao}</p><Link href={`/${p.idnoticia}`} legacyBehavior>{p.titulo}</Link><Badge bg="secondary">New</Badge></h3>
                        <h5>{p.subtitulo}</h5>      
                    </div>
                );
                setGridNoticias(finalGrid);
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

    return(
        <>
            <NavBar modo="semLogin"/>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <p></p>
                    {gridNoticias}
                </Stack>
        </>
  );
}
