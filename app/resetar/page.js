'use client'
import Link from 'next/link';
import { createContext, useContext,  useEffect,  useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { MessageCallbackContext } from "../layout";
import { useForm } from 'react-hook-form';
import { schemaResetSenha } from '../schemas/validacaoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import BusyButton from '../componentes/BusyButton';
import geraCodigo from '../componentes/CodAtivacao';
import AtualizarSenha from './atualizarsenha';

export const AtualizarSenhaContext = createContext(null);

export default function ResetSenha() {

  const [busy, setBusy] = useState(false);
  const [grid, setGrid] = useState(null);
  const [atualizarGrid, setAtualizarGrid] = useState(null);
  const [operacao, setOperacao] = useState({ id: null, action: null });

  let modal = null;

    if(operacao.action === "update"){
        modal = "<TipoCursoAtualizacao id={operacao.id}/>";
    }

    const fecharModals = () => {
        setOperacao({id:null, action:null});
    }

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaResetSenha)
  });

  const onSubmit = (data) => {
    setBusy(true);
    
    const url = '/api/ResetarSenha';

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
      <Alert variant="secondary"><Alert.Heading>Digite o email cadastrado para receber o código:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
              <input type="text" className="form-control" id="emailLeitor" {...register("email")}
                  placeholder="Email"  name="email"/>
              <span className='text-danger'>{errors.email?.message}</span>
              <label htmlFor="emailLeitor">Email:</label>
        </div>
        <div className="form-floating mt-1" hidden>
            <input type="text" name="codSenha" value={geraCodigo()} {...register("codSenha")} />
            <input type="text" name="nome" value="" {...register("nome")} />
        </div>
        <BusyButton onClick={() => setModalShow(true)} variant="btn btn-primary mt-3 col-12 bg-black" type="submit" label="Enviar" busy={busy}/>
        <div className="btn btn-primary mt-2 col-12 text-white bg-black" htmlFor="voltar"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
      <AtualizarSenhaContext.Provider value={{atualizar: setAtualizarGrid, fechar: fecharModals}}>
        <AtualizarSenha />
        {modal}
      </AtualizarSenhaContext.Provider>
    </Stack>
  );
}