'use client'
import BusyButton from '@/app/componentes/BusyButton';
import { MessageCallbackContext } from '@/app/layout';
import { schemaAutenticacaoAutor } from '@/app/schemas/validacaoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function SenhaInicialAutor() {

    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaAutenticacaoAutor)
    });

    const onSubmit = (data) => {

        setBusy(true);

        const url = '/api/VerificaSenhaInicialAutor/'
        var args = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, args).then((result) => {
            result.json().then((resultData) => {
                setBusy(false);
                if (result.status == 200) {
                    messageCallback({ tipo: 'sucesso', texto: resultData });
                    reset({senhaInicial: '', senha: ''});
                }
                else {
                    let errorMessage = '';
                    if (resultData.errors != null) {
                        const totalErros = Object.keys(resultData.errors).length;
                        for (var i = 0; i < totalErros; i++)
                            errorMessage = errorMessage + Object.values(resultData.errors)[i] + "<br/>";
                    }
                    else
                        errorMessage = resultData;

                    messageCallback({ tipo: 'erro', texto: errorMessage });
                    reset({senhaInicial: '', senha: ''});
                }
            });
        });
    }

  return (
    <>
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Bem-vindo{'(a)'}, para prosseguir altere sua senha:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
            <input type="password" className="form-control" id="senhaInicial" {...register("senhaInicial")}
            placeholder="Senha Inicial"  name="senhaInicial" />
            <span className='text-danger'>{errors.senhaInicial?.message}</span>
            <label htmlFor="senhaInicial">Senha Temporária (recebida no email):</label>
        </div>
        <div className="form-floating mt-1">
            <input type="password" className="form-control" id="senha" {...register("senha")}
            placeholder="Nova senha"  name="senha" />
            <span className='text-danger'>{errors.senha?.message}</span>
            <label htmlFor="senha">Nova senha:</label>
        </div>
        <div className="form-floating" hidden>
            <input type="text" className="form-control" id="nome" name="nome" {...register("nome")} />
            <input type="text" className="form-control" id="nome" name="email"{...register("email")} />
        </div>
        <BusyButton variant="btn btn-primary mt-2 col-12 bg-black" type="submit" label="Salvar" busy={busy}/>
      </form>
    </Stack>
    </>
  );
}