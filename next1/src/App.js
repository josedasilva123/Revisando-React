import React from "react";
import {Container, Head, Titulo, BemVindo} from './styles'

function App() {
  return (
    <Container>
      <Head>
        <Titulo>Style Components</Titulo>   
      </Head>
      <BemVindo cor="red">
        Bem vindo ao sistema
      </BemVindo>
    </Container>
  );
}

/*
<div className="container">
      <header className="header">
        <a href="" className="titulo">Projeto Styled</a>
      </header>
      <h1>Bem vindo ao sistema!</h1>
    </div>
*/
export default App;
