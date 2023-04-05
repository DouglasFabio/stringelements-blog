'use client'
import { useContext,  useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { MessageCallbackContext } from "../layout";
import { useForm } from 'react-hook-form';
import { schemaAdmin } from '../schemas/validacaoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import BusyButton from '../componentes/BusyButton';
import Admin from './layout';

export default function CadastroAdmin() {

  const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaAdmin)
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
    <Admin>
      <Stack gap={2} className="col-md-5 mx-auto" >
        <p></p>
        <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}! Por favor, cadastre um administrador do sistema:</Alert.Heading></Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating">
              <input type="text" className="form-control" id="nomeAdmin" {...register("nome")}
                placeholder="Nome Admin"  name="nome" />
              <span className='text-danger'>{errors.nome?.message}</span>
              <label htmlFor="nomeLeitor">Nome:</label>
          </div>
          <div className="form-floating mt-1">
              <input type="text" className="form-control" id="emailAdmin" {...register("email")}
                  placeholder="Email Leitor"  name="email" />
              <span className='text-danger'>{errors.email?.message}</span>
              <label htmlFor="emailAdmin">Email:</label>
          </div>
          <div className="form-floating mt-2">
              <input type="password" className="form-control" id="senhaAdmin" {...register("senha")}
                  placeholder="Senha" name="senha" />
              <span className='text-danger'>{errors.senha?.message}</span>
              <label htmlFor="senhaAdmin">Senha:</label>
          </div>
          <div className="form-floating mt-1" hidden>
              <input type="text" name="tipoUsuario" value="M" {...register("tipoUsuario")}  />
          </div>
          <BusyButton variant="btn btn-primary mt-3 col-12 bg-black" type="submit" label="Cadastrar" busy={busy}/>
        </form>
      </Stack>
    </Admin>
  );
}