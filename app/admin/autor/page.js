'use client'
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';


export default function CadastroAutor() {

  const schema = yup.object({
    nomeAutor: yup.string()
      .min(3, 'O nome deve conter, no mínimo, 3 caracteres')
      .max(100, 'O nome deve conter, no máximo, 100 caracteres')
      .required('O nome é obrigatório'),
    emailAutor: yup.string()
      .min(3, 'O email deve conter, no mínimo, 3 caracteres')
      .max(100, 'O email deve conter, no máximo, 100 caracteres')
      .required('O email é obrigatório'),
    apelido: yup.string()
      .min(3, 'O apelido deve conter, no mínimo, 3 caracteres')
      .max(15, 'O nome deve conter, no máximo, 15 caracteres')
      .required('O apelido é obrigatório'),
    dataNascimento: yup.string()
      .required('A data de nascimento é obrigatória')
  }).required();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const [dadosAutor, setDadosAutor] = useState({
    nomeAutor: '',
    emailAutor: '',
    apelidoAutor: '',
    dataNascimentoAutor: '',
    senhaAutor: 'GERA-SENHA-ALEATORIA - INSERIR API auto'
  });

  const handleChange = e => setDadosAutor({...dadosAutor, [e.target.name]: e.target.value});

  const enviaDadosAutor = async e =>{
    e.preventDefault(); //nao limpar o console após o submit
    console.log(dadosAutor.nomeAutor+dadosAutor.emailAutor);
  }


  return (
    <Stack gap={2} className="col-md-5 mx-auto" >
      <p></p>
      <Alert variant="secondary"><Alert.Heading>CADASTRO DE AUTORES:</Alert.Heading></Alert>
      <form onSubmit={enviaDadosAutor}>
        <div className="form-floating">
          <input type="text" className="form-control" {...register("nomeAutor")} id="nomeAutor"
              placeholder="Nome Autor" value={dadosAutor.nomeAutor} onChange={handleChange} name="nomeAutor" />
          <label htmlFor="nomeAutor">Nome Autor:</label>
          <span className='text-danger'>{errors.nomeAutor?.message}</span>
        </div>
        <div className="form-floating mt-1">
            <input type="email" className="form-control" {...register("emailAutor")}  id="emailAutor"
                placeholder="Data" value={dadosAutor.emailAutor} onChange={handleChange} name="emailAutor" />
            <label htmlFor="emailAutor">Email Autor:</label>
            <span className='text-danger'>{errors.emailAutor?.message}</span>
        </div>
        <div className="form-floating mt-1">
          <input type="text" className="form-control" {...register("apelido")} id="apelidoAutor"
              placeholder="Apelido Autor" value={dadosAutor.apelidoAutor} onChange={handleChange} name="apelidoAutor" />
          <label htmlFor="apelidoAutor">Apelido Autor:</label>
          <span className='text-danger'>{errors.apelido?.message}</span>
        </div>
        <div className="form-floating mt-1">
          <input type="date" className="form-control" {...register("dataNascimento")} id="dataNascimentoAutor"
              placeholder="Data Nascimento" value={dadosAutor.dataNascimentoAutor} onChange={handleChange} name="dataNascimentoAutor" />
          <label htmlFor="dataNascimentoAutor">Data Nascimento:</label>
          <span className='text-danger'>{errors.dataNascimento?.message}</span>
        </div>
        <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
        <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/" passHref legacyBehavior>Voltar</Link></div>
      </form>
    </Stack>
  );
}