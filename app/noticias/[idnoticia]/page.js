'use client'
import NavBar from "@/app/componentes/NavBar"
import Link from "next/link"
import { Stack } from "react-bootstrap"

export async function getStaticProps({params}){
    const noticia = await fetch(`http://localhost:5000/api/NoticiasPublicadas/${params.idnoticia}`)
    .then((respostaDoServer) => {
        if(respostaDoServer.ok){
            return respostaDoServer.json();
        }
        throw new Error('Erro');
    })
    .then((respostaEmObjeto) => respostaEmObjeto);

    return {
        props: {
            noticia,
        },
    };
}

export async function getStaticPaths(){
    const response = await fetch('http://localhost:5000/api/NoticiasPublicadas/')
    
    const data = await response.json()

    const paths = data.map((noticias) => {
        return {
            params: {
                titulo:  `${noticias.titulo}`, 
            },
        }
    })

    return {paths, fallback: false}
}

export default function Noticia({params}){

    return (
        <>
            <NavBar modo="semLogin"/>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <p></p>
                    {console.log({params})}
                    <Link href="/" passHref legacyBehavior>Voltar</Link>
                    <h1 key={params.idnoticia}>ID - {params.idnoticia}</h1>
                    <h2>{params.titulo}</h2>
                    <h3>{}</h3>
                    <h4>Data Publicação</h4>
                    <h5>Nome Autor</h5>
                    <hr/>
                    <p>COMENTÁRIOS</p>
                </Stack>
        </>
    )
}