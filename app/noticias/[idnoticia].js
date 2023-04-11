'use client'
import NavBar from "@/app/componentes/NavBar"
import Link from "next/link"
import { Stack } from "react-bootstrap"

export async function getStaticProps(context){
    const {params} = context

    const data = await fetch(
        `http://localhost:5000/api/NoticiasPublicadas/${params.idnoticia}`,
    )

    const noticia = await data.json()

    return {
        props: { noticia },
    }
}

export async function getStaticPaths(){
    
    const response = await fetch('http://localhost:5000/api/NoticiasPublicadas/')
    
    const data = await response.json()

    const paths = data.map((noticia) => {
        return {
            params: {
                idnoticia: `${noticia.idnoticia}`,
            },
        }
    })

    return {paths, fallback: false}
}

export default function Noticia({noticia}){
    return (
        <>
            <NavBar modo="semLogin"/>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <p></p>
                    <Link href="/" passHref legacyBehavior>Voltara</Link>
                    <h1>teste - {noticia.id}</h1>
                    <h2>{noticia.title}</h2>
                    <h3>{}</h3>
                    <h4>Data Publicação</h4>
                    <h5>Nome Autor</h5>
                    <hr/>
                    <p>COMENTÁRIOS</p>
                </Stack>
        </>
    )
}