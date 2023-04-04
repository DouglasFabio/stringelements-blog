'use client'
import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "../layout";
import { AtualizarPerfilContext } from "./page";
import { schemaUsuario } from "../schemas/validacaoForm";
import BusyButton from "../componentes/BusyButton";


export default function AtualizarPerfil() {
    const [modalShow, setModalShow] = useState(false);
    const [busy, setBusy] = useState(false);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarPerfilContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaUsuario)
    });

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/Usuarios';

        var args = {
            method: 'PUT',
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
            reset({ codSenha: '', senha: '' })
        }
    }, [modalShow]);

    return (
        <>
            <Button variant="btn btn-primary mt-3 col-12 bg-black" onClick={() => setModalShow(true)}>EDITAR</Button>

            <Modal size="md" centered show={modalShow}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Editar Perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="row mx-2">
                            Email:
                            <input type="email" className="form-control" name="email"  {...register("email")} />
                            <span className='text-danger'>{errors.email?.message}</span>
                        </label>
                        <label className="row mx-2 mt-2">
                            Data Nascimento:
                            <input type="date" className="form-control" name="dtnascimento" maxLength={10}  {...register("dtnascimento")} />
                            <span className='text-danger'>{errors.dtnascimento?.message}</span>
                        </label>
                        <label className="row mx-2 mt-2" hidden>
                            <input type="text" className="form-control" name="nome" value="" {...register("nome")} />
                        </label>
                    </Modal.Body>
                    <Modal.Footer>
                        <BusyButton  variant="success" type="submit" label="Salvar" busy={busy}/>
                        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}