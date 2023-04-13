'use client'
import BusyButton from '@/app/componentes/BusyButton';
import { MessageCallbackContext } from '@/app/layout';
import { schemaVerificaLeitor } from '@/app/schemas/validacaoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function VerificarEmail() {

    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaVerificaLeitor)
    });

    const onSubmit = (data) => {

        setBusy(true);

        const url = '/api/VerificaCodAtivacao/'
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
                }
            });
        });
    }

  return (
    <>
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Para verificar o novo email, por favor, insira o código recebido:</Alert.Heading></Alert>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating">
            <input type="text" className="form-control" id="codAtivacao" {...register("codAtivacao")}
            placeholder="Código Ativação"  name="codAtivacao" />
            <span className='text-danger'>{errors.codAtivacao?.message}</span>
            <label htmlFor="nomeAutor">Código Ativação:</label>
        </div>
        <div className="form-floating" hidden>
            <input type="text" className="form-control" id="nome" name="nome" {...register("nome")} />
            <input type="text" className="form-control" id="nome" name="email"{...register("email")} />
            <input type="password" className="form-control" id="nome" name="senha" {...register("senha")}/>
        </div>
        <BusyButton variant="btn btn-primary mt-2 col-12 bg-black" type="submit" label="Verificar" busy={busy}/>
      </form>
    </Stack>
    </>
  );
}