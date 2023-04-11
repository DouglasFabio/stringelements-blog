import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AtualizarNoticiaContext } from "./page";
import BusyButton from "@/app/componentes/BusyButton";
import { MessageCallbackContext } from "@/app/layout";
import { schemaAtualizaNoticia } from "@/app/schemas/validacaoForm";

export default function AtualizarNoticia(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarNoticiaContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaAtualizaNoticia)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {

        setBusy(true);

        data.idusuario = props.id;

        const url = '/api/Noticias/' + props.id;
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
                    handleClose();
                    atualizarCallback.atualizar(true);
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

    useEffect(() => {
        if (modalShow === false) {
            reset({ nome: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);

            if (primeiroAcesso) {
                setPrimeiroAcesso(false);
                const url = '/api/Noticias/' + props.id;
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
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Atualizar notícia:</Modal.Title>
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
                        <input type="date" name="dataalteracao" {...register("dataalteracao")} />
                        <input type="text" name="situacao" {...register("situacao")} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="btn btn-primary mt-2 col-6 bg-black" type="submit" label="Atualizar" busy={busy}/>
                    <Button variant="secondary mt-2 col-4" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}