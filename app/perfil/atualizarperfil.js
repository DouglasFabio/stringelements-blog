import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "../layout";
import { AtualizarPerfilContext } from "./page";
import { schemaUsuario } from "../schemas/validacaoForm";
import BusyButton from "../componentes/BusyButton";

export default function PerfilAtualizacao(props) {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(AtualizarPerfilContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaUsuario)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        setBusy(true);

        data.email = props.email;

        const url = '/api/Usuarios/' + props.email;
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
            reset({ email: '', dtnascimento: '' })
        }
    }, [modalShow]);

    useEffect(() => {
        if (primeiroAcesso === null)
            setPrimeiroAcesso(true);

        if (primeiroAcesso) {
            setPrimeiroAcesso(false);
            const url = '/api/Usuarios/' + props.email;
            fetch(url).then(
                (result) => {
                    result.json().then((data) => {
                        reset({ email: data.email, dtnascimento: data.dtnascimento });
                    })
                }
            );
        }
    }, [primeiroAcesso]);

    return (
        <Modal size="md" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Atualização de Perfil - {props.email} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="row mx-2">
                        Email
                        <input type="text" className="form-control" name="email"  {...register("email")} />
                        <span className='text-danger'>{errors.email?.message}</span>
                    </label>
                    <label className="row mx-2 mt-2">
                        Data de Nascimento
                        <input type="date" className="form-control" maxLength={10} name="dtnascimento" {...register("dtnascimento")} />
                        <span className='text-danger'>{errors.dtnascimento?.message}</span>
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="success" type="submit" label="Salvar" busy={busy} />
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}