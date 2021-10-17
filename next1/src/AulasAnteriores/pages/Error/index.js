import React from 'react'
import {Link} from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h1>Hm, parece que essa página não este</h1><br />     
            <Link to="/">Retornar a home</Link>
        </div>
    )
}

export default Error
