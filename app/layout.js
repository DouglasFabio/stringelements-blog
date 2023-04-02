'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './componentes/Footer';
import NavBar from './componentes/NavBar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createContext } from 'react';

export const MySwal = withReactContent(Swal);
export const MessageCallbackContext = createContext(null);

export const metadata = {
  title: 'StringElements Blog',
}

export const handleMessageCallback = (msg) => {
  if (msg.tipo !== 'nada') {
      let icon = '';
      if (msg.tipo === 'sucesso')
          icon = 'success';
      else if (msg.tipo === 'erro')
          icon = 'error';

      MySwal.fire({
          position: 'top',
          icon: icon,
          title: msg.texto,
          showConfirmButton: false,
          timer: 3500,
          toast: true
      })
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <>
            <NavBar modo="semLogin"/>
            <MessageCallbackContext.Provider value={handleMessageCallback}>
              {children}
              <Footer/>
            </MessageCallbackContext.Provider>
        </>
      </body>
    </html>
  )
}
