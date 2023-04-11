'use client'
import NavBar from "@/app/componentes/NavBar";
import Link from "next/link";
import { Alert, Stack } from "react-bootstrap";

export default function CadastroNoticias() {
    const [busy, setBusy] = useState(false);

  const messageCallback = useContext(MessageCallbackContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schemaUsuario)
  });

  const onSubmit = (data) => {
      setBusy(true);
      
      const url = '/api/Noticias';

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
        <>
        <NavBar modo="autor"/>
        <Stack gap={2} className="col-md-5 mx-auto" >
        <p></p>
        <Alert variant="secondary"><Alert.Heading>CADASTRO DE NOTÍCIAS:</Alert.Heading></Alert>
        <form >
            <div className="form-floating">
                <input type="text" className="form-control" id="titulo"
                    placeholder="Título"  name="titulo" />
                <label htmlFor="titulo">Título:</label>
            </div>
            <div className="form-floating mt-1">
                <input type="text" className="form-control" id="subtitulo"
                    placeholder="Subtítulo"  name="subtitulo" />
                <label htmlFor="subtitulo">Subtítulo:</label>
            </div>
            <div className="form-floating mt-1">
                <textarea className="form-control" id="texto" style={{height: "200px"}}
                    placeholder="texto"  name="observacao" />
                <label htmlFor="texto">Conteúdo da Notícia</label>
            </div>
            <div className="form-floating mt-1">
            <input type="text" className="form-control" id="data"
                placeholder="Senha Leitor"  name="data" />
            <label htmlFor="senhaLeitor">Data:</label>
            </div>
            <input type="submit" className="btn btn-primary mt-3 col-12 bg-black" value="Cadastrar"/>
            <div className="btn btn-primary mt-2 col-12 bg-black"><Link href="/noticias" passHref legacyBehavior>Voltar</Link></div>
        </form>
        </Stack>
        </>
    );
}