import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createCandidateSkills, getSkills } from '../../services/SkillsService';
import CandidateInfo from './components/CandidateInfo';
import '../../stylesheets/AddSkills.css'
import { useParams, Link } from 'react-router-dom';


const AddSkills = () => {

  const {candidateId} = useParams();
  const [isActive, setIsActive] = useState(false);

  const { data, isLoading, isError } = useQuery('habilidades', getSkills);
  
  const mutation = useMutation('candidatohabilidades', createCandidateSkills);

 

  if(isLoading) {
    return <div>Loading...</div>
}

if(isError) {
    return <div>Error</div>
}


  const handleSave = (id) => {

      if(isActive){


        setIsActive(!isActive);

      }else{
        let newCandidatoHabilidad = {
          candidatoId: parseInt(candidateId),
          habilidadId:id
        };
       mutation.mutateAsync(newCandidatoHabilidad);
       setIsActive(!isActive);
      }
       
       
  }
  return (
    <div className='container'>
      <div className='card-container'>
        <div className='card-information'>
          <CandidateInfo/>
        </div>
        <div className='card-buttons'>
          <div className='skill-button'>
            {data.map((habilidad)=>(
              <button
              onClick={() => handleSave(habilidad.id)}
              className={isActive ? 'active-btn' : ''}
              key={habilidad.id}
              >{habilidad.nombre}</button>
            ))}
          </div>
          <div className='actions-button'>
              <Link to={`/candidates`}><button className='btn-exit'>Salir</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;
