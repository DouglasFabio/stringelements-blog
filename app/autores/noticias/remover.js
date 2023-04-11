'use client'
import BusyButton from "@/app/componentes/BusyButton";
import { MessageCallbackContext } from "@/app/layout";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AtualizarNoticiaContext } from "./page";

export default function DeletarNoticia(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);

    const atualizarCallback = useContext(AtualizarNoticiaContext);
    const messageCallback = useContext(MessageCallbackContext);

    const { handleSubmit } = useForm();

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = () => {

        setBusy(true);
        const url = '/api/Noticias/' + props.id;
        var args = {
            method: 'DELETE'
        };
        fetch(url, args).then((result) => {
            result.text().then((resultData) => {
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

    return (
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>ATENÇÃO, esta operação é irreversível</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover esta notícia?
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="danger" type="submit" label="Remover" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}