'use client'
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EnviaCodigo() {

  const [enviaCodigo, setEnviaCodigo] = useState({
    email: ''
  });

  const handleChange = e => setEnviaCodigo({...enviaCodigo, [e.target.name]: e.target.value});

  const enviarCodigo = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(enviaCodigo.email);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Digite o email cadastrado para receber o código:</Alert.Heading></Alert>
      <form onSubmit={enviarCodigo}>
        <div className="form-floating">
          <input type="email" className="form-control" id="email"
              placeholder="Email" value={enviaCodigo.email} onChange={handleChange} name="email" />
          <label htmlFor="email">Email</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="Enviar"/>
      </form>
    </Stack>
  );
}