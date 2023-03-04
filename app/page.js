'use client'
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PrimeiroAcessoADM() {

  const [dadosADM, setDadosADM] = useState({
    nomeADM: '',
    emailADM: '',
    senhaADM: ''
  });

  const handleChange = e => setDadosADM({...dadosADM, [e.target.name]: e.target.value});

  const enviaDadosADM = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(dadosADM.nomeADM+dadosADM.emailADM+dadosADM.senhaADM);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}! Cadastre um administrador do sistema:</Alert.Heading></Alert>
      <form onSubmit={enviaDadosADM}>
        <div className="form-floating">
          <input type="text" className="form-control" id="nome"
              placeholder="Nome" value={dadosADM.nomeADM} onChange={handleChange} name="nomeADM" />
          <label htmlFor="nomeADM">Nome</label>
        </div>
        <div className="form-floating mt-2">
            <input type="email" className="form-control" id="emailADM"
                placeholder="Data" value={dadosADM.emailADM} onChange={handleChange} name="emailADM" />
            <label htmlFor="emailADM">Email</label>
        </div>
        <div className="form-floating mt-2">
            <input type="password" className="form-control" id="senhaADM"
                placeholder="Data" value={dadosADM.senhaADM} onChange={handleChange} name="senhaADM" />
            <label htmlFor="senhaADM">Senha</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="Cadastrar"/>
      </form>
    </Stack>
  );
}