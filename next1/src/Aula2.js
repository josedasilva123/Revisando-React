import React from 'react';

function App(){ 
  const [valor, setValor] = React.useState('');
  const [tarefas, setTarefas] = React.useState([]);

  React.useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas');
    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function handleSubmit(event){
    event.preventDefault();
    setTarefas([...tarefas, valor]);
    setValor('');
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Cadastrando usuário</h2>
          <label>
            Nome da tarefa:
          </label><br />
          <input placeholder="Digite  uma tarefa" value={valor} onChange={(e) => setValor(e.target.value)} /><br />    
          <button type="submit">Registrar</button>
        </form>
      </div>
      <div>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </div>       
    </>
  );
}

export default App;