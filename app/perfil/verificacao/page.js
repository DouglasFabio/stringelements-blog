import NavBar from "@/app/componentes/NavBar";
import VerificarEmail from "./verificarEmail";

export default function VerificaNovoEmail(){
  return(
    <>
      <NavBar modo="semLogin"/>
      <VerificarEmail/>
    </>
  );
}