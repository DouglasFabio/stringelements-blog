import NavBar from "../componentes/NavBar";
import CadastrarAdmin from "./cadastraradmin";

export default function Page() {
  return (
    <>
      <NavBar modo="semLoginADM"/>
      <CadastrarAdmin/>
    </>
  );
}