'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBar from '../componentes/NavBar';

export default function Login() {

  const [login, setLogin] = useState({
    email: '',
    senha: ''
  });

  const handleChange = e => setLogin({...login, [e.target.name]: e.target.value});

  const verificaLogin = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(login.email+login.senha);
  }

  return (
    <>
    <NavBar modo="semLogin"/>
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}! Por favor, realize seu login no sistema:</Alert.Heading></Alert>
      <form onSubmit={verificaLogin}>
        <div className="form-floating">
          <input type="email" className="form-control" id="email"
              placeholder="Email" value={login.email} onChange={handleChange} name="email" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mt-2">
            <input type="password" className="form-control" id="senha"
                placeholder="senha" value={login.senha} onChange={handleChange} name="senha" />
            <label htmlFor="senha">Senha</label>
        </div>
        <input type="submit" className="btn btn-primary mt-1 col-12 bg-black" value="ENTRAR"/>
        <Link href="/resetar" passHref legacyBehavior>Esqueceu sua senha?</Link>
      </form>
    </Stack>
    </>
  );
}