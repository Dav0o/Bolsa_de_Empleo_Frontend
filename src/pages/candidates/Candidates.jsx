import React from 'react'
import { useQuery } from 'react-query'
import { getCandidatos } from '../../services/CandidateService'
import { Link } from 'react-router-dom'

function Candidates() {

    const {data, isLoading, isError} = useQuery('candidatos', getCandidatos, {enabled: true});

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error</div>
    }

  return (
    <>
        <div className='list-candidatos'>
            {
                data.map((candidato) =>(
                  <div className='div-candidato' key={candidato.id}>
                    <Link to={`/candidate/${candidato.id}`}>{candidato.nombre}</Link>
                  </div> 
                  
                ))
            }
        </div>
    </>
  )
}

export default Candidates