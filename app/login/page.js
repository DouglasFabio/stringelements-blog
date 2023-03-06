'use client'
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {

  const [login, setLogin] = useState({
    usuario: '',
    senha: ''
  });

  const handleChange = e => setLogin({...login, [e.target.name]: e.target.value});

  const verificaLogin = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(login.usuario+login.senha);
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}! Por favor, cadastre um administrador do sistema:</Alert.Heading></Alert>
      <form onSubmit={verificaLogin}>
        <div className="form-floating">
          <input type="text" className="form-control" id="usuario"
              placeholder="Usuário" value={login.usuario} onChange={handleChange} name="usuario" />
          <label htmlFor="usuario">Email:</label>
        </div>
        <div className="form-floating mt-2">
            <input type="password" className="form-control" id="senha"
                placeholder="senha" value={login.senha} onChange={handleChange} name="senha" />
            <label htmlFor="senha">Senha</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="ENTRAR"/>
      </form>
    </Stack>
  );
}