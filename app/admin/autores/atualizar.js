import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AtualizarAutorContext } from "./page";
import BusyButton from "@/app/componentes/BusyButton";
import { schemaAutor } from "@/app/schemas/validacaoForm";
import { MessageCallbackContext } from "@/app/layout";

export default function AtualizarAutor(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarAutorContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaAutor)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        setBusy(true);

        data.idusuario = props.id;

        const url = '/api/Autores/' + props.id;
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
                const url = '/api/tipocurso/' + props.id;
                fetch(url).then(
                    (result) => {
                        result.json().then((data) => {
                            reset({ nome: data.nome });
                        })
                    }
                );
            }
        }, [primeiroAcesso]);
    return (
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Atualizar dados:</Modal.Title>
                </Modal.Header>
                <Modal.Body>     
                    <div className="form-floating">
                        <input type="text" className="form-control" id="nomeAutor" {...register("nome")}
                        placeholder="Nome Autor"  name="nome" />
                        <span className='text-danger'>{errors.nome?.message}</span>
                        <label htmlFor="nomeAutor">Nome Autor:</label>
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