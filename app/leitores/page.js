'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'

export default function CadastroLeitor() {

  const [dadosLeitor, setDadosLeitor] = useState({
    nomeLeitor: '',
    emailLeitor: '',
    dataNascimentoLeitor: '',
    senhaLeitor: ''
  });

  const handleChange = e => setDadosLeitor({...dadosLeitor, [e.target.name]: e.target.value});

  const enviaDadosLeitor = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(dadosLeitor.nomeAutor+dadosLeitor.emailAutor);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Olá! Você está prestes a se tornar um LEITOR VIP, por favor preencha os campos abaixo:</Alert.Heading></Alert>
      <form onSubmit={enviaDadosLeitor}>
        <div className="form-floating">
          <input type="text" className="form-control" id="nomeLeitor"
              placeholder="Nome Leitor" value={dadosLeitor.nomeAutor} onChange={handleChange} name="nomeLeitor" />
          <label htmlFor="nomeLeitor">Nome Leitor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="email" className="form-control" id="emailLeitor"
                placeholder="Email Leitor" value={dadosLeitor.emailAutor} onChange={handleChange} name="emailAutor" />
            <label htmlFor="emailLeitor">Email Leitor:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="date" className="form-control" id="dataNascimentoAutor"
              placeholder="Data Nascimento" value={dadosLeitor.dataNascimentoAutor} onChange={handleChange} name="dataNascimentoLeitor" />
          <label htmlFor="dataNascimentoLeitor">Data Nascimento:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="password" className="form-control" id="senhaLeitor"
              placeholder="Senha Leitor" value={dadosLeitor.senhaLeitor} onChange={handleChange} name="senhaLeitor" />
          <label htmlFor="senhaLeitor">Senha Leitor:</label>
        </div>
        <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
        <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}