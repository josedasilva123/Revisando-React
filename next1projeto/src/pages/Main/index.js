import React from 'react'
import { FaGithub, FaPlus } from 'react-icons/fa';
import styles from './index.module.css'

import api from '../../services/api';

const Main = () => {
    const [repositorio, setRepositorio] = React.useState('');
    const [repositorios, setRepositorios] = React.useState([]);

    function handleInputChange(event){
        setRepositorio(event.target.value);
    }
    const handleSubmit = React.useCallback((event) => {
        event.preventDefault();

        async function submit(){
            const response = await api.get(`repos/${repositorio}`);

            const data = {
                name: response.data.full_name,
            }
            setRepositorios([...repositorios, data]);
            setRepositorio('');
        }
        submit();        
    }, [repositorio, repositorios]);
        
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Adicionar Repositorios"
                value={repositorio} 
                onChange={handleInputChange}
                />

                <button type="submit" className={styles.submitButton}>
                    <FaPlus size={14} color="#FFF"/>
                </button>
            </form>
        </div>

        
    )
}

export default Main;
