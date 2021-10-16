
import Nome from "./components/Nome";
import React from 'react';

function App() {
  const [aluno, setAluno] = React.useState('Sujeito Programador');

  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [idade, setIdade] = React.useState();

  const [user, setUser] = React.useState({});

  function handleChangeName(nome){
    setAluno(nome);
  }

  function handleSubmit(event){
    event.preventDefault();
    setUser({
      nome: nome,
      email: email,
      idade: idade,
    })
  }

  return (
    <>
      <h1>Bem vindo ao meu projeto</h1><br />
      <h2>Olá, {aluno}</h2>
      <Nome aluno="Alex Conder" idade={30}/>  
      <button onClick={() => handleChangeName('Alex')}>Trocar nome</button>   
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Cadastrando usuário</h2>
          <label>
            Nome:
          </label><br />
          <input placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} /><br />
          <label>
            Email
          </label><br />
          <input placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
          <label>
            Idade
          </label><br />
          <input placeholder="Digite seu idade" value={idade} onChange={(e) => setIdade(e.target.value)}/><br />
          <button type="submit">Registrar</button>
        </form>
      </div>
      <div>
        <span>
          Bem vindo: {user.nome}
        </span>
        <span>
          Idade: {user.idade}
        </span>
        <span>
          Email: {user.email}
        </span>
      </div>
       
    </>
  );
}

export default App;
