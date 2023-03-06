'use client'
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function VerificarContaLeitor() {

  const [verificaCodigo, setVerificaCodigo] = useState({
    email: ''
  });

  const handleChange = e => setVerificaCodigo({...verificaCodigo, [e.target.name]: e.target.value});

  const verificarCodigo = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(verificaCodigo.codigo);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Insira o código recebido no email cadastrado:</Alert.Heading></Alert>
      <form onSubmit={verificarCodigo}>
        <div className="form-floating">
          <input type="text" className="form-control" id="codigo"
              placeholder="codigo" value={verificaCodigo.email} onChange={handleChange} name="codigo" />
          <label htmlFor="codigo">Código</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="Verificar"/>
      </form>
    </Stack>
  );
}