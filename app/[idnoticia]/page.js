'use client'
import BusyButton from "@/app/componentes/BusyButton";
import NavBar from "@/app/componentes/NavBar"
import { MessageCallbackContext } from "@/app/layout";
import { schemaComentario } from "@/app/schemas/validacaoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link"
import { useContext, useEffect, useState } from "react";
import { Badge, Button, Stack } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

export default function Noticia(props){

    const [busy, setBusy] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaComentario)
    });

    const messageCallback = useContext(MessageCallbackContext);
    const [operacao, setOperacao] = useState({ id: null, action: null });
    const [gridNoticiaID, setGridNoticiaID] = useState(null);
    const [atualizarGrid, setAtualizarGrid] = useState(null);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    if(operacao.action === "positivo"){
        
    }else if(operacao.action === "negativo"){
    
    }else{

    }

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/Comentarios';

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

    const pesquisar = () => {



        fetch('/api/NoticiasPublicadas/10').then((result) => {
            result.json().then((data) => {
                let finalGrid = 
                    <div className="container-md" key={data.idnoticia}>
                        <h1>{data.titulo}</h1>
                        <h2>{data.subtitulo}</h2>
                        <h3>{data.datapublicacao}</h3>
                        <h4>{data.codautor}</h4>
                        <h5>{data.texto}</h5>     
                    </div>
                
                setGridNoticiaID(finalGrid);
            })
        }
        );
    }

    useEffect(() => {
        if (atualizarGrid === null)
            setAtualizarGrid(true);
        if (atualizarGrid) {
            setAtualizarGrid(false);
            pesquisar();  
        }
    }, [atualizarGrid])

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);

            if (primeiroAcesso) {
                setPrimeiroAcesso(false);
                const url = '/api/NoticiasPublicadas/';
                fetch(url).then(
                    (result) => {
                        result.json().then((data) => {
                            reset({ titulo: data.titulo });
                        })
                    }
                );
            }
        }, [primeiroAcesso]);


    return (

        <>
            <NavBar modo="semLogin"/>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <p></p>
                    
                    <Link href="/" passHref legacyBehavior>Voltar</Link>
                    {gridNoticiaID}
                    <hr/>
                    <div>
                        <Button variant="success" onClick={() => setOperacao({id: 2, action: "positivo" })} 
                            style={{float: 'left', margin: 5}} 
                            title="GOSTEI">
                            <Badge bg="success" size={20}>9</Badge>
                            <BsHandThumbsUp size={20}/>
                        </Button>
                        <Button variant="danger" onClick={() => setOperacao({id: 3, action: "negativo" })} 
                            style={{float: 'left', margin: 5}} 
                            title="NÃO GOSTEI">
                            <Badge bg="danger" size={20}>2</Badge>
                            <BsHandThumbsDown size={20}/>
                        </Button>
                        
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-floating mt-1">
                            <textarea className="form-control" id="comentario" style={{height: "200px"}} {...register("comentario")}
                                placeholder="Comentario"  name="comentario" />
                            <label htmlFor="comentario">Comentário</label>
                            <span className='text-danger'>{errors.comentario?.message}</span>
                        </div>
                        <div className="form-floating mt-1">
                            <BusyButton variant="btn btn-primary mt-2 col-6 bg-black" type="submit" label="ENVIAR" busy={busy}/>
                        </div>
                    </form>
                </Stack>
        </>
    )
}