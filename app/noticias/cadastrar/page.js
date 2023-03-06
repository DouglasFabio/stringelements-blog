'use client'
import DataAtual from '@/app/componentes/DataAtual';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'

export default function CadastroNoticias() {
    
    const [dadosNoticia, setDadosNoticia] = useState({
        titulo: '',
        subtitulo: '',
        texto: '',
        data: {Date}
    });

    const handleChange = e => setDadosNoticia({...dadosNoticia, [e.target.name]: e.target.value});

    const enviaDadosNoticia = async e =>{
        e.preventDefault(); //nao limpar o console após o submit
        console.log(dadosNoticia.titulo+dadosNoticia.subtitulo);
    }

    return (
        <Stack gap={2} className="col-md-5 mx-auto" >
        <p></p>
        <Alert variant="secondary"><Alert.Heading>CADASTRO DE NOTÍCIAS:</Alert.Heading></Alert>
        <form onSubmit={enviaDadosNoticia}>
            <div className="form-floating">
                <input type="text" className="form-control" id="titulo"
                    placeholder="Título" value={dadosNoticia.titulo} onChange={handleChange} name="titulo" />
                <label htmlFor="titulo">Título:</label>
            </div>
            <div className="form-floating mt-1">
                <input type="text" className="form-control" id="subtitulo"
                    placeholder="Subtítulo" value={dadosNoticia.subtitulo} onChange={handleChange} name="subtitulo" />
                <label htmlFor="subtitulo">Subtítulo:</label>
            </div>
            <div className="form-floating mt-1">
                <textarea className="form-control" id="texto" style={{height: "200px"}}
                    placeholder="texto" value={dadosNoticia.texto}
                    onChange={handleChange} name="observacao" />
                <label htmlFor="texto">Conteúdo da Notícia</label>
            </div>
            <div className="form-floating mt-1">
            <input type="text" className="form-control" id="data"
                placeholder="Senha Leitor" value={<DataAtual/>} name="data" />
            <label htmlFor="senhaLeitor">Data:</label>
            </div>
            <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
            <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/noticias" passHref legacyBehavior>Voltar</Link></div>
        </form>
        </Stack>
    );
}