import React from "react";
import styles from "./index.module.css";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Repositorio = ({ match }) => {
  const [repositorio, setRepositorio] = React.useState({});
  const [issues, setIssues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState("open");
  const buttons = [
    {state: "open", label: "Abertas"},
    {state: "closed", label: "Fechadas"},
    {state: "all", label: "Todas"},
  ]

  React.useEffect(() => {
    async function load() {
      try {
        const nomeRepo = decodeURIComponent(match.params.repositorio);
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]);
        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1);
  }
  function handleFilter(action){
    setFilter(action)
    setPage(1);
  }

  React.useEffect(() => {
    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio);
      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page: page,
        }
      })
      setIssues(response.data);
    }
    loadIssue();
  }, [match.params.repositorio, page, filter]);

 
  if (loading) {
    return (
        <div class={styles.loading}>
            <h1>Carregando...</h1>
        </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.backButton}>
            <FaArrowLeft color="#000" size={30} />
        </Link>
        <header className={styles.owner}>
          <img
            src={repositorio.owner.avatar_url}
            alt={repositorio.owner.login}
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </header>
        <div>
            <div className={styles.pageFilters}>
              {buttons.map(button => (
                <button 
                className={filter === button.state ? styles.ativo : ''}
                type="button" onClick={() => 
                handleFilter(button.state)}
                >
                  {button.label}
                </button>   
              ))}              
            </div>
            <ul className={styles.issues}>
                {issues.map(issue => (
                 <li key={String(issue.id)}>
                     <img src={issue.user.avatar_url} alt={issue.user.login} />
                     <div>
                         <strong>
                             <a href={issue.html_url}>{issue.title}</a>
                             {issue.labels.map(label => (
                                 <span key={String(label.id)}>{label.name}</span>
                             ))}
                         </strong>
                         <p>{issue.user.login}</p>
                     </div>
                 </li>   
                ))}
            </ul>
            <div className={styles.pageActions}>
                <button 
                type="button" 
                onClick={() => handlePage('back')}
                disabled={page < 2}>Voltar</button>         
                <button type="button" onClick={() => handlePage('open')}>Abertos</button>       
            </div>
        </div>
      </div>
    );
  }
};

export default Repositorio;
