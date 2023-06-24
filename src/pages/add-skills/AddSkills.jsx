import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createCandidateSkills, getSkills } from '../../services/SkillsService';
import CandidateInfo from './components/CandidateInfo';
import '../../stylesheets/AddSkills.css'
import { useParams, Link } from 'react-router-dom';
import { getCandidatoHabilidades } from '../../services/CandidateSkills';
import { useRef } from 'react';
import axios from 'axios';


const AddSkills = () => {

  const {candidateId} = useParams();

  const btnHabilidadesRef = useRef([]);

  const { data, isLoading, isError } = useQuery('habilidades', getSkills);
  
  const mutation = useMutation('candidatohabilidades', createCandidateSkills);

  const { data:candidatoHabilidad } = useQuery('candidatohabilidades', getCandidatoHabilidades);

  

 const setBtn = [];

 if (candidatoHabilidad) {
  const candidatohabilidad_filtrado = candidatoHabilidad.filter(
    (candidatohabilidad) => candidatohabilidad.candidatoId === candidateId
  );


    data.map((habilidad) => 
  
    candidatohabilidad_filtrado.map((candidatohabilidad) => 
  
    {if (habilidad.id === candidatohabilidad.habilidadId){

      setBtn.push(habilidad.id)

    }}))}

 

    const [botonesEncendidos, setBotonesEncendidos] = useState(setBtn);

    const CambiarEstadoBoton = (habilidadId) => {
      if (botonesEncendidos.includes(habilidadId)) {
        setBotonesEncendidos(botonesEncendidos.filter((id) => id !== habilidadId));
      } else {
        setBotonesEncendidos([...botonesEncendidos, habilidadId]);
      }
    }
  

    

  const handleSave = async (skillId) => {

    CambiarEstadoBoton(skillId);

    let newCandidatoHabilidad = {
      candidatoId: parseInt(candidateId),
      habilidadId:skillId
    };

      if (botonesEncendidos.includes(skillId)){
        try{
        await axios.delete(`https://localhost:7209/api/CandidatoHabilidades?id_candidato=${candidateId}&id_habilidad=${skillId}`)
        setBotonesEncendidos((prevSkills) => prevSkills.filter((id) => id !== skillId));
        }catch(error){
          console.error('Error al eliminar la habilidad del candidato:', error)
        }
      } else {
        try {
          
          mutation.mutateAsync(newCandidatoHabilidad);
          setBotonesEncendidos((prevSkills) => [...prevSkills, skillId]);
        } catch (error) {
          
          console.error('Error al asignar la habilidad al candidato:', error);

        }
        
      }
 
  }
  if(isLoading) {
    return <div>Loading...</div>
}

if(isError) {
    return <div>Error</div>
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
              ref={(element) => (btnHabilidadesRef.current = element)}

              onClick={() => {handleSave(habilidad.id)}}

              className={`btn-skill ${botonesEncendidos.includes(habilidad.id) ? 'activebtn' : 'inactivebtn'}`}

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
