'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'

export const schema = yup.object({
  nome: yup.string()
      .min(1, 'O nome deve conter, no mínimo, 3 caracteres')
      .max(100, 'O nome deve conter, no máximo, 100 caracteres')
      .required('O nome é obrigatório'),
  descricao: yup.string()
      .min(5, 'A descrição deve conter, no mínimo, 5 caracteres')
      .required('A descrição é obrigatória')
}).required();

export default function TipoCursoNovo() {
  const [modalShow, setModalShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);
  const atualizarCallback = useContext(AtualizarTipoCursoContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
      setBusy(true);

      const url = '/api/tipocurso';

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
                  atualizarCallback.atualizar(true);
                  messageCallback({ tipo: 'sucesso', texto: resultData });
                  handleClose();
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

  const handleClose = () => {
      setModalShow(false);
  }

  useEffect(() => {
      if (modalShow === false) {
          reset({ nome: '', descricao: '' })
      }
  }, [modalShow]);

  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>Olá! Você está prestes a se tornar um LEITOR VIP, por favor preencha os campos abaixo:</Alert.Heading></Alert>
      <form onSubmit={enviaDadosLeitor}>
        <div className="form-floating">
          <input type="text" className="form-control" id="nomeLeitor"
              placeholder="Nome Leitor" value={dadosLeitor.nomeAutor} onChange={handleChange} name="nomeLeitor" />
          <label htmlFor="nomeLeitor">Nome Leitor:</label>
        </div>
        <div className="form-floating mt-1">
            <input type="email" className="form-control" id="emailLeitor"
                placeholder="Email Leitor" value={dadosLeitor.emailAutor} onChange={handleChange} name="emailAutor" />
            <label htmlFor="emailLeitor">Email Leitor:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="date" className="form-control" id="dataNascimentoAutor"
              placeholder="Data Nascimento" value={dadosLeitor.dataNascimentoAutor} onChange={handleChange} name="dataNascimentoLeitor" />
          <label htmlFor="dataNascimentoLeitor">Data Nascimento:</label>
        </div>
        <div className="form-floating mt-1">
          <input type="password" className="form-control" id="senhaLeitor"
              placeholder="Senha Leitor" value={dadosLeitor.senhaLeitor} onChange={handleChange} name="senhaLeitor" />
          <label htmlFor="senhaLeitor">Senha Leitor:</label>
        </div>
        <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
        <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}