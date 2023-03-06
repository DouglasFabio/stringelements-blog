'use client'
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function PrimeiroAcessoAutor() {

  const [senhaAutor, setSenhaAutor] = useState({
    email: ''
  });

  const handleChange = e => setSenhaAutor({...senhaAutor, [e.target.name]: e.target.value});

  const confirmarNovaSenha = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(senhaAutor.novaSenha);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}, para prosseguir altere sua senha:</Alert.Heading></Alert>
      <form onSubmit={confirmarNovaSenha}>
        <div className="form-floating">
          <input type="text" className="form-control" id="senhaAtual"
              placeholder="senhaAtual" value={senhaAutor.senhaAtual} onChange={handleChange} name="senhaAtual" />
          <label htmlFor="senhaAtual">Código{'(enviado no email de cadastro)'}:</label>
        </div>
        <div className="form-floating mt-2">
          <input type="password" className="form-control" id="novaSenha"
              placeholder="novaSenha" value={senhaAutor.novaSenha} onChange={handleChange} name="novaSenha" />
          <label htmlFor="novaSenha">Nova senha:</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="Confirmar"/>
      </form>
    </Stack>
  );
}