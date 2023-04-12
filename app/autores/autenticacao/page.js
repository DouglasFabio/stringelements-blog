import NavBar from "@/app/componentes/NavBar";
import SenhaInicialAutor from "./autenticar";

export default function AutenticacaoAutor(){
  return(
    <>
      <NavBar modo="semLogin"/>
      <SenhaInicialAutor/>
    </>
  );
}