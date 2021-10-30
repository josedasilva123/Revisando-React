import React from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

import api from "../../services/api";

const Main = () => {
  const [loading, setLoading] = React.useState(false);
  const [repositorio, setRepositorio] = React.useState("");
  const [repositorios, setRepositorios] = React.useState([]);
  const [error, setError] = React.useState(false);

  // Buscar
  React.useEffect(() => {
    const storageRepositorios = localStorage.getItem("repositorios");
    if (storageRepositorios) {
      setRepositorios(JSON.parse(storageRepositorios));
    }
  }, []);

  //Salvar Repositorios
  React.useEffect(() => {
    localStorage.setItem("repositorios", JSON.stringify(repositorios));
  }, [repositorios]);

  function handleInputChange(event) {
    setRepositorio(event.target.value);
    setError(false);
  }
  const handleDelete = React.useCallback(
    (repo) => {
      const newRepositorios = repositorios.filter((r) => r.name !== repo);
      setRepositorios(newRepositorios);
    },
    [repositorios]
  );

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      async function submit() {
        try {
          setLoading(true);
          setError(false);
          if (repositorio === "") {
            throw new Error("Você precisar indicar um novo repositório.");
          }

          const response = await api.get(`repos/${repositorio}`);
          const hasRepo = repositorios.find(
            (repo) => repo.name === repositorio
          );

          if (hasRepo) {
            throw new Error("Repositório duplicado");
          }
          const data = {
            name: response.data.full_name,
          };
          console.log(response);
          setRepositorios([...repositorios, data]);
          setRepositorio("");
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [repositorio, repositorios]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <form
        className={styles.form + (error ? " " + styles.error : "")}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={repositorio}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className={
            styles.submitButton + (loading ? " " + styles.loading : "")
          }
        >
          {loading ? (
            <FaSpinner size={14} color="#FFF" />
          ) : (
            <FaPlus size={14} color="#FFF" />
          )}
        </button>
      </form>

      <ul className={styles.list}>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(repo.name)}
              >
                <FaTrash size={14} />
              </button>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
