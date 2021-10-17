import React from 'react'
import { useParams } from 'react-router-dom';

const Produto = () => {
    const {id} = useParams();

    return (
        <div>
            <h1>Produto</h1> <br />   
            <span>Produto selecionado: {id}</span>
        </div>
    )
}

export default Produto
