import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createCandidateSkills, getSkills } from '../../services/SkillsService';

const AddSkills = () => {

  const { data, isLoading, isError } = useQuery('habilidades', getSkills);
  //const [active, setActive] = useState(false);
  const mutation = useMutation('candidatohabilidades', createCandidateSkills);
  const [valueBtn, setValueBtn] = useState(0);
 

  if(isLoading) {
    return <div>Loading...</div>
}

if(isError) {
    return <div>Error</div>
}

  const handleSave = () => {
      // let newCandidatoHabilidad = {
      //   candidatoId: 1,
      //   habilidadId:1
      // };
      // mutation.mutateAsync(newCandidatoHabilidad);

      // active ? setActive(false) : setActive(true)
      console.log()

  }
  return (
    <div className='card-habilidades'>
      <div className='card-container'>
        <div className='card-information'>

        </div>
        <div className='card-buttons'>
          <div className='skill-button'>
            {data.map((habilidad)=>(
              <button
              onClick={handleSave}
              key={habilidad.id}
              >{habilidad.nombre}</button>
            ))}
          </div>
          <div className='actions-button'>
              <button>Cancelar</button>
              <button>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;
