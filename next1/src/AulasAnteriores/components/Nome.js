import React from 'react'

const Nome = ({aluno, idade, ...props}) => {
    return (
        <div>
            <span>{aluno} - {idade} anos</span>
        </div>
    )
}

export default Nome;
