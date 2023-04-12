import * as yup from "yup";

export const schemaNovaSenha = yup.object({
  codSenha: yup.string()
    .max(8, 'O código deve conter, no máximo, 8 caracteres')
    .required('O código é obrigatório'),
  senha: yup.string()
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres')
    .required('A senha é obrigatória')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha precisa ter no mínimo 8 caracteres, ' +
          'uma letra maiúscula e uma letra minúscula, ' +
          'um número e um caracter especial'
  )
}).required();


export const schemaResetSenha = yup.object({
  email: yup.string()
    .email('Utilize um email válido: exemplo@email.com')
    .min(5, 'O email deve conter, no mínimo, 5 caracteres')
    .max(50, 'O email deve conter, no máximo, 50 caracteres')
    .required('O email é obrigatório'),
}).required();

export const schemaAdmin = yup.object({
  nome: yup.string()
      .min(1, 'O nome deve conter, no mínimo, 3 caracteres')
      .max(50, 'O nome deve conter, no máximo, 50 caracteres')
      .required('O nome é obrigatório'),
  email: yup.string()
    .email('Utilize um email válido: exemplo@email.com')
    .min(5, 'O email deve conter, no mínimo, 5 caracteres')
    .max(50, 'O email deve conter, no máximo, 50 caracteres')
    .required('O email é obrigatório'),
  senha: yup.string()
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres')
    .required('A senha é obrigatória')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha precisa ter no mínimo 8 caracteres, ' +
          'uma letra maiúscula e uma letra minúscula, ' +
          'um número e um caracter especial'
  )
}).required();

export const schemaUsuario = yup.object({
    nome: yup.string()
        .min(1, 'O nome deve conter, no mínimo, 3 caracteres')
        .max(50, 'O nome deve conter, no máximo, 50 caracteres')
        .required('O nome é obrigatório'),
    email: yup.string()
      .email('Utilize um email válido: exemplo@email.com')
      .min(5, 'O email deve conter, no mínimo, 5 caracteres')
      .max(50, 'O email deve conter, no máximo, 50 caracteres')
      .required('O email é obrigatório'),
    dtnascimento: yup.string()
      .required('A data de nascimento é obrigatória'),
    senha: yup.string()
      .min(8, 'A senha deve conter, no mínimo, 8 caracteres')
      .required('A senha é obrigatória')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'A senha precisa ter no mínimo 8 caracteres, ' +
            'uma letra maiúscula e uma letra minúscula, ' +
            'um número e um caracter especial'
    )
}).required();

export const schemaAutor = yup.object({
  nome: yup.string()
    .min(1, 'O nome deve conter, no mínimo, 3 caracteres')
    .max(50, 'O nome deve conter, no máximo, 50 caracteres')
    .required('O nome é obrigatório'),
  email: yup.string()
    .email('Utilize um email válido: exemplo@email.com')
    .min(5, 'O email deve conter, no mínimo, 5 caracteres')
    .max(50, 'O email deve conter, no máximo, 50 caracteres')
    .required('O email é obrigatório'),
  dtnascimento: yup.string()
    .required('A data de nascimento é obrigatória'),
  apelidoAutor: yup.string()
    .min(1, 'O apelido deve conter, no mínimo, 3 caracteres')
    .max(50, 'O apelido deve conter, no máximo, 50 caracteres')
    .required('O apelido é obrigatório')
}).required();

export const schemaAtualizaAutor = yup.object({
  nome: yup.string()
    .min(1, 'O nome deve conter, no mínimo, 3 caracteres')
    .max(50, 'O nome deve conter, no máximo, 50 caracteres')
    .required('O nome é obrigatório')
  }).required();

  export const schemaAtualizaPerfil = yup.object({
    email: yup.string()
    .email('Utilize um email válido: exemplo@email.com')
    .min(5, 'O email deve conter, no mínimo, 5 caracteres')
    .max(50, 'O email deve conter, no máximo, 50 caracteres')
    .required('O email é obrigatório'),
  dtnascimento: yup.string()
    .required('A data de nascimento é obrigatória')
    }).required();

export const schemaNoticia = yup.object({
  titulo: yup.string()
    .min(3, 'O título deve conter, no mínimo, 3 caracteres')
    .max(25, 'O título deve conter, no máximo, 25 caracteres')
    .required('O título é obrigatório'),
  subtitulo: yup.string()
    .min(3, 'O subtítulo deve conter, no mínimo, 3 caracteres')
    .max(50, 'O subtítulo deve conter, no máximo, 50 caracteres')
    .required('O subtítulo é obrigatório'),
  texto: yup.string()
    .min(5, 'O conteúdo deve conter, no mínimo, 5 caracteres')
    .max(500, 'O conteúdo deve conter, no máximo, 500 caracteres')
    .required('O conteúdo é obrigatório'),
  situacao: yup.string()
    .required('A situação é obrigatória')
}).required();

export const schemaVerificaLeitor = yup.object({
  codAtivacao: yup.string()
    .required('O código é obrigatório')
}).required();

export const schemaAutenticacaoAutor = yup.object({
  senhaInicial: yup.string()
    .required('A senha temporária é obrigatória'),
  senha: yup.string()
    .min(8, 'A senha deve conter, no mínimo, 8 caracteres')
    .required('A senha é obrigatória')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha precisa ter no mínimo 8 caracteres, ' +
          'uma letra maiúscula e uma letra minúscula, ' +
          'um número e um caracter especial'
  )
}).required();