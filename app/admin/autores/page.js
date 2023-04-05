'use client'
import Link from 'next/link';
import { useContext,  useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaAutor } from '@/app/schemas/validacaoForm';
import BusyButton from '@/app/componentes/BusyButton';
import { MessageCallbackContext } from '@/app/layout';

export default function CadastroAutor() {
  const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaAutor)
  });

  const onSubmit = (data) => {
      setBusy(true);
      
      const url = '/api/Autores';

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
                  //handler(res.redirect(307, '/leitores/verificacao'));                 
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
      <Alert variant="secondary"><Alert.Heading>Cadastro de Autores:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
            <input type="text" className="form-control" id="nomeAutor" {...register("nome")}
              placeholder="Nome Autor"  name="nome" />
            <span className='text-danger'>{errors.nome?.message}</span>
            <label htmlFor="nomeAutor">Nome Autor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="text" className="form-control" id="emailAutor" {...register("email")}
                placeholder="Email "  name="email"/>
            <span className='text-danger'>{errors.email?.message}</span>
            <label htmlFor="emailAutor">Email Autor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="text" className="form-control" id="apelidoAutor" {...register("apelidoAutor")}
              placeholder="Apelido Autor"  name="apelidoAutor" />
            <span className='text-danger'>{errors.apelidoAutor?.message}</span>
            <label htmlFor="apelidoAutor">Apelido Autor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="date" className="form-control" id="dtNascAutor" {...register("dtnascimento")}
              placeholder="Data Nascimento" name="dtnascimento" maxLength={10} />
            <span className='text-danger'>{errors.dtnascimento?.message}</span>
          <label htmlFor="dtNascAutor">Data Nascimento:</label>
        </div>
        <div className="form-floating mt-1" hidden>
            <input type="text" name="tipoUsuario" value="A" {...register("tipoUsuario")} />
            <input type="text" name="senha" {...register("senha")} />
            <input type="text" name="codAtivacao" {...register("codAtivacao")} />
        </div>
        <BusyButton variant="btn btn-primary mt-3 col-12 bg-black" type="submit" label="Cadastrar" busy={busy}/>
        <div className="btn btn-primary mt-2 col-12 text-white bg-black" htmlFor="voltar"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}