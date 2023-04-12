import NavBar from "@/app/componentes/NavBar";
import VerificarContaLeitor from "./verificar";

export default function VerificaLeitor(){
  return(
    <>
      <NavBar modo="semLogin"/>
      <VerificarContaLeitor/>
    </>
  );
}