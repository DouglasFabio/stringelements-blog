'use client'
import { Badge, Stack } from "react-bootstrap";
import DataAtual from "./componentes/DataAtual";

export default function Noticias(){
    return(
        <Stack gap="1">
            <p></p> 
            <div className="container-md">
                <hr/>
                <h3><p className="text-bold">28-03-2023</p>Título Notícia <Badge bg="secondary">New</Badge></h3>
                <h5>Subtítulo Noticia</h5>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, 
                    content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as 
                    their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have 
                    evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
                
            </div>
            <div className="container-md">
                <hr/>
                <h3><p className="text-bold">04/03/2023</p>Título Notícia <Badge bg="secondary">New</Badge></h3>
                <h5>Subtítulo Noticia</h5>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, 
                    content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as 
                    their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have 
                    evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>
        </Stack>
    );
}