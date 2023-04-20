'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import BusyButton from '../componentes/BusyButton';
import { MessageCallbackContext } from '../layout';
import { schemaLogin } from '../schemas/validacaoForm';


export default function Login() {

const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaLogin)
  });

  const verificaConta = () => {
    fetch('/api/Usuarios').then((result) => {
        result.json().then((data) => {
            if(data.statusConta == "V")
                window.location = 'http://localhost:3000/';
            else
                window.location = 'http://localhost:3000/leitores/verificacao';
        })
    });
        
  }

    const onSubmit = (data) => {
        setBusy(true);
        
        const url = '/api/Autenticar';
  
        var args = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
        fetch(url, args).then((result) => {
            setBusy(false);
            result.json().then((resultData) => {
                if (result.status == 200) {
                    //ações em caso de sucesso
                    verificaConta();
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                    reset();
                }
                else {
                    //ações em caso de erro
                    let errorMessage = '';
                    if (resultData.errors != null) {
                        const totalErros = Object.keys(resultData.errors).length;
  
                        for (var i = 0; i < totalErros; i++) {
                            errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
                        }
                    }
                    else
                        errorMessage = resultData;
  
                    messageCallback({ tipo: 'erro', texto: errorMessage });
                }
            })
        });
        
    }
 

  return (
    <>
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}! Por favor, realize seu login no sistema:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mt-1">
            <input type="text" className="form-control" id="email" {...register("email")}
                placeholder="Email Leitor"  name="email" />
            <span className='text-danger'>{errors.email?.message}</span>
            <label htmlFor="email">Email:</label>
        </div>
        <div className="form-floating mt-2">
            <input type="password" className="form-control" id="senha" {...register("senha")}
                placeholder="Senha" name="senha" />
            <span className='text-danger'>{errors.senha?.message}</span>
            <label htmlFor="senha">Senha:</label>
        </div>
        <div className="form-floating mt-1" hidden>
            <input type="text" className="form-control" id="nome" {...register("nome")}
                placeholder="Nome"  name="nome" value="Nome" />
            <label htmlFor="nome">Nome:</label>
        </div>
          <BusyButton variant="btn btn-primary mt-3 col-12 bg-black" type="submit" label="ENTRAR" busy={busy}/>
        <Link href="/resetar" passHref legacyBehavior>Esqueceu sua senha?</Link>
      </form>
    </Stack>
    </>
  );
}