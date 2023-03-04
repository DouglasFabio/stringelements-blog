'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'

export default function CadastroAutor() {

  const [dadosAutor, setDadosAutor] = useState({
    nomeAutor: '',
    emailAutor: '',
    apelidoAutor: '',
    dataNascimentoAutor: '',
    senhaAutor: 'GERA-SENHA-ALEATORIA API'
  });

  const handleChange = e => setDadosAutor({...dadosAutor, [e.target.name]: e.target.value});

  const enviaDadosAutor = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(dadosAutor.nomeAutor+dadosAutor.emailAutor);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>CADASTRO DE AUTORES:</Alert.Heading></Alert>
      <form onSubmit={enviaDadosAutor}>
        <div className="form-floating">
          <input type="text" className="form-control" id="nomeAutor"
              placeholder="Nome Autor" value={dadosAutor.nomeAutor} onChange={handleChange} name="nomeAutor" />
          <label htmlFor="nomeAutor">Nome Autor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="email" className="form-control" id="emailAutor"
                placeholder="Data" value={dadosAutor.emailAutor} onChange={handleChange} name="emailAutor" />
            <label htmlFor="emailAutor">Email Autor:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="text" className="form-control" id="apelidoAutor"
              placeholder="Apelido Autor" value={dadosAutor.apelidoAutor} onChange={handleChange} name="apelidoAutor" />
          <label htmlFor="apelidoAutor">Apelido Autor:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="date" className="form-control" id="dataNascimentoAutor"
              placeholder="Data Nascimento" value={dadosAutor.dataNascimentoAutor} onChange={handleChange} name="dataNascimentoAutor" />
          <label htmlFor="dataNascimentoAutor">Data Nascimento:</label>
        </div>
        <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
        <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}