'use client'
import Link from 'next/link';
import { useContext,  useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { MessageCallbackContext } from "../layout";
import { useForm } from 'react-hook-form';
import { schemaUsuario } from '../schemas/validacaoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import BusyButton from '../componentes/BusyButton';
import geraCodigo, { codAtivacao } from '../componentes/CodAtivacao';

export default function CadastroLeitor() {
  const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaUsuario)
  });

  const onSubmit = (data) => {
      setBusy(true);
      
      const url = '/api/Usuarios';

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
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Olá! Você está prestes a se tornar um LEITOR VIP, por favor preencha os campos abaixo:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
            <input type="text" className="form-control" id="nomeLeitor" {...register("nome")}
              placeholder="Nome Leitor"  name="nome" />
            <span className='text-danger'>{errors.nome?.message}</span>
            <label htmlFor="nomeLeitor">Nome Leitor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="text" className="form-control" id="emailLeitor" {...register("email")}
                placeholder="Email Leitor"  name="email" />
            <span className='text-danger'>{errors.email?.message}</span>
            <label htmlFor="emailLeitor">Email Leitor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="date" className="form-control" id="dtNascLeitor" {...register("dtnascimento")}
              placeholder="Data Nascimento" name="dtnascimento" maxLength={10} />
            <span className='text-danger'>{errors.dtnascimento?.message}</span>
          <label htmlFor="dtNascLeitor">Data Nascimento:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="password" className="form-control" id="senhaLeitor" {...register("senha")}
              placeholder="Senha Leitor"  name="senha" />
            <span className='text-danger'>{errors.senha?.message}</span>
          <label htmlFor="senhaLeitor">Senha Leitor:</label>
        </div>
        <div className="form-floating mt-1" hidden>
            <input type="text" name="codAtivacao" value={geraCodigo()} {...register("codAtivacao")} />
            <input type="text" name="statusSenha" value="N" {...register("statusSenha")}  />
            <input type="text" name="statusConta" value="N" {...register("statusConta")}  />
            <input type="text" name="tipoUsuario" value="L" {...register("tipoUsuario")}  />
        </div>
        <BusyButton variant="btn btn-primary mt-3 col-12 bg-black" type="submit" label="Cadastrar" busy={busy}/>
        <div className="btn btn-primary mt-2 col-12 text-white bg-black" htmlFor="voltar"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}