'use client'
import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "../layout";
import { AtualizarSenhaContext } from "./page";
import { schemaNovaSenha } from "../schemas/validacaoForm";
import BusyButton from "../componentes/BusyButton";


export default function AtualizarSenha() {
    const [modalShow, setModalShow] = useState(false);
    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarSenhaContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaNovaSenha)
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
            reset({ codSenha: '', novaSenha: '' })
        }
    }, [modalShow]);

    return (
        <>
            <Button variant="btn btn-primary mt-3 col-12 bg-black" onClick={() => setModalShow(true)}>Já tenho um código</Button>

            <Modal size="md" centered show={modalShow}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Redefinição de Senha</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="row mx-2">
                            Código de Reset:
                            <input type="text" className="form-control"  {...register("codSenha")} />
                            <span className='text-danger'>{errors.codSenha?.message}</span>
                        </label>
                        <label className="row mx-2 mt-2">
                            Nova Senha:
                            <input type="text" className="form-control"  {...register("novaSenha")} />
                            <span className='text-danger'>{errors.novaSenha?.message}</span>
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <BusyButton  variant="success" type="submit" label="Trocar" busy={busy}/>
                        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}