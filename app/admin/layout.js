'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../componentes/Footer';
import NavBar from '../componentes/NavBar';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { handleMessageCallback, MessageCallbackContext } from '../layout';

export const metadata = {
  title: 'StringElements Blog',
}

export default function Admin({ children }) {
  return (
    <html lang="en">
      <body>
        <>
            <NavBar modo="semLoginADM"/>
            <MessageCallbackContext.Provider value={handleMessageCallback}>
              {children}
              <Footer/>
            </MessageCallbackContext.Provider>
        </>
      </body>
    </html>
  )
}
