import { useEffect, useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageCallbackContext } from "@/app/layout";
import { CadastrarAutorContext } from "./page";
import { schemaAutor } from "@/app/schemas/validacaoForm";
import BusyButton from "@/app/componentes/BusyButton";

export default function CadastrarAutor() {

    const [modalShow, setModalShow] = useState(true);
    const [busy, setBusy] = useState(false);
    const [primeiroAcesso, setPrimeiroAcesso] = useState(null);

    const messageCallback = useContext(MessageCallbackContext);
    const atualizarCallback = useContext(CadastrarAutorContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaAutor)
    });

    const handleClose = () => {
        atualizarCallback.fechar();
        setModalShow(false);
    }

    const onSubmit = (data) => {
        setBusy(true);

        const url = '/api/Autores';
        var args = {
            method: 'POST',
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
            const url = '/api/Usuarios/';
            fetch(url).then(
                (result) => {
                    result.json().then((data) => {
                        reset({ email: data.email, dtnascimento: data.dtnascimento });
                    })
                }
            );
        }
    }, [primeiroAcesso]);
    return(
        <Modal size="md col-10" centered show={modalShow}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Cadastro de Autor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <div className="form-floating">
                <input type="text" className="form-control" id="nomeAutor" {...register("nome")}
                placeholder="Nome Autor"  name="nome" />
                <span className='text-danger'>{errors.nome?.message}</span>
                <label htmlFor="nomeAutor">Nome Autor:</label>
            </div>
            <div className="form-floating mt-1">
                <input type="text" className="form-control" id="emailAutor" {...register("email")}
                    placeholder="Email "  name="email"/>
                <span className='text-danger'>{errors.email?.message}</span>
                <label htmlFor="emailAutor">Email Autor:</label>
            </div>
            <div className="form-floating mt-1">
                <input type="text" className="form-control" id="apelidoAutor" {...register("apelidoAutor")}
                placeholder="Apelido Autor"  name="apelidoAutor" />
                <span className='text-danger'>{errors.apelidoAutor?.message}</span>
                <label htmlFor="apelidoAutor">Apelido:</label>
            </div>
            <div className="form-floating mt-1">
                <input type="date" className="form-control" id="dtNascAutor" {...register("dtnascimento")}
                placeholder="Data Nascimento" name="dtnascimento" maxLength={10} />
                <span className='text-danger'>{errors.dtnascimento?.message}</span>
            <label htmlFor="dtNascAutor">Data Nascimento:</label>
            </div>
            <div className="form-floating mt-1" hidden>
                <input type="text" name="tipoUsuario" value={"A"} {...register("tipoUsuario")} />
                <input type="text" name="senha" {...register("senha")} />
                <input type="text" name="codAtivacao" {...register("codAtivacao")} />
            </div>
            </div>
        </form>
                </Modal.Body>
                <Modal.Footer>
                    <BusyButton variant="btn btn-primary mt-2 col-6 bg-black" type="submit" label="Cadastrar" busy={busy}/>
                    <Button variant="secondary mt-2 col-4" onClick={handleClose}>Fechar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}