import NavBar from '../componentes/NavBar';
import CadastrarLeitor from './cadastrar';

export default function Page() {
  return (
    <>
    <NavBar modo="semLogin"/>
    <CadastrarLeitor/>
    </>
  );
}