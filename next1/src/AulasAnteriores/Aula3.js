import React from 'react';
import './style.css';

function App(){   
  /* https://sujeitoprogramador.com/rn-api/?api=posts */
  const [nutri, setNutri] = React.useState([]);

  React.useEffect(() => {
    async function LOAD_API(){
      let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';
      const response = await fetch(url);
      const json = await response.json();
      setNutri(json);
    }
    LOAD_API();
  }, [])
  return (
    <>
      <section className="container">
        <header>
          <strong>React Nutri</strong>
        </header>
        {nutri.map(item => {
          return(
            <article key={item.id} className="post"> 
              <img src={item.capa} alt={item.titulo} className="capa"/>
              <strong className="titulo">{item.titulo}</strong>
              <p class="subTitulo">
                {item.subtitulo}
              </p>
              <a className="acessar">Acessar</a>
            </article>
          )
        })}
      </section>       
    </>
  );
}

export default App;