'use client'
import BusyButton from "@/app/componentes/BusyButton";
import { MessageCallbackContext } from "@/app/layout";
import { schemaNoticia } from "@/app/schemas/validacaoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CadastrarNoticiaContext } from "./page";

export default function CadastrarNoticia() {
    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(CadastrarNoticiaContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaNoticia)
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
        atualizarCallback.fechar();
        setModalShow(false);
    }

    useEffect(() => {
        if (modalShow === false) {
            reset({ titulo: '', subtitulo: '', texto: ''})
        }
    }, [modalShow]);
    return (
       <Modal size="md col-10" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Cadastro de Notícia:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="titulo" {...register("titulo")}
                        placeholder="Título"  name="titulo" />
                        <span className='text-danger'>{errors.titulo?.message}</span>
                        <label htmlFor="titulo">Título:</label>
                    </div>
                    <div className="form-floating mt-1">
                        <input type="text" className="form-control" id="subtitulo" {...register("subtitulo")}
                        placeholder="Subtítulo"  name="subtitulo" />
                        <span className='text-danger'>{errors.subtitulo?.message}</span>
                        <label htmlFor="subtitulo">Subtítulo:</label>
                    </div>
                    <div className="form-floating mt-1">
                        <textarea className="form-control" id="texto" style={{height: "200px"}} {...register("texto")}
                            placeholder="texto"  name="texto" />
                        <label htmlFor="texto">Conteúdo da Notícia</label>
                        <span className='text-danger'>{errors.texto?.message}</span>
                    </div>
                    <div className="form-floating mt-1" hidden>
                        <input type="date" name="datapublicacao" {...register("datapublicacao")} />
                        <input type="text" name="situacao" {...register("situacao")} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="btn btn-primary mt-2 col-6 bg-black" type="submit" label="Cadastrar" busy={busy}/>
                    <Button variant="secondary mt-2 col-4" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}