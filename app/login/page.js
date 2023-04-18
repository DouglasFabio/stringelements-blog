import NavBar from "../componentes/NavBar";
import Login from "./login";


export default function Page() {
  return (
    <>
      <NavBar modo="semLogin"/>
      <Login/>
    </>
  );
}